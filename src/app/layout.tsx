import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Huffman Heating & Air Conditioning | Since 1962",
  description:
    "Family-owned HVAC company serving Catawba County, NC since 1962. Heating, cooling, heat pumps, and metal ductwork. Free estimates on replacements and new installs.",
  keywords: "HVAC, heating, air conditioning, Claremont NC, Conover NC, Newton NC, Hickory NC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1A1A2E",
              color: "#fff",
              borderRadius: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
