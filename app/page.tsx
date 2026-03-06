import Reveal from "@/components/Reveal";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import IntroSequence from "@/components/IntroSequence";
import { Heart } from "lucide-react";

export const revalidate = 0;

export default async function HomePage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const heroProduct = products[0];
  const marqueeProducts = products.length > 1 ? products.slice(1) : [];

  // Duplicate for smooth infinite scroll
  const scrollProducts = [...marqueeProducts, ...marqueeProducts, ...marqueeProducts];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <IntroSequence />

      <div className="grid grid-cols-1 md:grid-cols-4 h-screen">
        {/* Left Panel - Hero Section (75%) */}
        <section className="col-span-3 relative flex flex-col justify-end border-r border-zinc-900 group overflow-hidden">
          <div className="relative h-full w-full overflow-hidden">
            {heroProduct && (
              <Image
                src={heroProduct.images?.[0] || "/shadyblue.jpg"}
                alt={heroProduct.name}
                fill
                unoptimized
                className="object-cover brightness-[0.3] group-hover:scale-105 transition-transform duration-[20s] ease-out"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>

          <div className="absolute bottom-12 left-12 z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 pr-24">
            <Reveal>
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl md:text-5xl font-serif italic text-white tracking-widest text-left">
                  latest
                </h2>
                <h3 className="text-[12vw] leading-[0.85] font-black font-syncopate uppercase tracking-tighter text-white">
                  DROPS
                </h3>
              </div>
            </Reveal>

            {heroProduct && (
              <Reveal>
                <Link
                  href={`/product/${heroProduct.id}`}
                  className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors flex shrink-0 items-center justify-center -mb-2"
                >
                  Explore Hero Piece
                </Link>
              </Reveal>
            )}
          </div>
        </section>

        {/* Right Panel - Vertical Marquee Storefront (25%) */}
        <section className="col-span-1 relative bg-black flex flex-col h-screen overflow-hidden">
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute w-full flex flex-col gap-8 animate-marquee-vertical py-8">
              {scrollProducts.length === 0 ? (
                <div className="text-zinc-500 font-bold uppercase tracking-widest text-center mt-20">
                  No Intel Yet
                </div>
              ) : (
                scrollProducts.map((product, idx) => (
                  <Link
                    href={`/product/${product.id}`}
                    key={`${product.id}-${idx}`}
                    className="block group px-4 md:px-8"
                  >
                    <div className="relative w-full aspect-[4/5] bg-[#0a0a0a] overflow-hidden mb-4">
                      <Image
                        src={product.images?.[0] || "/shadyblue.jpg"}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {product.isSoldOut && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <span className="text-white font-syncopate font-bold text-xs tracking-widest border border-white px-2 py-1">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-syncopate font-bold text-red-600">
                          ₹{product.price}
                        </span>
                        <span className="text-[10px] font-syncopate font-bold text-zinc-600 line-through">
                          ₹{Math.floor(product.price * 1.35)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Top faded gradient for smooth entry */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
            {/* Bottom faded gradient above the button */}
            <div className="absolute bottom-[4.5rem] left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
          </div>

          {/* Stark Bright Red 'SHOP NOW ↗' block at absolute bottom */}
          <div className="absolute bottom-0 left-0 w-full z-20">
            <Link
              href="/shop"
              className="flex items-center justify-between w-full bg-red-600 text-white font-black uppercase tracking-[0.2em] px-8 py-6 hover:bg-red-700 transition-colors"
            >
              <span>Shop Now</span>
              <span className="text-xl">↗</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ALL DROPS Section */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto w-full">
        {/* Header flex strictly matching reference */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-8">
          <div className="flex items-end gap-3 tracking-widest uppercase">
            <span className="text-3xl md:text-5xl font-serif italic text-white leading-none">
              all
            </span>
            <span className="text-4xl md:text-6xl font-black font-syncopate text-red-600 leading-none">
              DROPS
            </span>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors"
          >
            VIEW ALL ↗
          </Link>
        </div>

        {/* 4-Column Grid, Zero Gap internally matching strict boxy layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0">
          {products.length === 0 ? (
            <p className="text-zinc-500 font-bold uppercase tracking-widest col-span-full py-12">
              No Drops Currently Available
            </p>
          ) : (
            products.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={`alldrops-${product.id}`}
                className="group border border-zinc-800 bg-black flex flex-col hover:border-zinc-500 transition-colors"
              >
                {/* Image Box */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#050505]">
                  {/* Top Bar absolute indicators */}
                  <div className="absolute top-3 left-3 z-10">
                    <Heart className="text-zinc-600 hover:text-white transition-colors cursor-pointer w-5 h-5" />
                  </div>
                  <div className="absolute top-3 right-3 z-10 bg-red-600 text-white font-black text-[10px] px-2 py-1 tracking-widest">
                    35% OFF
                  </div>

                  <Image
                    src={product.images?.[0] || "/shadyblue.jpg"}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105 p-6"
                  />
                  {product.isSoldOut && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white font-syncopate font-bold text-xs tracking-widest border border-white px-2 py-1">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Text Area */}
                <div className="border-t border-zinc-800 p-4 flex flex-col gap-2">
                  <h4 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-red-600 transition-colors">
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
      </section>
    </main>
  );
}