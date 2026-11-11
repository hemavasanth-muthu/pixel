import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenTaskBoard, onStartProject }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    { label: 'Production Hub', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-[#23232c]/80 py-3 shadow-xl shadow-black/50'
          : 'bg-[#09090b]/75 backdrop-blur-md border-b border-white/10 py-4 sm:py-5 shadow-lg shadow-black/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative h-10 sm:h-11 w-auto flex items-center justify-center shrink-0">
              <img
                src="/pixel-logo.png"
                alt="Pixel Production Logo"
                className="h-9 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(245,183,38,0.4)] group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-black tracking-wider sm:tracking-widest text-white font-sans group-hover:text-[#F5B726] transition-colors leading-none flex items-center gap-1.5">
                PIXEL <span className="cinema-gold-text">PRODUCTION</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#a1a1aa] font-semibold mt-1">
                Cinematic Studio · Karaikudi
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Clean & balanced) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#d4d4d8] hover:text-[#F5B726] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F5B726] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Single Action CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact"
              onClick={onStartProject}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-[0_0_20px_rgba(245,183,38,0.4)] active:translate-y-0"
            >
              <span>Start a project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Single Clean Menu Trigger */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#F5B726] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Clean & focused) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 px-5 bg-[#111116] border border-[#23232c] rounded-2xl space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-[#e4e4e7] hover:text-[#F5B726] font-medium text-base border-b border-[#1e1e24] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartProject?.();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all shadow-md"
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
