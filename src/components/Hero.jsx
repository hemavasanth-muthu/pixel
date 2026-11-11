import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-10">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Brand & Location pill badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#14141c]/90 border border-[#F5B726]/40 backdrop-blur-md mb-6 shadow-lg shadow-[#F5B726]/10 animate-in fade-in slide-in-from-bottom-2 duration-700 max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#F5B726] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#F5B726] uppercase truncate">
              PIXEL PRODUCTION &nbsp;·&nbsp; KARAIKUDI &nbsp;·&nbsp; WORLDWIDE
            </span>
          </div>

          {/* Main Headline with Prominent Studio Brand */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.08] sm:leading-[1.05] mb-6">
            <span className="block text-xl sm:text-3xl md:text-4xl font-sans font-black tracking-wider sm:tracking-[0.2em] text-[#F5B726] uppercase mb-2 sm:mb-3 cinema-gold-text">
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
          <p className="text-base sm:text-lg md:text-xl text-[#d4d4d8] font-normal leading-relaxed max-w-xl mb-8 sm:mb-10">
            Pixel Production crafts cinematic videos with feeling—for brands, people, and moments that
            deserve to be remembered.
          </p>

          {/* Direct Production Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 mb-12 sm:mb-16">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#F5B726]/20 hover:shadow-[#F5B726]/40 active:translate-y-0"
            >
              <span>Explore our videos</span>
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </a>

            <a
              href={STUDIO_INFO.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-emerald-300 bg-[#121216]/90 hover:bg-[#15231c] border border-emerald-500/40 hover:border-emerald-400 transition-all backdrop-blur-sm group shadow-md"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-emerald-500/40 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors shrink-0">
                <span className="text-sm">💬</span>
              </div>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Bottom Stats and Credibility Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-8 border-t border-white/10 pt-6 sm:pt-8 max-w-xl">
            {STUDIO_INFO.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F5B726] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-[0.2em] text-[#a1a1aa] mt-1 sm:mt-1.5 leading-tight">
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

