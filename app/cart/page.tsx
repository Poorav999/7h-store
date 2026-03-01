"use client";

import { useCart } from "../../components/CartContext";
import Link from "next/link";
import Script from "next/script";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  
  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  const makePayment = async () => {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: subtotal }),
    });

    const orderData = await res.json();

    if (!orderData.id) {
      alert("Order creation failed. Check your API route and .env keys.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: orderData.amount,
      currency: "INR",
      name: "7 HOUSES | 7H",
      description: "Premium Streetwear Syndicate Drop",
      order_id: orderData.id,
      // --- UPDATED HANDLER START ---
      handler: function (response: any) {
        console.log("Payment Successful:", response.razorpay_payment_id);
        
        // 1. Wipe the local storage so the cart is empty
        localStorage.removeItem("7h-cart");
        
        // 2. Alert and Redirect to your brand new success page
        alert("PAYMENT SUCCESSFUL! WELCOME TO THE SYNDICATE 🔥");
        window.location.href = "/success";
      },
      // --- UPDATED HANDLER END ---
      prefill: {
        name: "7H Customer",
      },
      theme: {
        color: "#000000",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12 md:py-24">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-12 border-b-2 border-white pb-6">
          Your Bag <span className="text-red-600">[{cart.length}]</span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800">
            <p className="text-zinc-500 font-bold uppercase tracking-widest mb-8">Your bag is empty.</p>
            <Link href="/shop" className="border-2 border-white px-8 py-3 font-black uppercase hover:bg-white hover:text-black transition-all">
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {cart.map((item: any) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-6 border-b-2 border-zinc-900 pb-8 items-center">
                <img src={item.image} alt={item.name} className="w-32 h-40 object-cover border-2 border-white grayscale" />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-black uppercase tracking-tight">{item.name}</h2>
                  <p className="text-zinc-400 font-bold uppercase text-sm tracking-widest">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black mb-4">₹{item.price * item.quantity}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs font-black uppercase tracking-widest text-red-600 hover:text-white transition-colors"
                  >
                    [ Remove Item ]
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t-4 border-white">
              <div className="flex justify-between items-center mb-10">
                <span className="text-2xl font-black uppercase tracking-widest">Subtotal</span>
                <span className="text-4xl font-black">₹{subtotal}</span>
              </div>

              <button 
                onClick={makePayment}
                className="block w-full bg-white text-black text-center font-black uppercase tracking-[0.3em] py-6 text-2xl hover:bg-red-600 hover:text-white transition-all"
              >
                Proceed to Checkout
              </button>
              
              <p className="text-center text-xs text-zinc-500 font-bold uppercase tracking-widest mt-6">
                UPI / Card / NetBanking Powered by Razorpay
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}