import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20 lg:pt-0">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-cinematic.jpg"
          alt="Cinematographer with cinema camera rig on set in KARAIKUDI"
          className="w-full h-full object-cover object-right-top lg:object-center filter brightness-[0.95]"
        />
        {/* Soft Radial Ambient Cinema Glow in center-left */}
        <div className="absolute -left-20 top-1/3 w-[600px] h-[600px] bg-[#F5B726]/10 rounded-full blur-[140px] pointer-events-none" />
        {/* Gradient edge blending */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Brand & Location pill badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#14141c]/90 border border-[#F5B726]/40 backdrop-blur-md mb-6 shadow-lg shadow-[#F5B726]/10 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="w-2 h-2 rounded-full bg-[#F5B726] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#F5B726] uppercase">
              PIXEL PRODUCTION &nbsp;·&nbsp; KARAIKUDI &nbsp;·&nbsp; WORLDWIDE
            </span>
          </div>

          {/* Main Headline with Prominent Studio Brand */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.05] mb-6">
            <span className="block text-2xl sm:text-3xl md:text-4xl font-sans font-black tracking-[0.2em] text-[#F5B726] uppercase mb-3 cinema-gold-text">
              PIXEL PRODUCTION
            </span>
            Your story,
            <br />
            told like{' '}
            <span className="italic font-serif font-normal cinema-gold-text pr-2">
              cinema.
            </span>
          </h1>

          {/* Subtext description */}
          <p className="text-lg sm:text-xl text-[#d4d4d8] font-normal leading-relaxed max-w-xl mb-10">
            Pixel Production crafts cinematic videos with feeling—for brands, people, and moments that
            deserve to be remembered.
          </p>

          {/* Direct Production Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-16 sm:mb-20">
            <a
              href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#F5B726]/20 hover:shadow-[#F5B726]/40 active:translate-y-0"
            >
              <span>Explore our videos</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href={STUDIO_INFO.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-base font-semibold text-emerald-300 bg-[#121216]/90 hover:bg-[#15231c] border border-emerald-500/40 hover:border-emerald-400 transition-all backdrop-blur-sm group shadow-md"
            >
              <div className="w-8 h-8 rounded-full border border-emerald-500/40 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                <span className="text-sm">💬</span>
              </div>
              <span>WhatsApp: +91 93423 36009</span>
            </a>
          </div>

          {/* Bottom Stats and Credibility Row */}
          <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-white/10 pt-8 max-w-xl">
            {STUDIO_INFO.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F5B726] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#a1a1aa] mt-1.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Far Right Bottom "Scroll to discover" */}
      <a
        href="#about"
        className="hidden lg:flex absolute bottom-10 right-10 items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#a1a1aa] hover:text-[#F5B726] uppercase transition-colors group z-10"
      >
        <span>SCROLL TO DISCOVER</span>
        <ChevronDown className="w-4 h-4 text-[#F5B726] group-hover:translate-y-1 transition-transform animate-bounce" />
      </a>
    </section>
  );
}

