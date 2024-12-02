import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, useMapEvents } from 'react-leaflet';
import './App.css';
import ServicesField from "./components/fields/services";
import { provinces } from './data/provinces';
import { geoJson } from "./data/geoJson";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { services } from "./data/services";
import PopupContent from "./components/layouts/popupContent";
import * as turf from '@turf/turf';
import ServicePreRegistrationForm from './components/fields/preRegister/preRegister';
import LocationInfoCard from './components/fields/register/register';
import ServicesPage from './pages/ServicesPage';
import { Toaster } from 'react-hot-toast';
import { PaymentGateway } from './components/payments/paymentGateway'
import { PaymentResult } from './components/payments/PaymentResult'

// LocationCheckPopup component (existing code)
const LocationCheckPopup = () => {
    const [clickedPosition, setClickedPosition] = useState(null);
    const [isInsidePolygon, setIsInsidePolygon] = useState(false);
    const [nearestPoint, setNearestPoint] = useState(null);

    const checkIfPointInPolygon = (point) => {
        const pt = turf.point([point.lng, point.lat]);

        for (const feature of geoJson[0].data.features) {
            if (feature.geometry.type === 'Polygon') {
                const poly = turf.polygon(feature.geometry.coordinates);
                if (turf.booleanPointInPolygon(pt, poly)) {
                    return true;
                }
            }
        }
        return false;
    };

    const findNearestPoint = (clickedPoint) => {
        let nearestDistance = Infinity;
        let nearest = null;

        const from = turf.point([clickedPoint.lng, clickedPoint.lat]);

        geoJson[0].data.features.forEach(feature => {
            if (feature.geometry.type === 'Point') {
                const to = turf.point(feature.geometry.coordinates);
                const distance = turf.distance(from, to, { units: 'kilometers' });

                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearest = {
                        name: feature.properties.name,
                        distance: distance,
                        coordinates: {
                            longitude: feature.geometry.coordinates[0],
                            latitude: feature.geometry.coordinates[1]
                        }
                    };
                }
            }
        });

        return nearest;
    };

    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            setClickedPosition({ lat, lng });
            setIsInsidePolygon(checkIfPointInPolygon({ lat, lng }));
            const nearest = findNearestPoint({ lat, lng });
            setNearestPoint(nearest);
        },
    });

    if (!clickedPosition) return null;

    return (
        <Popup position={[clickedPosition.lat, clickedPosition.lng]}>
            <div className={`text-right p-2 ${isInsidePolygon ? 'w-64' : ''}`}>
                {isInsidePolygon ? (
                    <LocationInfoCard clickedPosition={clickedPosition} nearestPoint={nearestPoint} />
                ) : (
                    <ServicePreRegistrationForm clickedPosition={clickedPosition} nearestPoint={nearestPoint} />
                )}
            </div>
        </Popup>
    );
};

