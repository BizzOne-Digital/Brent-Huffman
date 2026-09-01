import Image from "next/image";
import { ExternalLink } from "lucide-react";

export const DEFAULT_GOOGLE_REVIEW_URL = "https://g.page/r/Cf1yypINidZQEBM/review";

interface GoogleReviewBlockProps {
  className?: string;
  variant?: "light" | "dark";
  reviewUrl?: string;
}

export default function GoogleReviewBlock({
  className = "",
  variant = "light",
  reviewUrl = DEFAULT_GOOGLE_REVIEW_URL,
}: GoogleReviewBlockProps) {
  const isDark = variant === "dark";

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <p
        className={`font-bold text-sm mb-3 ${
          isDark ? "text-white" : "text-huffman-dark"
        }`}
      >
        Leave us a review
      </p>
      <div className="bg-white p-2.5 rounded-xl shadow-md">
        <Image
          src="/images/google-review-qr.png"
          alt="Scan to leave a Google review for Huffman Heating & Air Conditioning"
          width={120}
          height={120}
          className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
        />
      </div>
      <p className={`text-xs mt-2 max-w-[11rem] ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        Scan with your phone camera
      </p>
      <span className={`text-xs my-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>or</span>
      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
          isDark
            ? "text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-full"
            : "text-huffman-blue hover:text-huffman-red"
        }`}
      >
        <ExternalLink size={16} />
        Leave a Google review
      </a>
    </div>
  );
}
