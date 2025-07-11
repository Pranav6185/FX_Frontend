import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface EnrollButtonProps {
  amount: number;
  batchId: string;
  batchName: string;
}

const EnrollButton: React.FC<EnrollButtonProps> = ({ amount, batchId, batchName }) => {
  const { user } = useAuth();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!user) return alert("Please log in to enroll");

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    const orderRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await orderRes.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
      amount: order.amount,
      currency: "INR",
      name: "FxStreampro",
      description: `Enrollment for ${batchName}`,
      order_id: order.id,
      handler: async function (response: any) {
        const verifyRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
        const verifyData = await verifyRes.json();

       const token = localStorage.getItem('token');
       const userStr = localStorage.getItem('fxstreampro_user');
       const userObj = userStr ? JSON.parse(userStr) : null;
const userId = userObj?.id || userObj?._id;
       console.log("User ID:", userId);
console.log("Token:", token);

       if (!token) {
      alert({ title: 'Unauthorized', description: 'Login required.' });
      return;
    }

        if (verifyData.success) {
          // Enroll user in batch
          await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/batches/enroll/${userId}/${batchId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}` },
            body: JSON.stringify({ userId: user._id }),
          });

          setPaymentSuccess(true);
        } else {
          alert("❌ Payment verification failed.");
        }
      },
      prefill: {
        name: user.fullName,
        email: user.email,
      },
      theme: {
        color: "#0e7490",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {!paymentSuccess ? (
        <button
          onClick={handlePayment}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          Enroll Now
        </button>
      ) : (
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScww7mdI3bX3gOXueRPGpnvaK9dAR5U-wlojOJ2X22Z-jJaYA/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow inline-block text-center"
        >
          Fill Registration Form
        </a>
      )}
    </>
  );
};

export default EnrollButton;
