// PaymentResult.jsx
const PaymentResult = () => {
    const { status, orderId } = useParams();
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                {status === "success" ? (
                    <>
                        <div className="text-center text-green-600 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">پرداخت موفق</h2>
                        <p className="text-gray-600 text-center">سفارش شما با موفقیت ثبت و پرداخت شد.</p>
                    </>
                ) : (
                    <>
                        <div className="text-center text-red-600 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">خطا در پرداخت</h2>
                        <p className="text-gray-600 text-center">متأسفانه مشکلی در پرداخت شما پیش آمده است.</p>
                    </>
                )}

                <div className="mt-6 text-center">
                    <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        بازگشت به صفحه اصلی
                    </button>
                </div>
            </div>
        </div>
    );
};

export { PaymentResult }