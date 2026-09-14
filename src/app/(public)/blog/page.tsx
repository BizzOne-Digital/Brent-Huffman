import type { Metadata } from "next";
import HeroSection from "@/components/ui/HeroSection";
import SoroBlogEmbed from "@/components/blog/SoroBlogEmbed";

export const metadata: Metadata = {
  title: "Blog | Huffman Heating & Air Conditioning",
  description:
    "HVAC tips, maintenance advice, and updates from Huffman Heating & Air Conditioning in Catawba County.",
};

export default function BlogPage() {
  return (
    <>
      <HeroSection
        title="Blog"
        subtitle="Tips & Updates"
        content="Helpful heating and air conditioning information from our team."
        image="/images/logo.png"
      />
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SoroBlogEmbed />
        </div>
      </section>
    </>
  );
}
