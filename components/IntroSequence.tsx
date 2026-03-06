"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function IntroSequence() {
    const [introFinished, setIntroFinished] = useState(false);
    const [isZooming, setIsZooming] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("introPlayed") === "true") {
            setIntroFinished(true);
        }
    }, []);

    // Once the animation finishes, we completely unmount the component
    if (introFinished) return null;

    const handleEnter = () => {
        setIsZooming(true);
        sessionStorage.setItem("introPlayed", "true");
        // Unmount after the animation completes (1.5s duration)
        setTimeout(() => {
            setIntroFinished(true);
        }, 1500);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black w-screen h-screen overflow-hidden origin-center"
            initial={{ scale: 1, opacity: 1 }}
            animate={
                isZooming
                    ? { scale: 15, opacity: 0 }
                    : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            <video
                src="/haunted.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Brutalist Button positioned at the bottom center */}
            <div className="absolute inset-x-0 bottom-24 md:bottom-32 flex justify-center z-10 pointer-events-auto">
                <button
                    onClick={handleEnter}
                    disabled={isZooming}
                    className={`px-10 py-5 bg-black/40 border border-white/80 text-white font-black tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-sm ${isZooming ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                >
                    Enter Syndicate
                </button>
            </div>
        </motion.div>
    );
}
