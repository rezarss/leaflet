import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ServiceRegistrationForm from '../components/fields/register/ServiceRegistrationForm'
import { FaLongArrowAltLeft } from "react-icons/fa";

const ServicesPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { locationInfo } = location.state || {};

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
    })

    const scrollToForm = () => {
        document.getElementById('registration-form').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!locationInfo) {
            navigate('/');
            return;
        }

        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);

            // چاپ IP و پورت دقیق
            console.log('Attempting to fetch from:', `${import.meta.env.VITE_CRM_DOMAIN}api/service/regservices`);

            // تنظیمات Axios با تایم‌اوت بیشتر
            const response = await axios.get(`${import.meta.env.VITE_CRM_DOMAIN}api/service/regservices`, {
                //timeout: 10000, // 10 ثانیه
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            console.log("Full response:", response);

            if (response.data.services) {
                setServices(response.data.services);
            } else {
                throw new Error('خطا در دریافت اطلاعات سرویس‌ها');
            }
        } catch (error) {
            // چاپ اطلاعات کامل خطا
            console.error('Complete error object:', error);

            if (error.response) {
                // سرور پاسخ داده اما با خطا
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else if (error.request) {
                // درخواست ارسال شده اما پاسخی دریافت نشده
                console.error('Error request:', error.request);
            } else {
                // خطای دیگر در تنظیم درخواست
                console.error('Error message:', error.message);
            }

            toast.error('خطا در دریافت لیست سرویس‌ها');
        } finally {
            setLoading(false);
        }
    };



    const handleServiceSelection = (service) => {
        setSelectedService(service);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    const validateMobile = (mobile) => {
        // Remove any spaces or special characters
        mobile = mobile.replace(/\s+/g, '').trim();

        // Check if starts with 0
        if (mobile.startsWith('0')) {
            return mobile.length === 11 && /^09[0-9]{9}$/.test(mobile);
        }

        // Check if starts with 98
        if (mobile.startsWith('98')) {
            return mobile.length === 12 && /^98[0-9]{10}$/.test(mobile);
        }

        // Check if it's just the numbers after 0/98
        return mobile.length === 10 && /^9[0-9]{9}$/.test(mobile);
    };

    const registerOrder = async () => {
        try {
            // Form validation
            if (!formData.firstName || !formData.lastName || !formData.mobile) {
                toast.error('لطفا همه فیلدها را تکمیل کنید');
                return;
            }

            // Mobile number validation
            if (!validateMobile(formData.mobile)) {
                toast.error('شماره موبایل معتبر نیست');
                return;
            }

            const loadingToast = toast.loading('در حال ثبت سفارش...');

            const response = await axios.post('http://localhost:5000/api/orders/register', {
                selectedService,
                user: {
                    ...formData,
                    coordinates: {
                        latitude: locationInfo?.user?.location?.latitude,
                        longitude: locationInfo?.user?.location?.longitude
                    },
                    nearestPopSite: {
                        name: locationInfo?.nearestPopSite?.name,
                        distanceFromPopSite: locationInfo?.nearestPopSite?.distance,
                        popSiteCoordinates: {
                            latitude: locationInfo?.nearestPopSite?.coordinates?.latitude,
                            longitude: locationInfo?.nearestPopSite?.coordinates?.longitude
                        }
                    }
                }
            });

            toast.dismiss(loadingToast);

            console.log("zzzzzzzzzz", response.data)

            if (response.data.success) {
                navigate(`/payment/gateway/${response.data.data.order._id}`);
                //toast.success('سفارش با موفقیت ثبت شد', { duration: 5000 });
                // Redirect to payment page or show success message
                // setTimeout(() => {
                //     if (response.data.data.redirectUrl) {
                //         window.location.href = response.data.data.redirectUrl;
                //     }
                // }, 5000)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'خطا در ثبت سفارش');
            console.error('Error registering order:', error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">انتخاب سرویس اینترنت</h1>
                    <div className='flex justify-center items-center gap-x-2'>
                        <a href="/" className="text-gray-600">نقشه</a>
                        <FaLongArrowAltLeft className='text-gray-600/80 my-4' />
                        <span>سرویس ها</span>
                    </div>
                </div>
                {/* Location Info */}
                <div className='p-8'>
                    <h2 className="text-right text-xl font-semibold mb-4">اطلاعات موقعیت</h2>
                    <div className="flex justify-start items-center flex-wrap gap-y-4 sm:gap-y-0 gap-x-16">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="bonyad text-sm text-gray-500">نام مرکز</div>
                                <div className="bonyad font-medium">{locationInfo?.nearestPopSite?.name}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <div className="bonyad text-sm text-gray-500">فاصله از مرکز</div>
                                <div className="bonyad font-medium">{(locationInfo?.nearestPopSite?.distance / 1000).toFixed(2)} کیلومتر</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Services Grid */}
            <div className="container">
                <p className="text-right font-semibold text-gray-600 p-8 pb-0">سرویس مورد نظر خود را انتخاب کنید</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            onClick={() => {
                                handleServiceSelection(service);
                                setTimeout(() => {
                                    document.getElementById('registration-form')?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }, 100);
                            }}
                            className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-md hover:scale-[1.02] ${selectedService?._id === service._id ? 'border-blue-500' : 'border-transparent'} `}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-center mb-6">
                                    <img
                                        src={`/icons/${service.service === "wireless" ? "antenna" : service.service}.webp`}
                                        alt={service.name}
                                        className="w-20 h-20 object-contain"
                                    />
                                </div>
                                <h3 className="text-md font-bold text-center mb-4">{service.name}</h3>
                                <div className="space-y0-4">
                                    <p className="text-gray-600 text-center">{service.description}</p>
                                    <div className="flex justify-between items-center py-4 border-t m-0">
                                        <span className="text-gray-600">سرعت</span>
                                        <span className="font-medium">{service.speed}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-t m-0">
                                        <span className="text-gray-600">مدت زمان</span>
                                        <span className="font-medium">{service.duration}</span>
                                    </div>
                                    <div className="text-center pt-4">
                                        <span className="text-2xl font-bold text-blue-600">{formatPrice(service.price)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Registration Form */}
            {selectedService && (
                <div id="registration-form" className="container mx-auto px-4 py-8">
                    <ServiceRegistrationForm
                        selectedService={selectedService}
                        locationInfo={locationInfo}
                    />
                </div>
            )}
        </div>
    )
};

export default ServicesPage;