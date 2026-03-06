import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Heart } from "lucide-react";

export const revalidate = 0;

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-[1600px] mx-auto text-white">
      {/* Header matching screenshot exactly */}
      <div className="flex items-end gap-3 mb-8 tracking-widest uppercase">
        <span className="text-4xl md:text-6xl font-serif italic text-white leading-none">
          shop
        </span>
        <span className="text-5xl md:text-7xl font-black font-syncopate text-red-600 leading-none">
          ALL
        </span>
      </div>

      {/* Static Filter UI */}
      <div className="border-y border-zinc-800 py-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-8 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">GENDER</span>
            <div className="flex gap-2">
              <button className="text-[10px] font-bold tracking-widest px-3 py-1 bg-white text-black uppercase">MEN</button>
              <button className="text-[10px] font-bold tracking-widest px-3 py-1 bg-black border border-zinc-800 text-zinc-400 uppercase">WOMEN</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-500">PRICE</span>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="under50" className="accent-red-600 w-3 h-3 bg-black border-zinc-800" />
              <label htmlFor="under50" className="text-[10px] font-bold tracking-widest uppercase text-white cursor-pointer">Under ₹5000</label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="sale" className="accent-red-600 w-3 h-3 bg-black border-zinc-800" defaultChecked />
              <label htmlFor="sale" className="text-[10px] font-bold tracking-widest uppercase text-white cursor-pointer">ON SALE</label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-500">SORT BY</span>
          <select className="bg-black border border-zinc-800 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 outline-none">
            <option>NEWEST</option>
            <option>PRICE: LOW TO HIGH</option>
            <option>PRICE: HIGH TO LOW</option>
          </select>
        </div>
      </div>

      {/* Edge-to-Edge Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-zinc-800">
        {products.length === 0 ? (
          <p className="text-zinc-500 font-bold uppercase tracking-widest col-span-full p-8 border-r border-b border-zinc-800">
            No intel found in the vault.
          </p>
        ) : (
          products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group border-r border-b border-zinc-800 bg-[#0a0a0a] flex flex-col relative hover:bg-[#111] transition-colors"
            >
              {/* Image Box */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10">
                  <Heart className="text-zinc-500 hover:text-white transition-colors cursor-pointer w-5 h-5" />
                </div>
                <div className="absolute top-3 right-3 z-10 bg-red-600 text-white font-black text-[10px] px-2 py-1 tracking-widest">
                  35% OFF
                </div>

                <Image
                  src={product.images?.[0] || "/shadyblue.jpg"}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />

                {product.isSoldOut && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                    <span className="text-white font-syncopate font-bold text-xs tracking-widest border border-white px-2 py-1">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </div>

              {/* Details Box */}
              <div className="p-4 flex flex-col gap-2">
                <h4 className="text-lg font-black uppercase tracking-tighter text-white group-hover:text-red-600 transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-syncopate font-bold text-white">
                    ₹{product.price}
                  </span>
                  <span className="text-[10px] font-syncopate font-bold text-zinc-500 line-through">
                    ₹{Math.floor(product.price * 1.35)}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}