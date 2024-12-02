// PaymentGateway.jsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentGateway = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const loadingToast = toast.loading("در حال اتصال به درگاه پرداخت...");

        const response = await axios.post(`http://localhost:5000/api/payment/start/${orderId}`);

        toast.dismiss(loadingToast);

        if (response.data.success) {
          // ایجاد فرم و ارسال به درگاه
          const form = document.createElement("form");
          form.method = "POST";
          form.action = response.data.data.redirectUrl;

          const tokenInput = document.createElement("input");
          tokenInput.type = "hidden";
          tokenInput.name = "tokenIdentity";
          tokenInput.value = response.data.data.token;

          form.appendChild(tokenInput);
          document.body.appendChild(form);
          form.submit();
        }
      } catch (error) {
        toast.error("خطا در اتصال به درگاه پرداخت");
        console.error("Payment initiation error:", error);
        navigate("/services");
      }
    };

    initiatePayment();
  }, [orderId]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
};


export { PaymentGateway };
