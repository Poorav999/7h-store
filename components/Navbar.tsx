"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const { cartItems, isLoaded } = useCart();
  const cartCount = isLoaded ? cartItems.length : 0;

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastScrollY(latest);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-8 px-8 py-3 bg-[#111] border border-zinc-800 rounded-sm"
    >
      <Link href="/" className="flex items-center justify-center p-0 m-0 outline-none">
        <Image
          src="/logo.png"
          alt="7H Logo"
          width={100}
          height={32}
          className="w-auto h-8 object-contain"
          priority
        />
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/shop"
          className={`text-sm font-bold uppercase tracking-[0.2em] transition-all hover:text-red-500 duration-300 ${pathname === "/shop" ? "text-red-600" : "text-zinc-300"
            }`}
        >
          Vault
        </Link>
        <Link
          href="/drops"
          className={`text-sm font-bold uppercase tracking-[0.2em] transition-all hover:text-red-500 duration-300 ${pathname === "/drops" ? "text-red-600" : "text-zinc-300"
            }`}
        >
          Drops
        </Link>
        <Link
          href="/cart"
          className={`text-sm font-bold uppercase tracking-[0.2em] transition-all hover:text-red-500 duration-300 flex items-center gap-2 ${pathname === "/cart" ? "text-red-600" : "text-zinc-300"
            }`}
        >
          Bag [{cartCount}]
        </Link>
      </div>
    </motion.nav>
  );
}