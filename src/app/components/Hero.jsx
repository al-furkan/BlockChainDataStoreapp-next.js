"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-82px)] flex items-center justify-center px-4 md:px-8"
    >
      {/* Background Image */}
      <Image
        src="/image/hero-bg.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay (optional for readability) */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-2xl text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold">Blockchain Referral App</h2>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          A secure sponsor-based blockchain referral system
        </p>

        <Link
          href="/register"
          className="mt-6 inline-block bg-blue-600 text-white uppercase tracking-wider font-semibold text-sm px-10 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          Registration By Sponsor
        </Link>
      </div>
    </section>
  );
}
