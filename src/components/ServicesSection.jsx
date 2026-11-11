import React from 'react';
import { SERVICES } from '../data/mockData';
import { Video, Tv, Heart, Camera, Sparkles, Sliders, ArrowUpRight, Clock, Check } from 'lucide-react';

export default function ServicesSection({ onSelectService }) {
  const iconMap = {
    Video,
    Tv,
    Heart,
    Camera,
    Sparkles,
    Sliders
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#0c0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#F5B726]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F5B726] uppercase">
                WHAT WE DO
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
              Cinematic services,{' '}
              <br className="hidden sm:block" />
              <span className="italic cinema-gold-text">crafted with precision.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-base text-[#a1a1aa] max-w-md">
            From single-day commercial shoots to full-scale documentary expeditions, we execute end-to-end production with uncompromising visual standards.
          </p>
        </div>

        {/* Services 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Video;
            return (
              <div
                key={service.id}
                className="group relative p-8 rounded-3xl bg-[#131319] border border-[#23232c] hover:border-[#F5B726]/40 transition-all cinema-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#F5B726] bg-[#F5B726]/10 px-3 py-1 rounded-full border border-[#F5B726]/20">
                      {service.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#1a1a24] border border-[#2a2a38] flex items-center justify-center text-[#F5B726] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-[#F5B726] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables list */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    <span className="text-[11px] uppercase tracking-wider text-[#71717a] font-semibold block mb-2">
                      Key Deliverables
                    </span>
                    {service.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#d4d4d8]">
                        <Check className="w-3.5 h-3.5 text-[#F5B726] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-[#a1a1aa] mb-6">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#F5B726]" />
                      <span>{service.turnaround}</span>
                    </div>
                    <span className="text-[11px] text-[#71717a]">{service.idealFor}</span>
                  </div>

                  <a
                    href="#contact"
                    onClick={() => onSelectService(service.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#1c1c26] hover:bg-[#F5B726] hover:text-black transition-all border border-[#2e2e3e] hover:border-[#F5B726]"
                  >
                    <span>Inquire for this video service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