// MapComponent - Extract the map-related code into a separate component
const MapComponent = () => {
    function findById(array, id) {
        return array?.find(item => item.id === id);
    }

    const findCity = (provinceId, countyId, cityId) => {
        const province = findById(provinces, provinceId);
        const county = findById(province.counties, countyId);
        const city = findById(county.cities, cityId);
        return city;
    }

    const [mapType, setMapType] = useState('openstreetmap');
    const [initZoom, setInitZoom] = useState(13);
    const [selectedField, setSelectedField] = useState({
        serviceId: 1,
        provinceId: 1,
        countyId: 1,
        cityId: 1,
        city: findCity(1, 1, 1)
    });

    useEffect(() => {
        setGeoJsonServiceHandler(null);

        const timeout = setTimeout(() => {
            const serviceGeoJson = geoJson.find(service => service.serviceId === selectedField.serviceId);
            setGeoJsonServiceHandler(serviceGeoJson || null);
        }, 0);

        return () => clearTimeout(timeout);
    }, [selectedField.serviceId]);

    const [geoJsonServiceHandler, setGeoJsonServiceHandler] = useState(null);

    const geoJsonPointerIcon = new L.DivIcon({
        className: 'custom-marker hidden0',
        html: `<img src=${services[selectedField.serviceId - 1].icon} style="width: 25px; position: absolute; top: -100%; right: -50%" />`,
    });

    const cityMarker = new L.icon({ iconUrl: '/icons/cityMarker.svg', iconSize: [30, 35] });

    return (
        <>
            <div className="bg-slate-100 my-4 p-2 sm:p-4 rounded-md border-2">
                <ServicesField selectedField={selectedField} setSelectedField={setSelectedField} />
            </div>
            <div className="relative rounded-md border-2 z-0">
                <button
                    onClick={() => setMapType(mapType === 'openstreetmap' ? 'mapbox' : 'openstreetmap')}
                    className="absolute top-4 right-4 bg-white text-sm p-2 rounded shadow z-10 cursor-pointer focus:outline-none dark:text-black"
                >
                    {mapType === 'openstreetmap' ? 'نقشه ماهواره ای' : 'نقشه پیش فرض'}
                </button>
                <MapContainer
                    center={[selectedField?.city.coordinates.latitude, selectedField?.city.coordinates.longitude]}
                    zoom={initZoom}
                    scrollWheelZoom={true}
                    className="z-0"
                >
                    {mapType === 'openstreetmap' ? (
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    ) : (
                        <TileLayer
                            url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}&maxzoom=22`}
                            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
                        />
                    )}
                    <MapFlyTo selectedCity={selectedField.city} />
                    {geoJsonServiceHandler && (
                        <GeoJSON
                            key={selectedField.serviceId}
                            data={geoJsonServiceHandler.data}
                            style={{
                                fillColor: '#7b00a800', // رنگ داخل polygon
                                fillOpacity: 0.2,    // شفافیت رنگ داخلی
                                color: '#68008f00',    // رنگ خط دور polygon
                                weight: 2,           // ضخامت خط دور
                            }}
                            pointToLayer={(feature, latlng) => {
                                return L.marker(latlng, { icon: geoJsonPointerIcon })
                            }}
                            onEachFeature={(feature, layer) => {
                                if (feature.geometry.type === 'Point') {
                                    layer.on('click', function (e) {
                                        L.popup()
                                            .setLatLng(e.latlng)
                                            .setContent(`<div class="text-right p-2">
                                                <p class="font-bold">${feature.properties.name}</p>
                                            </div>`)
                                            .openOn(this._map);
                                    });
                                } else if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                                    layer.on('click', function (e) {
                                        const center = layer.getBounds().getCenter();
                                        L.popup()
                                            .setLatLng(center)
                                            .setContent(`<div class="text-right p-2">
                                                <p class="font-bold">${feature.properties.Name}</p>
                                            </div>`)
                                            .openOn(this._map);
                                    });
                                }
                            }}
                        />
                    )}
                    <Marker
                        position={[selectedField?.city.coordinates.latitude, selectedField?.city.coordinates.longitude]}
                        icon={cityMarker}
                        zIndexOffset={4}
                    >
                        <Popup>
                            <PopupContent selectedField={selectedField} />
                        </Popup>
                    </Marker>

                    <LocationCheckPopup />
                </MapContainer>
            </div>
        </>
    );
};

// MapFlyTo component (existing code)
const MapFlyTo = ({ selectedCity }) => {
    const map = useMap();

    useEffect(() => {
        if (selectedCity) {
            map.flyTo(
                [selectedCity.coordinates.latitude, selectedCity.coordinates.longitude],
                selectedCity.zoomLevel || 13
            );
        }
    }, [selectedCity, map]);

    return null;
};

// Main App component
const App = () => {
    return (
        <Router>
            <div className="container mx-auto px-4">
                <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                            fontFamily: 'Vazirmatn',
                        },
                        success: {
                            duration: 3000,
                            theme: {
                                primary: '#4CAF50',
                            },
                            style: {
                                background: '#4CAF50',
                                color: '#fff',
                                fontFamily: 'Vazirmatn',
                            },
                        },
                        error: {
                            duration: 4000,
                            style: {
                                background: '#ef4444',
                                color: '#fff',
                                fontFamily: 'Vazirmatn',
                            },
                        },
                    }}
                />
                <Routes>
                    <Route path="/" element={<MapComponent />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/payment/gateway/:orderId" element={<PaymentGateway />} />
                    <Route path="/payment/:status/:orderId" element={<PaymentResult />} />
                    {/* Add more routes as needed */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;