import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      {/* HERO SECTION 
        Brutalist layout with massive typography and sharp borders
      */}
      <section className="h-[90vh] flex flex-col items-center justify-center border-b-2 border-white relative overflow-hidden px-4 bg-zinc-950">
        
        {/* Massive RAWLINE style typography */}
        <h1 className="text-[12vw] sm:text-[10vw] font-black uppercase tracking-tighter leading-none text-center z-10">
          7HOUSES
          <br />
          {/* Outline text effect */}
          <span 
            className="text-transparent bg-clip-text" 
            style={{ WebkitTextStroke: '2px white'}}
          >
            SYNDICATE
          </span>
        </h1>
        
        <p className="mt-6 text-zinc-400 font-bold tracking-widest uppercase text-sm md:text-base">
          Premium Streetwear // Established 2026
        </p>

        {/* Brutalist Buttons */}
        <div className="absolute bottom-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 z-10 w-full sm:w-auto px-6">
          <Link 
            href="/shop" 
            className="w-full sm:w-auto text-center border-2 border-white bg-black px-10 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-200"
          >
            Shop Collection
          </Link>
          <Link 
            href="/drops" 
            className="w-full sm:w-auto text-center bg-red-600 border-2 border-red-600 px-10 py-4 font-black uppercase tracking-widest text-white hover:bg-red-700 hover:border-red-700 transition-all duration-200"
          >
            Latest Drops
          </Link>
        </div>
      </section>
      
      {/* MARQUEE BANNER 
        A classic streetwear design element 
      */}
      <div className="border-b-2 border-white py-3 bg-white text-black overflow-hidden flex whitespace-nowrap">
         <p className="font-black uppercase tracking-widest animate-pulse">
            // WORLDWIDE SHIPPING // NEW COLLECTION OUT NOW // 7H EXCLUSIVE // WORLDWIDE SHIPPING // 7H EXCLUSIVE //
         </p>
      </div>
    </main>
  );
}