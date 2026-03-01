"use client";
import { useCart } from "./CartContext";

export default function AddToCartBtn({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0]
        });
        alert("ADDED TO 7H SYNDICATE BAG 🔥");
      }}
      className="w-full bg-white text-black font-black uppercase tracking-[0.3em] py-6 text-xl hover:bg-red-600 hover:text-white transition-all duration-300"
    >
      Add to Cart
    </button>
  );
}