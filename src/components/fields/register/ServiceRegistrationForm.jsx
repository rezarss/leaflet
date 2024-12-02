import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

// لیست استان‌ها
const provinces = [
    { value: 'east_azerbaijan', label: 'آذربایجان شرقی' },
    { value: 'west_azerbaijan', label: 'آذربایجان غربی' },
    { value: 'ardabil', label: 'اردبیل' },
    { value: 'isfahan', label: 'اصفهان' },
    { value: 'alborz', label: 'البرز' },
    { value: 'ilam', label: 'ایلام' },
    { value: 'bushehr', label: 'بوشهر' },
    { value: 'tehran', label: 'تهران' },
    { value: 'chaharmahal', label: 'چهارمحال و بختیاری' },
    { value: 'south_khorasan', label: 'خراسان جنوبی' },
    { value: 'razavi_khorasan', label: 'خراسان رضوی' },
    { value: 'north_khorasan', label: 'خراسان شمالی' },
    { value: 'khuzestan', label: 'خوزستان' },
    { value: 'zanjan', label: 'زنجان' },
    { value: 'semnan', label: 'سمنان' },
    { value: 'sistan', label: 'سیستان و بلوچستان' },
    { value: 'fars', label: 'فارس' },
    { value: 'qazvin', label: 'قزوین' },
    { value: 'qom', label: 'قم' },
    { value: 'kurdistan', label: 'کردستان' },
    { value: 'kerman', label: 'کرمان' },
    { value: 'kermanshah', label: 'کرمانشاه' },
    { value: 'kohgiluyeh', label: 'کهگیلویه وبویراحمد' },
    { value: 'golestan', label: 'گلستان' },
    { value: 'gilan', label: 'گیلان' },
    { value: 'lorestan', label: 'لرستان' },
    { value: 'mazandaran', label: 'مازندران' },
    { value: 'markazi', label: 'مرکزی' },
    { value: 'hormozgan', label: 'هرمزگان' },
    { value: 'hamadan', label: 'همدان' },
    { value: 'yazd', label: 'یزد' }
];

