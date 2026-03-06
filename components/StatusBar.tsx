"use client";

import { motion } from "framer-motion";

export default function StatusBar() {
  return (
    <div className="fixed bottom-0 w-full bg-red-600 text-white py-1 z-[10000] overflow-hidden">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap text-[10px] font-black uppercase tracking-widest"
      >
        <span>/ SYSTEM_STATUS: ONLINE // 7H_SYNDICATE_ENCRYPTED // DROP_01_ACTIVE // NO_REFUNDS //</span>
        <span>/SYSTEM_STATUS: ONLINE // 7H_SYNDICATE_ENCRYPTED // DROP_01_ACTIVE // NO_REFUNDS //</span>
        <span>/SYSTEM_STATUS: ONLINE // 7H_SYNDICATE_ENCRYPTED // DROP_01_ACTIVE // NO_REFUNDS //</span>
        <span>/SYSTEM_STATUS: ONLINE // 7H_SYNDICATE_ENCRYPTED // DROP_01_ACTIVE // NO_REFUNDS //</span>
      </motion.div>
    </div>
  );
}