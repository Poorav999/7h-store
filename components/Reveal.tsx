"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
}

export default function Reveal({ children, width = "fit-content" }: Props) {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  );
}