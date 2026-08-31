"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SPLASH_PARTICLES } from "@/lib/particles";

export default function IntroSplash() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("huffman_intro_seen");
    if (seen) return;
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("huffman_intro_seen", "true");
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #D71920 0%, #1A1A2E 50%, #0054A6 100%)",
            }}
            animate={{
              background: [
                "linear-gradient(135deg, #D71920 0%, #1A1A2E 50%, #0054A6 100%)",
                "linear-gradient(225deg, #0054A6 0%, #1A1A2E 50%, #D71920 100%)",
                "linear-gradient(135deg, #D71920 0%, #1A1A2E 50%, #0054A6 100%)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Floating particles — fixed positions */}
          {SPLASH_PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{ left: p.left, top: p.top }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}

          <motion.div
            className="relative z-10 text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
          >
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Image
                src="/images/logo.png"
                alt="Huffman Heating & Air Conditioning"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 text-sm tracking-[0.4em] uppercase font-semibold"
            >
              Since 1962
            </motion.p>

            <motion.div
              className="mt-6 h-1 w-32 mx-auto rounded-full overflow-hidden bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full rounded-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Curtain reveal */}
          <motion.div
            className="absolute inset-0 bg-white z-20"
            initial={{ scaleY: 0, transformOrigin: "top" }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1, transformOrigin: "top" }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
