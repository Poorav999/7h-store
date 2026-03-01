"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would normally send the email to a database or Mailchimp
      console.log("New Syndicate Member:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t-2 border-white bg-black text-white pt-16 pb-8 px-4 md:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
        
        {/* LEFT SIDE: Newsletter */}
        <div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            Join the Syndicate
          </h2>
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm mb-8">
            Sign up for early access to drops, secret links, and 7H news. No spam.
          </p>
          
          {subscribed ? (
            <div className="border-2 border-green-500 p-4 text-green-500 font-black uppercase tracking-widest text-center animate-pulse">
              [ TRANSMISSION SECURED. WELCOME. ]
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER EMAIL ADDRESS"
                className="flex-1 bg-black border-2 border-zinc-800 p-4 text-white focus:border-white focus:outline-none transition-colors uppercase font-bold tracking-widest text-sm"
              />
              <button 
                type="submit"
                className="bg-white text-black font-black uppercase tracking-[0.2em] px-8 py-4 hover:bg-red-600 hover:text-white transition-all"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* RIGHT SIDE: Navigation & Socials */}
        <div className="flex flex-col md:items-end space-y-4 font-black uppercase tracking-widest text-sm">
          <Link href="/shop" className="hover:text-red-600 transition-colors">Shop Collection</Link>
          <Link href="/drops" className="hover:text-red-600 transition-colors">Upcoming Drops</Link>
          <Link href="/admin" className="hover:text-red-600 transition-colors">Command Center</Link>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors pt-4 border-t-2 border-zinc-900 w-32 md:text-right">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-red-600 transition-colors">Twitter // X</a>
        </div>
      </div>

      {/* Massive Brand Footer */}
      <div className="border-t-2 border-zinc-900 pt-8 flex flex-col items-center">
        <h1 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter leading-none text-zinc-900 select-none">
          7HOUSES
        </h1>
        <div className="w-full flex justify-between items-center mt-4 text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest">
          <span>© 2026 7H SYNDICATE</span>
          <span>ALL RIGHTS RESERVED</span>
          <span>WORLDWIDE</span>
        </div>
      </div>
    </footer>
  );
}