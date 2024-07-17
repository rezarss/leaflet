import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON, Polygon, useMapEvents, LayersControl } from 'react-leaflet';
import './App.css';
import ServicesField from "./components/fields/services";
import { provinces } from './data/provinces';
import { geoJson } from "./data/geoJson";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { services } from "./data/services";
import PopupContent from "./components/layouts/popupContent";

function App() {
  function findById(array, id) {
    return array?.find(item => item.id === id);
  }

  const findCity = (provinceId, countyId, cityId) => {
    const province = findById(provinces, provinceId);
    const county = findById(province.counties, countyId);
    const city = findById(county.cities, cityId);
    return city;
  }

  const [mapType, setMapType] = useState('openstreetmap')

  const [initZoom, setInitZoom] = useState(13);
  const [selectedField, setSelectedField] = useState({
    serviceId: 1,
    provinceId: 1,
    countyId: 1,
    cityId: 1,
    city: findCity(1, 1, 1)
  });

  const [clickedPosition, setClickedPosition] = useState(null);
  const MapClickHandler = () => {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setClickedPosition({ lat, lng });
      },
    });
    return null;
  };
  useEffect(() => {
    setClickedPosition(null)
  }, [selectedField, mapType])

  const serviceAreasByCity = findCity(selectedField.provinceId, selectedField.countyId, selectedField.cityId)
    .services.find(service => service.serviceId === selectedField.serviceId)?.areas;

  const [geoJsonServiceHandler, setGeoJsonServiceHandler] = useState(null);

  useEffect(() => {
    // Clear geoJsonServiceHandler first to force re-render
    setGeoJsonServiceHandler(null);

    // Set a timeout to delay setting the actual data
    const timeout = setTimeout(() => {
      const serviceGeoJson = geoJson.find(service => service.serviceId === selectedField.serviceId);
      setGeoJsonServiceHandler(serviceGeoJson || null);
    }, 0);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, [selectedField.serviceId]);

  const geoJsonPointerIcon = new L.DivIcon({
    className: 'custom-marker',
    html: `<img src=${services[selectedField.serviceId - 1].icon} style="width: 25px; position: absolute; top: -100%; right: -50%" />`,
  });

  const cityMarker = new L.icon({ iconUrl: '/icons/cityMarker.svg', iconSize: [30, 35] })

  return (
    <>
      <div className="bg-slate-100 my-4 p-2 sm:p-4 rounded-md border-2">
        <ServicesField selectedField={selectedField} setSelectedField={setSelectedField} />
      </div>
      <div className="relative rounded-md border-2 z-0">
        <button onClick={() => setMapType(mapType === 'openstreetmap' ? 'mapbox' : 'openstreetmap')} className="absolute top-4 right-4 bg-white text-sm p-2 rounded shadow z-10 cursor-pointer focus:outline-none">
          {mapType === 'openstreetmap' ? 'نقشه ماهواره ای' : 'نقشه پیش فرض'}
        </button>
        <MapContainer center={[selectedField?.city.coordinates.latitude, selectedField?.city.coordinates.longitude]} zoom={initZoom} scrollWheelZoom={true} className="z-0">
          {mapType === 'openstreetmap' ?
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            :
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}&maxzoom=22`}
              attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
            />
          }
          <MapFlyTo selectedCity={selectedField.city} />
          {geoJsonServiceHandler && <GeoJSON key={selectedField.serviceId} data={geoJsonServiceHandler.data}
            pointToLayer={(feature, latlng) => {
              return L.marker(latlng, { icon: geoJsonPointerIcon })
            }}
            onEachFeature={(feature, layer) => {
              if (feature.geometry.type === 'Point' || feature.geometry.type === 'MultiPoint') {
                layer.on('click', function (e) {
                  L.popup()
                    .setLatLng(e.latlng)
                    .setContent(`<h5>${feature.properties.name}</h5>`)
                    .openOn(this._map);
                });
              } else if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
                layer.on('click', function (e) {
                  const center = layer.getBounds().getCenter();
                  L.popup()
                    .setLatLng(center)
                    .setContent(`<h5>${feature.properties.name}</h5>`)
                    .openOn(this._map);
                });
              }
            }}
          />}
          <Marker position={[selectedField?.city.coordinates.latitude, selectedField?.city.coordinates.longitude]} icon={cityMarker} zIndexOffset={4}>
            <Popup>
              <PopupContent selectedField={selectedField} />
            </Popup>
          </Marker>
          {/*serviceAreasByCity?.map((item, index) => {
            const key = Object.keys(item)[0];
            const positions = item[key];
            return (
              <Polygon key={index} pathOptions={{ color: 'purple' }} positions={positions} />
            );
          })*/}

          <MapClickHandler />
          {clickedPosition && (
            <Popup position={[clickedPosition.lat, clickedPosition.lng]}>
              <div>
                <h3 className="text-right font-bold">مختصات:</h3>
                <p className="text-right !my-0">عرض جغرافیایی: {clickedPosition.lat.toFixed(6)}</p>
                <p className="text-right !my-0"><span className="!font-bold">طول جغرافیایی:</span> {clickedPosition.lng.toFixed(6)}</p>
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>
    </>
  );
}

const MapFlyTo = ({ selectedCity }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCity) {
      map.flyTo([selectedCity.coordinates.latitude, selectedCity.coordinates.longitude], selectedCity.zoomLevel || 13);
    }
  }, [selectedCity, map]);

  return null;
};

export default App; 
