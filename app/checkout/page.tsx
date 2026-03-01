"use client";

import { useCart } from "../../components/CartContext";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  // 1. Using cartTotal here
  const { cartItems, cartTotal } = useCart();

  const handlePayment = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // 2. Using your secure .env key
      amount: (cartTotal || 0) * 100, // Safe fallback to 0
      currency: "INR",
      name: "7 HOUSES",
      description: "Syndicate Order Payment",
      handler: function (response: any) {
        // Redirect to success page after payment
        window.location.href = "/success";
      },
      prefill: {
        name: "",
        email: "",
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      
      <Link 
        href="/cart" 
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition mb-12"
      >
        <ArrowLeft size={14} /> Back to Bag
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        <div className="space-y-12">
          
          {/* SHIPPING + PAYMENT UI remains same */}

          {/* 🔥 Updated Button with the correct cartTotal variable */}
          <button
            onClick={handlePayment}
            className="w-full bg-white text-black py-6 font-black uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition shadow-2xl flex items-center justify-center gap-3"
          >
            Complete Order — ₹{Number(cartTotal || 0).toFixed(2)} <ArrowRight size={20} />
          </button>

        </div>

        {/* Right section unchanged */}
        
      </div>
    </main>
  );
}