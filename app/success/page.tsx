import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
      {/* Brutalist Success Icon */}
      <div className="border-4 border-green-500 p-8 mb-8 animate-pulse">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-green-500">
          SECURED
        </h1>
      </div>

      <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest mb-4">
        Welcome to the Syndicate
      </h2>
      
      <p className="text-zinc-500 font-bold uppercase tracking-widest max-w-md mb-12">
        Your order is being processed by the 7H team. Check your email for the manifest.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <Link 
          href="/shop" 
          className="flex-1 bg-white text-black font-black uppercase tracking-widest py-4 hover:bg-red-600 hover:text-white transition-all text-center"
        >
          Return to Shop
        </Link>
        <button 
          onClick={() => window.print()}
          className="flex-1 border-2 border-white text-white font-black uppercase tracking-widest py-4 hover:bg-white hover:text-black transition-all"
        >
          Print Receipt
        </button>
      </div>

      {/* Security Footer */}
      <div className="absolute bottom-10 opacity-20 flex space-x-4 grayscale">
        <span className="text-[10px] font-black uppercase">7H_ENCRYPTED_TRANSACTION</span>
        <span className="text-[10px] font-black uppercase">//</span>
        <span className="text-[10px] font-black uppercase">STRICTLY_LIMITED_RELEASE</span>
      </div>
    </main>
  );
}