const ServiceRegistrationForm = ({ selectedService, locationInfo }) => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        // اطلاعات شخصی
        type: 'حقیقی',
        personType: 'حقیقی ایرانی',
        nationalIdType: 'کد ملی',
        nationalId: '',
        name: '',
        familyName: '',
        fatherName: '',
        birthDate: '',
        birthPlace: '',
        nationalIdImage: null,
        // اطلاعات تکمیلی
        state: 'هرمزگان',
        city: 'بندرعباس',
        address: '',
        mainStreet: '',
        buildingNumber: '',
        unit: '',
        postalCode: '',
        landlineNumber: '',
        email: '',
        // اطلاعات اکانت
        mobile: '',
        referralSource: ''
    });

    // states for errors and date handling
    const [formErrors, setFormErrors] = useState({});
    const [dateInputGuide, setDateInputGuide] = useState('');
    const [dateError, setDateError] = useState('');

    // تابع برای گرفتن سال جاری شمسی
    const getCurrentPersianYear = () => {
        return 1403;
    };

    // تابع اعتبارسنجی تاریخ شمسی
    const validatePersianDate = (dateString) => {
        if (!dateString) return null;

        const datePattern = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
        const match = dateString.match(datePattern);

        if (!match) {
            return 'فرمت تاریخ باید به صورت سال/ماه/روز باشد';
        }

        const [, yearStr, monthStr, dayStr] = match;
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        const day = parseInt(dayStr);
        const currentYear = getCurrentPersianYear();

        if (year > currentYear) {
            return 'سال نمی‌تواند بزرگتر از سال جاری باشد';
        }
        if (year < 1300) {
            return 'سال باید بزرگتر از 1300 باشد';
        }

        if (month < 1 || month > 12) {
            return 'ماه باید بین 1 تا 12 باشد';
        }

        if (month <= 6) {
            if (day < 1 || day > 31) {
                return 'روز در ماه‌های 1 تا 6 باید بین 1 تا 31 باشد';
            }
        } else {
            if (day < 1 || day > 30) {
                return 'روز در ماه‌های 7 تا 12 باید بین 1 تا 30 باشد';
            }
        }

        return null;
    };

    const formatPersianDate = (input) => {
        const numbers = input.replace(/[^\d]/g, '');

        if (numbers.length >= 4) {
            const year = numbers.substring(0, 4);
            const month = numbers.substring(4, 6);
            const day = numbers.substring(6, 8);

            let result = year;
            if (month) result += '/' + month;
            if (day) result += '/' + day;

            return result;
        }

        return numbers;
    };
    // Validation functions
    const validateName = (value) => {
        const persianLettersRegex = /^[\u0600-\u06FF\s]+$/;
        return persianLettersRegex.test(value);
    };

    const validatePostalCode = (value) => {
        return /^\d{10}$/.test(value);
    };

    const validateMobile = (value) => {
        return /^09\d{9}$/.test(value);
    };

    const validateLandline = (value) => {
        return !value || /^\d+$/.test(value);
    };

    const validateEmail = (value) => {
        return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Clear previous error for this field
        setFormErrors(prev => ({ ...prev, [name]: '' }));

        if (name === 'birthDate') {
            // فقط اجازه ورود اعداد و /
            if (!/^[\d\/]*$/.test(value)) return;

            const formattedValue = formatPersianDate(value);

            setFormData(prev => ({
                ...prev,
                birthDate: formattedValue
            }));

            // تعیین راهنمای مناسب بر اساس موقعیت کاربر
            const parts = formattedValue.split('/');
            if (parts.length === 1) {
                if (parts[0].length < 4) {
                    setDateInputGuide('سال را وارد کنید');
                    setDateError('');
                } else if (parts[0].length === 4) {
                    setDateInputGuide('ماه را وارد کنید');
                    setDateError('');
                }
            } else if (parts.length === 2) {
                if (parts[1].length < 2) {
                    setDateInputGuide('ماه را وارد کنید');
                    setDateError('');
                } else {
                    setDateInputGuide('روز را وارد کنید');
                    setDateError('');
                }
            } else if (parts.length === 3) {
                if (parts[2].length < 2) {
                    setDateInputGuide('روز را وارد کنید');
                    setDateError('');
                } else {
                    setDateInputGuide('');
                    const error = validatePersianDate(formattedValue);
                    setDateError(error || '');
                }
            }
            return;
        } else if (name === 'state') {
            // برای فیلد استان، label را ذخیره می‌کنیم
            const selectedProvince = provinces.find(p => p.value === value);
            if (selectedProvince) {
                setFormData(prev => ({
                    ...prev,
                    [name]: selectedProvince.label
                }));
            }
        } else {
            // Specific validations per field
            switch (name) {
                case 'name':
                case 'familyName':
                case 'fatherName':
                case 'birthPlace':
                case 'city':
                    if (value && !validateName(value)) {
                        setFormErrors(prev => ({
                            ...prev,
                            [name]: 'فقط حروف فارسی مجاز است'
                        }));
                        return;
                    }
                    break;

                case 'postalCode':
                    if (value && !validatePostalCode(value)) {
                        setFormErrors(prev => ({
                            ...prev,
                            postalCode: 'کد پستی باید 10 رقم باشد'
                        }));
                    }
                    break;

                case 'mobile':
                    if (value && !validateMobile(value)) {
                        setFormErrors(prev => ({
                            ...prev,
                            mobile: 'شماره موبایل باید 11 رقم و با 09 شروع شود'
                        }));
                    }
                    break;

                case 'landlineNumber':
                    if (value && !validateLandline(value)) {
                        setFormErrors(prev => ({
                            ...prev,
                            landlineNumber: 'فقط اعداد مجاز است'
                        }));
                        return;
                    }
                    break;

                case 'email':
                    if (value && !validateEmail(value)) {
                        setFormErrors(prev => ({
                            ...prev,
                            email: 'فرمت ایمیل نامعتبر است'
                        }));
                    }
                    break;
            }

            // Update form data for other fields
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageUpload = (e) => {
        setFormData(prev => ({
            ...prev,
            nationalIdImage: e.target.files[0]
        }));
    };

    const validateForm = () => {
        const errors = {};

        // Required fields validation
        if (!formData.nationalId) errors.nationalId = 'کد ملی الزامی است';
        if (!formData.name) errors.name = 'نام الزامی است';
        if (!formData.familyName) errors.familyName = 'نام خانوادگی الزامی است';
        if (!formData.mobile) errors.mobile = 'شماره موبایل الزامی است';
        if (!formData.state) errors.state = 'استان الزامی است';
        if (!formData.city) errors.city = 'شهر الزامی است';
        if (!formData.address) errors.address = 'آدرس الزامی است';
        if (!formData.postalCode) errors.postalCode = 'کد پستی الزامی است';
        if (dateError) errors.birthDate = dateError;

        // Format validations
        if (formData.nationalId && !/^\d{10}$/.test(formData.nationalId)) {
            errors.nationalId = 'کد ملی باید 10 رقم باشد';
        }
        if (formData.name && !validateName(formData.name)) {
            errors.name = 'فقط حروف فارسی مجاز است';
        }
        if (formData.familyName && !validateName(formData.familyName)) {
            errors.familyName = 'فقط حروف فارسی مجاز است';
        }
        if (formData.fatherName && !validateName(formData.fatherName)) {
            errors.fatherName = 'فقط حروف فارسی مجاز است';
        }
        if (formData.birthPlace && !validateName(formData.birthPlace)) {
            errors.birthPlace = 'فقط حروف فارسی مجاز است';
        }
        if (formData.city && !validateName(formData.city)) {
            errors.city = 'فقط حروف فارسی مجاز است';
        }
        if (formData.mobile && !validateMobile(formData.mobile)) {
            errors.mobile = 'شماره موبایل نامعتبر است';
        }
        if (formData.postalCode && !validatePostalCode(formData.postalCode)) {
            errors.postalCode = 'کد پستی نامعتبر است';
        }
        if (formData.landlineNumber && !validateLandline(formData.landlineNumber)) {
            errors.landlineNumber = 'فقط اعداد مجاز است';
        }
        if (formData.email && !validateEmail(formData.email)) {
            errors.email = 'ایمیل نامعتبر است';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // در ServiceRegistrationForm.jsx
    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error('لطفا خطاهای فرم را برطرف کنید');
            return;
        }

        try {
            const loadingToast = toast.loading('در حال ثبت سفارش...');

            // ساخت FormData برای ارسال
            const sendFormData = new FormData(); // تغییر نام به sendFormData

            // اضافه کردن تصویر کارت ملی
            if (formData.nationalIdImage) {  // استفاده از formData.nationalIdImage
                sendFormData.append('nationalIdImage', formData.nationalIdImage);
            }

            // ساخت آبجکت userData
            const userData = {
                type: formData.type,
                personType: formData.personType,
                nationalIdType: formData.nationalIdType,
                nationalId: formData.nationalId,
                name: formData.name,
                familyName: formData.familyName,
                fatherName: formData.fatherName,
                birthDate: formData.birthDate,
                birthPlace: formData.birthPlace,
                state: formData.state,
                city: formData.city,
                address: formData.address,
                buildingNumber: formData.buildingNumber,
                unit: formData.unit,
                postalCode: formData.postalCode,
                mobile: formData.mobile,
                landlineNumber: formData.landlineNumber,
                email: formData.email,
                referralSource: formData.referralSource,
                coordinates: locationInfo?.user?.location,
                nearestPopSite: locationInfo?.nearestPopSite,
                selectedService: selectedService
            };

            // اضافه کردن داده‌های کاربر
            sendFormData.append('userData', JSON.stringify(userData));

            const response = await axios.post('http://localhost:3000/api/coverage/installreq', sendFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            toast.dismiss(loadingToast);

            if (response.data.result === "success") {
                toast.success(response.data.message);
                navigate(`/payment/gateway/${response.data.data.user._id}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'خطا در ثبت سفارش');
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="border-b pb-4 mb-8">
                <h2 className="text-2xl font-bold text-gray-800">ثبت اطلاعات</h2>
                <p className="text-gray-600 mt-2">لطفا اطلاعات خود را با دقت وارد کنید</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* اطلاعات شخصی */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-700">اطلاعات شخصی</h3>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center flex-wrap gap-8 mb-8">
                            {/* نوع شخصیت */}
                            <div className="flex flex-col w-full  md:w-[45%] lg:w-[45%] bg-neutral-50 border border-gray-300 py-2 px-4 rounded-lg">
                                <label className="text-sm text-gray-600">نوع شخصیت</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="حقیقی"
                                            checked={formData.type === 'حقیقی'}
                                            onChange={handleChange}
                                            className="ml-2"
                                        />
                                        حقیقی
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="حقوقی"
                                            checked={formData.type === 'حقوقی'}
                                            onChange={handleChange}
                                            className="ml-2"
                                        />
                                        حقوقی
                                    </label>
                                </div>
                            </div>

                            {/* نوع شخص */}
                            <div className="flex flex-col w-full  md:w-[45%] lg:w-[45%] bg-neutral-50 border border-gray-300 py-2 px-4 rounded-lg">
                                <label className="text-sm text-gray-600">نوع شخص</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="personType"
                                            value="حقیقی ایرانی"
                                            checked={formData.personType === 'حقیقی ایرانی'}
                                            onChange={handleChange}
                                            className="ml-2"
                                        />
                                        حقیقی ایرانی
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="personType"
                                            value="حقیقی غیر ایرانی"
                                            checked={formData.personType === 'حقیقی غیر ایرانی'}
                                            onChange={handleChange}
                                            className="ml-2"
                                        />
                                        حقیقی غیر ایرانی
                                    </label>
                                </div>
                            </div>

                            {/* نوع شناسه هویتی */}
                            <div className="flex flex-col w-full md:w-[45%] lg:w-[45%] bg-neutral-50 border border-gray-300 py-2 px-4 rounded-lg">
                                <label className="text-sm text-gray-600">نوع شناسه هویتی</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="nationalIdType"
                                            value="کد ملی"
                                            checked={formData.nationalIdType === 'کد ملی'}
                                            onChange={handleChange}
                                            className="ml-2"
                                        />
                                        کد ملی
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="nationalIdType"
                                            value="اتباع"
                                            checked={formData.nationalIdType === 'اتباع'}
                                            onChange={handleChange}
                                            className="ml-2"
                                        />
                                        اتباع
                                    </label>
                                </div>
                            </div>
                            {/* تصویر کارت ملی */}
                            <div className="flex justify-between items-center flex-wrap gap-2 bg-[#f9f9f9] w-full md:w-[45%] lg:w-[45%] p-4 rounded-lg border border-gray-300">
                                <label className="text-sm text-gray-600">تصویر کارت ملی:</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="text-sm"
                                />
                            </div>
                        </div>
                        {/* نام و نام خانوادگی */}
                        <div className="flex gap-4">
                            <div className='w-full'>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="نام *"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    required
                                />
                                {formErrors.name && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                                )}
                            </div>
                            <div className='w-full'>
                                <input
                                    type="text"
                                    name="familyName"
                                    placeholder="نام خانوادگی *"
                                    value={formData.familyName}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.familyName ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    required
                                />
                                {formErrors.familyName && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.familyName}</p>
                                )}
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            {/* کد ملی/اتباع */}
                            <div className='w-full'>
                                <input
                                    type="text"
                                    name="nationalId"
                                    placeholder={`${formData.nationalIdType} *`}
                                    value={formData.nationalId}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.nationalId ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    required
                                />
                                {formErrors.nationalId && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.nationalId}</p>
                                )}
                            </div>
                            {/* نام پدر */}
                            <div className='w-full'>
                                <input
                                    type="text"
                                    name="fatherName"
                                    placeholder="نام پدر"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.fatherName ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                {formErrors.fatherName && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.fatherName}</p>
                                )}
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            {/* تاریخ تولد */}
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    name="birthDate"
                                    placeholder="مثال: 1370/06/31"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${dateError ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    dir="ltr"
                                />
                                {dateInputGuide && (
                                    <span className="ps-2 text-gray-500 text-xs absolute right-0 mt-1" dir='rtl'>
                                        {dateInputGuide}
                                    </span>
                                )}
                                {dateError && (
                                    <span className="ps-2 text-red-500 text-xs absolute right-0 mt-1" dir='rtl'>
                                        {dateError}
                                    </span>
                                )}
                                <small className="text-gray-500 block mt-1 text-xs">
                                    فرمت: سال/ماه/روز
                                </small>
                            </div>

                            {/* محل تولد */}
                            <div className='w-full'>
                                <input
                                    type="text"
                                    name="birthPlace"
                                    placeholder="محل تولد"
                                    value={formData.birthPlace}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.birthPlace ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                />
                                {formErrors.birthPlace && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.birthPlace}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* اطلاعات تماس */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-700">اطلاعات تماس</h3>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-full">
                                {/* استان */}
                                <select
                                    name="state"
                                    value={provinces.find(p => p.label === formData.state)?.value || ''}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.state ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    required
                                >
                                    <option value="">انتخاب استان</option>
                                    {provinces.map(province => (
                                        <option key={province.value} value={province.value}>
                                            {province.label}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.state && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.state}</p>
                                )}
                            </div>

                            {/* شهر */}
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="شهر *"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.city ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    required
                                />
                                {formErrors.city && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>
                                )}
                            </div>
                        </div>

                        {/* آدرس */}
                        <div>
                            <textarea
                                name="address"
                                placeholder="آدرس کامل *"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full p-3 rounded-lg border ${formErrors.address ? 'border-red-500' : 'border-gray-300'
                                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                required
                            ></textarea>
                            {formErrors.address && (
                                <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                            )}
                        </div>

                        {/* پلاک و واحد */}
                        <div className="flex justify-between flex-wrap gap-4">
                            <div className='w-[46%] md:w-1/4'>
                                <input
                                    type="text"
                                    name="buildingNumber"
                                    placeholder="پلاک"
                                    value={formData.buildingNumber}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    dir='ltr'
                                />
                            </div>
                            <div className='w-[46%] md:w-1/4'>
                                <input
                                    type="text"
                                    name="unit"
                                    placeholder="واحد"
                                    value={formData.unit}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    dir='ltr'
                                />
                            </div>
                            <div className='w-full md:w-1/3'>
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="کد پستی *"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.postalCode ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    dir="ltr"
                                    required
                                />
                                {formErrors.postalCode && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.postalCode}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4">
                            {/* شماره همراه */}
                            <div className="w-full">
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="شماره همراه *"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.mobile ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    dir='ltr'
                                    required
                                />
                                {formErrors.mobile && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.mobile}</p>
                                )}
                            </div>

                            {/* شماره ثابت */}
                            <div className="w-full">
                                <input
                                    type="tel"
                                    name="landlineNumber"
                                    placeholder="شماره ثابت"
                                    value={formData.landlineNumber}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.landlineNumber ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    dir='ltr'
                                />
                                {formErrors.landlineNumber && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.landlineNumber}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between flex-wrap gap-4">
                            {/* پست الکترونیکی */}
                            <div className='w-full sm:w-[48%]'>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="پست الکترونیکی"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'
                                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    dir='ltr'
                                />
                                {formErrors.email && (
                                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                                )}
                            </div>
                            <div className='w-full sm:w-[48%]'>
                                {/* نحوه آشنایی */}
                                <select
                                    name="referralSource"
                                    value={formData.referralSource}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">نحوه آشنایی</option>
                                    <option value="friends">دوستان</option>
                                    <option value="search">جستجو</option>
                                    <option value="advertising_billboard">بیلبورد تبلیغاتی</option>
                                    <option value="advertising_sms">پیامک تبلیغاتی</option>
                                    <option value="email">پست الکترونیکی</option>
                                    <option value="newspaper">روزنامه</option>
                                    <option value="exhibition">نمایشگاه</option>
                                    <option value="tv_advertising">تبلیغات تلویزیونی</option>
                                    <option value="representatives">نمایندگان</option>
                                    <option value="social_media">رسانه های اجتماعی</option>
                                    <option value="radio_advertising">تبلیغات رادیویی</option>
                                    <option value="advertising">تبلیغات</option>
                                    <option value="programs">برنامه ها</option>
                                    <option value="club">باشگاه</option>
                                    <option value="conference">کنفرانس</option>
                                    <option value="internet_tv">تلویزیون اینترنتی</option>
                                    <option value="festival">جشنواره</option>
                                    <option value="others">موارد دیگر</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selected Service Summary */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">سرویس انتخاب شده</h3>
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <p className="font-medium text-gray-800">- {selectedService.name}</p>
                        <p className="text-sm text-gray-600 mr-3">سرعت: {selectedService.speed}</p>
                    </div>
                    <div className="text-left">
                        <p className="text-sm text-gray-600">مبلغ قابل پرداخت</p>
                        <p className="text-lg font-bold text-blue-600">
                            {new Intl.NumberFormat('fa-IR').format(selectedService.price)} تومان
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-4 space-x-reverse">
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                    انصراف
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                    ثبت و ادامه
                </button>
            </div>
        </div>
    );
};

export default ServiceRegistrationForm;