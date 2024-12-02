import { useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const LocationInfoCard = ({ clickedPosition, nearestPoint }) => {
    const navigate = useNavigate();
    const map = useMap()

    const handleClose = () => {
        map.closePopup();
    };

    const distance = nearestPoint.distance.toFixed(2) < 1 ? nearestPoint.distance.toFixed(2) * 1000 : nearestPoint.distance.toFixed(2);
    const distantUnit = nearestPoint.distance.toFixed(2) < 1 ? "m" : "km"

    const submitRegister0 = () => {
        console.log({
            user: {
                location: {
                    latitude: clickedPosition.lat.toFixed(6),
                    longitude: clickedPosition.lng.toFixed(6),
                },
            },
            nearestPopSite: {
                name: nearestPoint.name,
                distance: nearestPoint.distance.toFixed(2) * 1000,
                coordinates: {
                    latitude: nearestPoint.coordinates.latitude.toFixed(6),
                    longitude: nearestPoint.coordinates.longitude.toFixed(6)
                }

            }
        })
    }

    const submitRegister = () => {
        const locationInfo = {
            user: {
                location: {
                    latitude: clickedPosition.lat.toFixed(6),
                    longitude: clickedPosition.lng.toFixed(6),
                },
            },
            nearestPopSite: {
                name: nearestPoint.name,
                distance: nearestPoint.distance.toFixed(2) * 1000,
                coordinates: {
                    latitude: nearestPoint.coordinates.latitude.toFixed(6),
                    longitude: nearestPoint.coordinates.longitude.toFixed(6)
                }
            }
        };

        // بستن پاپ‌آپ نقشه
        map.closePopup();

        // انتقال به صفحه سرویس‌ها با اطلاعات موقعیت
        navigate('/services', { state: { locationInfo } });
    };


    return (
        <div>
            {/* Header */}
            <div className="bg-gray-50 px-4 py-2 border-b">
                <h3 className="text-lg font-medium text-gray-700">نمایش اطلاعات</h3>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* نام مرکز */}
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm text-gray-900">نام مرکز</span>
                    <span className="text-sm text-gray-500">
                        {nearestPoint ? nearestPoint.name : 'پرشیا - تاچ سایت'}
                    </span>
                </div>

                {/* فاصله از مرکز */}
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm text-gray-900">فاصله از مرکز</span>
                    <span className="text-sm text-gray-500 ltr" dir="ltr">
                        {nearestPoint ? `${distance} ${distantUnit}` : '-'}
                    </span>
                </div>

                {/* عرض جغرافیایی */}
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-sm text-gray-900">عرض جغرافیایی</span>
                    <span className="text-sm text-gray-500 ltr" dir="ltr">
                        {clickedPosition ? clickedPosition.lat.toFixed(6) : '-'}
                    </span>
                </div>

                {/* طول جغرافیایی */}
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-900">طول جغرافیایی</span>
                    <span className="text-sm text-gray-500 ltr" dir="ltr">
                        {clickedPosition ? clickedPosition.lng.toFixed(6) : '-'}
                    </span>
                </div>
            </div>

            {/* Footer with buttons */}
            <div className="bg-gray-50 px-4 py-3 flex justify-between">
                <button
                    type="button"
                    onClick={handleClose}
                    className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded-md text-sm hover:bg-gray-300 transition-colors"
                >
                    بستن
                </button>
                <button
                    type="button"
                    onClick={submitRegister}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                    تایید
                </button>
            </div>
        </div>
    )
};

export default LocationInfoCard;