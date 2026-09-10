"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
}: ButtonProps) {
  const variants = {
    primary: "shimmer-btn text-white shadow-lg hover:shadow-xl",
    secondary: "bg-huffman-blue text-white hover:bg-huffman-blue-dark shadow-md",
    outline:
      "border-2 border-white text-white hover:bg-white hover:text-huffman-red transition-colors",
  };

  const baseClass = `inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 min-h-11 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href={href} className={baseClass}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${baseClass} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </motion.button>
  );
}
