"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function FloatingOrb({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute w-72 h-72 rounded-full opacity-[0.03] pointer-events-none ${className}`}
    />
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* ── Header ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
                <line x1="12" y1="2" x2="12" y2="6" strokeWidth="1.5" />
                <line x1="12" y1="18" x2="12" y2="22" strokeWidth="1.5" />
                <line x1="2" y1="12" x2="6" y2="12" strokeWidth="1.5" />
                <line x1="18" y1="12" x2="22" y2="12" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="font-semibold text-sm text-white/80">Dream Team Builder</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/builder"
              className="
                px-4 py-2 rounded-lg text-xs font-medium
                bg-white text-black hover:bg-white/90
                transition-all duration-200
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
        <FloatingOrb className="top-1/4 left-1/4 bg-white blur-[120px]" />
        <FloatingOrb className="top-1/3 right-1/4 bg-white blur-[100px]" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium">
              Fantasy Football Builder
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white/90 mb-5">
            Build Your
            <br />
            <span className="text-white">Ultimate XI</span>
          </h1>

          <p className="text-base sm:text-lg text-white/40 max-w-lg mx-auto mb-10 leading-relaxed">
            Select formations, scout legends and stars, manage your budget, and
            build the perfect football dream team.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/builder"
              className="
                inline-flex px-6 py-3 rounded-xl text-sm font-semibold
                bg-white text-black
                hover:bg-white/90 hover:scale-[1.02]
                transition-all duration-200 shadow-lg
              "
            >
              Start Building
            </Link>
            <Link
              href="/builder"
              className="
                inline-flex px-6 py-3 rounded-xl text-sm font-medium
                bg-white/[0.06] text-white/60
                hover:bg-white/[0.1] hover:text-white/80
                transition-all duration-200
              "
            >
              Explore Formations
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 rounded-full border border-white/[0.1] flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-white/30 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-white/90 mb-3">
              Everything You Need
            </h2>
            <p className="text-sm text-white/40 max-w-md mx-auto">
              A minimal, powerful tool to build your perfect squad
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "6 Formations",
                desc: "From 4-3-3 to 5-3-2, switch formations instantly and watch your team rearrange.",
              },
              {
                title: "300+ Players",
                desc: "Browse football legends and stars, filtered by position, club, country, and rating.",
              },
              {
                title: "Budget System",
                desc: "Start with ₹500 Crore. Negotiate transfer values and stay within your budget.",
              },
              {
                title: "Drag & Drop",
                desc: "Intuitively drag players onto the pitch. Only valid positions allowed.",
              },
              {
                title: "Team Stats",
                desc: "Track your attack, midfield, and defence ratings in real-time.",
              },
              {
                title: "Dark Theme",
                desc: "Monochromatic dark design for a premium, focused experience.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass rounded-xl p-5 hover:bg-white/[0.06] transition-all duration-200"
              >
                <h3 className="text-sm font-semibold text-white/80 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto text-center glass rounded-2xl p-12">
          <h2 className="text-2xl font-bold text-white/90 mb-3">
            Ready to Build?
          </h2>
          <p className="text-sm text-white/40 mb-8 max-w-sm mx-auto">
            No sign-up required. Start building your dream team right now.
          </p>
          <Link
            href="/builder"
            className="
              inline-flex px-8 py-3.5 rounded-xl text-sm font-semibold
              bg-white text-black
              hover:bg-white/90 hover:scale-[1.02]
              transition-all duration-200 shadow-lg
            "
          >
            Open Team Builder
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-8 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs text-white/20">Dream Team Builder</span>
          <span className="text-xs text-white/20">
            Built with Next.js · Monochromatic · 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
