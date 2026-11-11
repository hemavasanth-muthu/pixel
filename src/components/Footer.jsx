import React from 'react';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] border-t border-[#1a1a22] text-[#a1a1aa] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Col 1 & 2: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/pixel-logo.png"
                alt="Pixel Video Logo"
                className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(245,183,38,0.4)]"
              />
              <span className="text-2xl font-black text-white tracking-widest font-sans flex items-center gap-1.5">
                PIXEL <span className="cinema-gold-text">PRODUCTION</span>
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] leading-relaxed max-w-sm">
              Your story, told like cinema. Pixel Production crafts commercial videos, brand anthems, and bespoke heirloom wedding films for clients worldwide from Karaikudi.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-[#d4d4d8]">
                Pixel Production Studio · Karaikudi · Worldwide
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="hover:text-[#F5B726] transition-colors">About Pixel</a></li>
              <li><a href="#services" className="hover:text-[#F5B726] transition-colors">Video Services</a></li>
              <li><a href="#work" className="hover:text-[#F5B726] transition-colors">Featured Videos</a></li>
              <li><a href="#process" className="hover:text-[#F5B726] transition-colors">The 5-Step Process</a></li>
              <li><a href="#packages" className="hover:text-[#F5B726] transition-colors">Investment Packages</a></li>
              <li><a href="#contact" className="hover:text-[#F5B726] transition-colors">Production Task Board</a></li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5">
              <li><span className="text-[#71717a]">Brand Video Anthems</span></li>
              <li><span className="text-[#71717a]">Commercial Ad Videos</span></li>
              <li><span className="text-[#71717a]">Bespoke Wedding Videos</span></li>
              <li><span className="text-[#71717a]">Documentary Video Stories</span></li>
              <li><span className="text-[#71717a]">ACES Color Grading Suite</span></li>
              <li><span className="text-[#71717a]">Dolby Atmos Sound Mixing</span></li>
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-4">
              Karaikudi Vault
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5B726] shrink-0 mt-0.5" />
                <span className="text-[#d4d4d8] leading-tight">Sekkalai Road, Karaikudi, Tamil Nadu 630001</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F5B726] shrink-0" />
                <a href={`mailto:${STUDIO_INFO.contact.email}`} className="text-[#d4d4d8] hover:text-[#F5B726]">
                  {STUDIO_INFO.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F5B726] shrink-0" />
                <a href={`tel:${STUDIO_INFO.contact.phone.replace(/\s+/g, '')}`} className="text-[#d4d4d8] hover:text-[#F5B726]">
                  {STUDIO_INFO.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">💬</span>
                <a href={STUDIO_INFO.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                  WhatsApp Direct
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717a]">
          <div>
            © {new Date().getFullYear()} Pixel Production. All rights reserved. Handcrafted for visual storytellers.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Production</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#14141c] hover:bg-[#F5B726] hover:text-black transition-all ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
