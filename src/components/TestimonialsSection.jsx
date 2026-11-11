import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { Star, ChevronDown, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const testimonials = [
    {
      quote: "Pixel didn't just deliver a brand video—they transformed how investors and customers perceive our company. The anamorphic lens texture and sound design felt like an IMAX documentary.",
      author: "Kavitha Sundaram",
      role: "Founder & CEO, Terra Botanicals",
      location: "Bengaluru / Karaikudi",
      stars: 5
    },
    {
      quote: "We brought Arun and his cinematography crew from Karaikudi to shoot our three-day wedding in Malabar. Watching the final wedding video brought tears to our entire family. Pure visual poetry.",
      author: "Aarav & Meera",
      role: "Newlyweds",
      location: "Kochi, Kerala",
      stars: 5
    },
    {
      quote: "Their track-side precision video shoot was extraordinary. They understood high-speed shutter pacing, drone chasing, and master color grading from day one.",
      author: "Devendra Rathore",
      role: "Head of Marketing, Zenith Automotive",
      location: "Mumbai",
      stars: 5
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0c0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#F5B726]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#F5B726] uppercase">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
            Trusted by creators,{' '}
            <br className="hidden sm:block" />
            <span className="italic cinema-gold-text">founders &amp; families.</span>
          </h2>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20 sm:mb-24">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#131319] border border-[#23232c] relative flex flex-col justify-between cinema-card-hover"
            >
              <div>
                <div className="flex items-center gap-1 text-[#F5B726] mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F5B726]" />
                  ))}
                </div>
                <p className="text-sm text-[#d4d4d8] leading-relaxed italic mb-8 font-serif">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-sm block">{t.author}</span>
                  <span className="text-xs text-[#a1a1aa] block">{t.role}</span>
                </div>
                <span className="text-[10px] text-[#71717a]">{t.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto pt-12 border-t border-white/10">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-[#F5B726] uppercase block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-3xl font-serif font-bold text-white">
              Everything you need to know
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#131319] border border-[#23232c] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-serif font-bold text-base text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#F5B726] transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-sm text-[#a1a1aa] leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

