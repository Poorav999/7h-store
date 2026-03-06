"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <Reveal>
      <Link href={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden aspect-[3/4] bg-zinc-900 border-2 border-transparent group-hover:border-white transition-all duration-500">
          {/* The Main Image with Distortion Effect */}
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ 
              scale: 1.05,
              filter: "grayscale(0%) contrast(110%)",
            }}
            className="w-full h-full object-cover grayscale transition-all duration-700 ease-in-out"
          />

          {/* Overlays */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          
          <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
            [ Limited Release ]
          </div>

          <div className="absolute bottom-4 right-4 bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-tighter border border-white opacity-0 group-hover:opacity-100 transition-all">
            View Details
          </div>
        </div>

        {/* Product Info - Clean & Technical */}
        <div className="mt-6 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-red-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">
              {product.category} /SYNDICATE_SERIES
            </p>
          </div>
          <p className="font-black text-xl italic font-syncopate">
            ₹{product.price}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

// Small helper for the reveal effect inside the card
function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}