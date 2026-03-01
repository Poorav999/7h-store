import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

// Added 'Promise' here to handle the new Next.js requirement
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // We MUST await the params before using them
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12 md:py-24">
      {/* ... rest of your UI code stays exactly the same ... */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
         {/* Your existing UI code here */}
         <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
            {product.name}
          </h1>
          {/* etc... */}
      </div>
    </main>
  );
}