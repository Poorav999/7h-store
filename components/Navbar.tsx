"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const ADMIN_EMAIL = "juice.wrld999dead@gmail.com";

  return (
    <nav className="border-b-2 border-white bg-black text-white px-4 md:px-8 py-5 flex items-center justify-between uppercase font-black tracking-widest sticky top-0 z-50">
      
      {/* LEFT: Brand Logo */}
      <Link href="/" className="text-3xl tracking-tighter hover:text-red-600 transition-colors duration-200">
        7H.
      </Link>

      {/* CENTER: Navigation Links (Hidden on small phones) */}
      <div className="hidden md:flex space-x-10">
        <Link href="/shop" className="hover:text-red-600 transition-colors duration-200">
          Shop
        </Link>
        <Link href="/drops" className="hover:text-red-600 transition-colors duration-200">
          Drops
        </Link>
      </div>

      {/* RIGHT: Admin, Login/Logout, and Cart */}
      <div className="flex items-center space-x-6 md:space-x-8 text-sm md:text-base">
        
        {/* Only show Command Center if the Admin is logged in */}
        {session?.user?.email === ADMIN_EMAIL && (
          <Link href="/admin" className="text-red-600 hover:text-white transition-colors duration-200 hidden sm:block">
            [ ADMIN ]
          </Link>
        )}

        {/* Dynamic Login / Logout Button */}
        {session ? (
          <button 
            onClick={() => signOut()} 
            className="hover:text-red-600 transition-colors duration-200"
          >
            LOGOUT
          </button>
        ) : (
          <button 
            onClick={() => signIn("google")} 
            className="hover:text-red-600 transition-colors duration-200"
          >
            LOGIN
          </button>
        )}
        
        {/* Shopping Cart */}
        <Link href="/cart" className="hover:text-red-600 transition-colors duration-200 flex items-center">
          CART <span className="ml-1 text-red-600">[0]</span>
        </Link>
      </div>
    </nav>
  );
}