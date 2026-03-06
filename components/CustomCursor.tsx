"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  const springConfig = { damping: 30, stiffness: 800, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOut = () => setIsVisible(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseleave", handleOut);
    
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseleave", handleOut);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999999]">
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        {/* Purple Sword Glow */}
        <div className="w-1 h-16 bg-purple-500 blur-[3px] rounded-full rotate-[35deg] opacity-80" />
        {/* Core Blade */}
        <div className="absolute top-0 left-0 w-[2px] h-16 bg-white rounded-full rotate-[35deg] shadow-[0_0_15px_#a855f7]" />
        {/* Particle Trail */}
        <div className="absolute top-8 left-0 w-4 h-4 bg-purple-600/30 blur-xl rounded-full animate-pulse" />
      </motion.div>
    </div>
  );
}