import { prisma } from "@/lib/prisma";
import Reveal from "@/components/Reveal";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductClientActions from "@/components/ProductClientActions";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) {
    notFound();
  }

  let rawImage = Array.isArray(product.images)
    ? product.images[0]
    : (typeof product.images === 'string' ? product.images : '/fallback.jpg');

  if (rawImage && !rawImage.startsWith('/') && !rawImage.startsWith('http')) {
    rawImage = `/${rawImage}`;
  }

  const imageUrl = rawImage || '/fallback.png';

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 px-6 py-12 lg:py-24 max-w-[1800px] mx-auto min-h-screen">

        {/* Left Column (Typography & Specs) */}
        <Reveal>
          <div className="flex flex-col h-full lg:sticky lg:top-32 w-full lg:pr-8">
            <span className="font-sans font-bold text-sm text-zinc-500 mb-6 block">
              7H
            </span>
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-[#f5f5f0] mb-8">
              {product.name}
            </h1>

            {/* Size Chart Table */}
            <div className="w-full mt-8">
              <span className="block text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500 mb-4">
                Size Guide (CM)
              </span>
              <table className="w-full text-left font-mono text-xs uppercase text-zinc-400 border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-300">
                    <th className="py-3 font-normal">Size</th>
                    <th className="py-3 font-normal">Chest</th>
                    <th className="py-3 font-normal">Sleeve</th>
                    <th className="py-3 font-normal">Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3">S</td>
                    <td className="py-3">58</td>
                    <td className="py-3">60</td>
                    <td className="py-3">70</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3 font-bold text-white">M</td>
                    <td className="py-3">60</td>
                    <td className="py-3">62</td>
                    <td className="py-3">72</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3">L</td>
                    <td className="py-3">62</td>
                    <td className="py-3">64</td>
                    <td className="py-3">74</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-3">XL</td>
                    <td className="py-3">64</td>
                    <td className="py-3">66</td>
                    <td className="py-3">76</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Center Column (The Product Image) */}
        <div className="relative w-full h-[60vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            unoptimized
            className="object-contain lg:object-cover"
          />
        </div>

        {/* Right Column (Checkout & Details) */}
        <Reveal>
          <div className="flex flex-col h-full lg:sticky lg:top-32 w-full lg:pl-8">
            <ProductClientActions product={product as any} />
          </div>
        </Reveal>

      </div>
    </main>
  );
}