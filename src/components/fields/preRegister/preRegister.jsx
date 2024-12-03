import axios from 'axios';
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useMap } from 'react-leaflet';
import toast from 'react-hot-toast';

const ServicePreRegistrationForm = ({ clickedPosition, nearestPoint }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
    });
    const [loading, setLoading] = useState(false);

    const map = useMap();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleClose = () => {
        map.closePopup();
    };

    const submitPreRegister = async (e) => {
        e.preventDefault(); // Prevent form submission

        // Form validation
        if (!formData.firstName || !formData.lastName || !formData.mobile) {
            toast.error('لطفا همه فیلدها را تکمیل کنید');
            return;
        }

        // Mobile number validation
        const mobileRegex = /^09[0-9]{9}$/;
        if (!mobileRegex.test(formData.mobile)) {
            toast.error('شماره موبایل معتبر نیست');
            return;
        }

        const loadingToast = toast.loading('در حال ثبت درخواست...');

        try {
            setLoading(true);

            const payload = {
                user: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    mobile: formData.mobile,
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

            const { data } = await axios.post(`${import.meta.env.VITE_CRM_DOMAIN}api/expansionarea`, payload);
            console.log("data", data)

            toast.dismiss(loadingToast);

            if (data.success) {
                toast.success('درخواست شما با موفقیت ثبت شد');
                handleClose();
            } else {
                throw new Error(data.message || 'خطا در ثبت درخواست');
            }

        } catch (err) {
            toast.dismiss(loadingToast);

            const errorMessage = err.response?.data?.message || err.message || 'خطا در ثبت درخواست';
            toast.error(errorMessage);

            console.error('Error submitting pre-registration:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">فرم پیش ثبت نام سرویس</h2>

            <div className="bg-orange-50 border-r-4 border-orange-400 p-2 flex items-center gap-4 space-x-3 rtl mb-4">
                <AlertTriangle dir="rtl" className="h-8 w-8 text-orange-400" />
                <p className="text-sm text-orange-700">
                    منطقه شما در لیست توسعه شبکه هرمزنت قرار دارد.
                </p>
            </div>

            <form onSubmit={submitPreRegister} className="space-y-4">
                <div className='flex justify-between items-center gap-x-2'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            نام
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full border-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            نام خانوادگی
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full border-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        شماره همراه*
                    </label>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="09123456789"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <p>ddddddddd:{import.meta.env.VITE_CRM_DOMAIN}</p>

                <div className="flex justify-between pt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        بستن
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'در حال ثبت...' : 'تایید و ارسال فرم'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ServicePreRegistrationForm;