"use client";

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  images: string[];
  category: string;
  stock: number;
  isSoldOut: boolean;
}

interface CartContextType {
  cartItems: Product[];
  isLoaded: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  cartTotal: number;
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("7h_cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCartItems(Array.isArray(parsed) ? (parsed as Product[]) : []);
      } catch {
        setCartItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const updated = [...prev, product];
      localStorage.setItem("7h_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("7h_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const cartTotal = cartItems.reduce((total, item) => total + (Number(item.price) || 0), 0);

  return (
    <CartContext.Provider value={{ cartItems, isLoaded, addToCart, removeFromCart, cartTotal, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}