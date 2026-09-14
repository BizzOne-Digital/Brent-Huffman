"use client";

import Script from "next/script";

/** Soro blog embed provided by Brent / trysoro.com */
const SORO_EMBED_SCRIPT = "https://app.trysoro.com/api/embed/5d5d6a5e-a38e-4583-a75b-1a5d561b9420";

export default function SoroBlogEmbed() {
  return (
    <>
      <div id="soro-blog" className="min-h-[320px]" />
      <Script src={SORO_EMBED_SCRIPT} strategy="lazyOnload" />
    </>
  );
}
