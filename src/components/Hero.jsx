import React from 'react';
import { ArrowRight, Video, ChevronDown } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';

export default function Hero({ onOpenFindVideoModal }) {
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
          {/* KARAIKUDI · Available Worldwide pill tag */}
          <div className="inline-flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="w-8 h-[2px] bg-[#F5B726]" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#d4d4d8] uppercase">
              KARAIKUDI &nbsp;·&nbsp; AVAILABLE WORLDWIDE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.05] mb-6">
            Your story,
            <br />
            told like{' '}
            <span className="italic font-serif font-normal cinema-gold-text pr-2">
              cinema.
            </span>
          </h1>

          {/* Subtext description */}
          <p className="text-lg sm:text-xl text-[#a1a1aa] font-normal leading-relaxed max-w-xl mb-10">
            We craft videos with feeling—for brands, people, and moments that
            deserve to be remembered.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-16 sm:mb-20">
            <a
              href="#work"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#F5B726]/20 hover:shadow-[#F5B726]/40 active:translate-y-0"
            >
              <span>Explore our videos</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <button
              onClick={onOpenFindVideoModal}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-base font-medium text-[#e4e4e7] bg-[#121216]/80 hover:bg-[#1c1c22] border border-[#27272a] hover:border-[#F5B726]/50 transition-all backdrop-blur-sm group"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#F5B726] group-hover:bg-[#F5B726]/10 transition-colors">
                <Video className="w-4 h-4 text-[#F5B726]" />
              </div>
              <span>Find your video</span>
            </button>
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

