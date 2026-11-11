import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Kanban } from 'lucide-react';

export default function Navbar({ onOpenTaskBoard, onStartProject }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Videos', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Packages', href: '#packages' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-[#23232c]/80 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative h-11 w-auto flex items-center justify-center">
              <img
                src="/pixel-logo.png"
                alt="Pixel Production Logo"
                className="h-10 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(245,183,38,0.5)] group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-widest text-white font-sans group-hover:text-[#F5B726] transition-colors leading-none flex items-center gap-1.5">
                PIXEL <span className="cinema-gold-text">PRODUCTION</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#a1a1aa] font-semibold mt-1">
                Cinematic Studio · Karaikudi
              </span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#d4d4d8] hover:text-[#F5B726] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F5B726] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}

            {/* Quick Task Board Tab trigger */}
            <button
              onClick={onOpenTaskBoard}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#18181b] hover:bg-[#27272a] text-[#F5B726] border border-[#F5B726]/30 transition-all hover:border-[#F5B726]"
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Production Board</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </button>
          </nav>

          {/* Right Action Button & Direct Call */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919342336009"
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#e4e4e7] bg-[#14141c] hover:bg-[#1f1f2a] border border-[#272736] hover:border-[#F5B726]/40 transition-all"
              title="Call Pixel Production"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>93423 36009</span>
            </a>

            <a
              href="#contact"
              onClick={onStartProject}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-[0_0_20px_rgba(245,183,38,0.4)] active:translate-y-0"
            >
              <span>Book Production</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenTaskBoard}
              className="p-2 rounded-lg bg-[#18181b] text-[#F5B726] border border-[#27272a]"
              aria-label="Tasks"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#F5B726]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-4 bg-[#111116] border border-[#23232c] rounded-2xl space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#e4e4e7] hover:text-[#F5B726] font-medium text-base border-b border-[#1e1e24]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTaskBoard();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-[#F5B726] bg-[#18181b] border border-[#F5B726]/30"
              >
                <Kanban className="w-4 h-4" />
                <span>Production Task Board</span>
              </button>
              <a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartProject?.();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-black bg-[#F5B726]"
              >
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
