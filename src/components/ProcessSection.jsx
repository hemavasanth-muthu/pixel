import React from 'react';
import { Compass, FileText, Clapperboard, Sliders, Send } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      icon: Compass,
      title: "Discovery & Creative Pitch",
      description: "We deep-dive into your story, target audience, and brand soul. We deliver bespoke moodboards, visual treatments, and narrative themes within 48 hours."
    },
    {
      number: "02",
      icon: FileText,
      title: "Pre-Production & Storyboarding",
      description: "Shot-by-shot storyboards, location scouting across Tamil Nadu and worldwide, equipment package selection, and precision production schedules."
    },
    {
      number: "03",
      icon: Clapperboard,
      title: "Principal Photography",
      description: "On-set production with our tight-knit crew, RED/ARRI digital cinema cameras, anamorphic glass, professional gaffers, and 32-bit float audio capture."
    },
    {
      number: "04",
      icon: Sliders,
      title: "Post-Production & Sound Design",
      description: "Rhythmic offline editing, dialogue cleanup, tactile sound design, original composition scoring, and Hollywood-standard ACES color grading."
    },
    {
      number: "05",
      icon: Send,
      title: "Master 4K Delivery & Distribution",
      description: "Flawless ProRes 4444 archival masters, optimized web encodes, vertical 9:16 social cutdowns, and raw file delivery with dedicated cloud storage."
    }
  ];

  return (
    <section id="process" className="py-24 sm:py-32 bg-[#0c0c10] relative scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#F5B726]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#F5B726] uppercase">
              THE WORKFLOW
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6">
            How we translate ideas into{' '}
            <span className="italic cinema-gold-text">cinematic videos.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">
            Every Pixel Production project follows a structured, transparent production pipeline. You stay informed at every milestone—from initial script beats to the final frame render.
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-6 rounded-3xl bg-[#131319] border border-[#23232c] hover:border-[#F5B726]/40 transition-all cinema-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-serif font-bold text-[#F5B726]">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#1b1b24] border border-[#2e2e3e] flex items-center justify-center text-[#F5B726]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-[#F5B726]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5B726]" />
                  <span>Phase {idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

