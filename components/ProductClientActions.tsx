"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";
import type { Product } from "@/components/CartContext";

export default function ProductClientActions({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const sizes = ["XS", "S", "M", "L", "XL"];

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("PLEASE SELECT A SIZE");
            return;
        }

        // Add the specific quantity to cart
        for (let i = 0; i < quantity; i++) {
            addToCart({
                ...product,
                name: `${product.name} (SIZE: ${selectedSize})`,
            });
        }

        alert(`ADDED ${quantity}x ${product.name} TO CART`);
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Price & Badge */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-6 w-full">
                <div className="flex items-center gap-3">
                    <span className="text-red-600 text-2xl font-bold">
                        ₹{product.price}
                    </span>
                    <span className="text-zinc-500 line-through">
                        ₹{Math.floor(product.price * 1.35)}
                    </span>
                </div>
                <div className="bg-red-600 text-white font-black text-xs px-2 py-1 tracking-widest">
                    35% OFF
                </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-4">
                <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                    Select Size
                </span>
                <div className="grid grid-cols-4 gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-3 font-bold transition-colors ${selectedSize === size
                                ? "bg-red-600 text-white border border-red-600"
                                : "bg-black text-white border border-zinc-700 hover:border-zinc-500"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 w-full">
                {/* Dark quantity selector box */}
                <div className="flex items-center bg-[#111] border border-zinc-800 shrink-0">
                    <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-12 h-14 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-xl font-light"
                    >
                        -
                    </button>
                    <span className="w-10 text-center font-bold text-lg select-none text-white">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="w-12 h-14 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-xl font-light"
                    >
                        +
                    </button>
                </div>

                {/* Massive red 'ADD TO CART' button */}
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black uppercase text-xl md:text-2xl tracking-[0.1em] transition-colors"
                >
                    {selectedSize ? "ADD TO CART" : "SELECT SIZE"}
                </button>
            </div>

            {/* Description & Care */}
            <div className="pt-8 mt-4 border-t border-zinc-800 flex flex-col gap-6">
                <p className="text-zinc-400 font-mono text-sm leading-relaxed uppercase tracking-widest">
                    {product.description || "HEAVYWEIGHT COTTON BLEND. RELAXED DROPPED SHOULDER FIT. SIGNATURE SYNDICATE WASH. DESIGNED IN THE UNDERGROUND."}
                </p>

                <div className="flex flex-col gap-3">
                    <span className="text-white font-black tracking-widest text-xs uppercase">
                        MATERIAL & CARE
                    </span>
                    <ul className="list-disc list-inside text-zinc-500 font-mono text-[10px] tracking-widest uppercase">
                        <li>100% HEAVY FRENCH TERRY</li>
                        <li>COLD MACHINE WASH</li>
                        <li>DO NOT TUMBLE DRY</li>
                        <li>AVOID IRONING PRINTS</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
