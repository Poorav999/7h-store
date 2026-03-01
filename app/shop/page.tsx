import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function ShopPage() {
  // Fetch all products directly from your Neon database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-12 border-b-2 border-white pb-6">
          Collections
        </h1>

        {products.length === 0 ? (
          <p className="text-zinc-500 font-bold uppercase tracking-widest">No drops available yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product) => (
              <div key={product.id} className="group border-2 border-white bg-zinc-950 p-4 transition-all duration-300 hover:border-red-600">
                <div className="aspect-[3/4] relative overflow-hidden bg-zinc-900 mb-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h2 className="text-xl font-black uppercase tracking-widest mb-1 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h2>
                <p className="text-zinc-400 text-sm mb-4 font-bold uppercase tracking-wider">
                  ${product.price} USD
                </p>
                <Link 
                  href={`/product/${product.id}`}
                  className="block w-full text-center border-2 border-white py-3 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}