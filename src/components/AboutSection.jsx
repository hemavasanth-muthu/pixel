import React, { useState } from 'react';
import { Award, Globe, Radio, Video, X, CheckCircle, Cpu } from 'lucide-react';

export default function AboutSection() {
  const [selectedGear, setSelectedGear] = useState(null);

  const pillars = [
    {
      icon: Video,
      title: "Anamorphic Video Optics",
      description: "We bypass sterile digital sharpness in favor of organic cinema glass—Cooke, Atlas, and vintage sphericals that yield creamy bokeh and subtle anamorphic streak flares."
    },
    {
      icon: Radio,
      title: "Tactile Acoustic Purity",
      description: "Sound is 50% of the video experience. We record high-fidelity foley, rich room harmonics, and custom instrumentation to produce visceral sonic depth."
    },
    {
      icon: Award,
      title: "ACES Master Color Science",
      description: "Our dedicated color grading suite in Karaikudi uses DaVinci Resolve Studio with Flanders Scientific calibrated reference displays for Hollywood-grade video fidelity."
    },
    {
      icon: Globe,
      title: "Karaikudi to the World",
      description: "Rooted in the lush foothills of the Western Ghats, our production crew travels across continents, bringing raw local heart to global audiences."
    }
  ];

  const gearDetails = {
    "RED Digital Cinema 8K": {
      name: "RED Digital Cinema 8K V-Raptor",
      type: "Large Format Cinema Sensor",
      specs: ["8192 x 4320 Resolution", "17+ Stops Dynamic Range", "REDCODE RAW 16-Bit", "120fps @ 8K Full Sensor"],
      whyWeShoot: "Provides peerless latitude for high-contrast outdoor shoots in Karaikudi's hills, retaining subtle cloud highlights and deep shadow detail simultaneously.",
      badge: "A-Camera"
    },
    "Sony FX Cinema Line": {
      name: "Sony FX6 & FX3 Cinema Line",
      type: "Full-Frame Dual ISO Cameras",
      specs: ["Full-Frame 4K 120fps", "Dual Native ISO 800/12800", "Electronic Variable ND Filter", "Fast Hybrid Phase-Detect AF"],
      whyWeShoot: "Our primary agile B-camera and gimbal system. The ultra-clean low-light sensor allows us to shoot candlelit scenes with zero visible digital noise.",
      badge: "Gimbal & Low-Light"
    },
    "Cooke Anamorphic Lenses": {
      name: "Cooke Anamorphic /i Prime Set",
      type: "2x Squeeze Anamorphic Optics",
      specs: ["2x Squeeze Ratio", "Cooke Look™ Organic Warmth", "Oval Bokeh Out-of-Focus", "Special Flare Coating"],
      whyWeShoot: "The legendary Cooke Look gives skin tones a natural, creamy texture without harsh digital clinical sharpness, producing our signature cinematic look.",
      badge: "Optical Flagship"
    },
    "DJI Ronin 2 & Inspire 3 Drone": {
      name: "DJI Inspire 3 Full-Frame 8K Drone",
      type: "Aerial Cinema System",
      specs: ["Full-Frame 8K ProRes RAW", "Waypoints Pro Repeatable Shots", "Omnidirectional Obstacle Sensing", "Centimeter-Level RTK Positioning"],
      whyWeShoot: "Allows seamless cinematic fly-throughs across architectural spaces, Chettinad palace courtyards, and scenic rural landscapes of the Sivaganga district.",
      badge: "Aerial Unit"
    },
    "Aputure Light Storm Array": {
      name: "Aputure Electro Storm & 1200d Array",
      type: "High-Output Cinema Lighting",
      specs: ["1200W Daylight Balanced LED", "CRI 96+, TLCI 98+", "Bowens Mount Optical Modifiers", "Wireless Sidus Link Mesh Control"],
      whyWeShoot: "Simulates soft afternoon sunlight pouring through windows or dramatic moody chiaroscuro night lighting with complete color temperature precision.",
      badge: "Gaffer Package"
    },
    "Sound Devices 833 32-Bit Float": {
      name: "Sound Devices 833 Production Mixer",
      type: "Field Audio Recorder",
      specs: ["6 Ultra-Low Noise Preamps", "32-Bit Float Dynamic Range", "Dante Digital Audio Network", "Internal SSD Recording"],
      whyWeShoot: "Guarantees zero audio clipping from whisper-quiet vows to loud automotive engine roars, capturing pristine organic soundscapes.",
      badge: "Master Audio"
    },
    "DaVinci Resolve Studio": {
      name: "DaVinci Resolve Studio & Advanced Panel",
      type: "Color Grading & Finishing Suite",
      specs: ["ACES 1.3 Color Managed Workflow", "Flanders Scientific 4K HDR Display", "Dolby Vision Mastering", "Custom Color Emulation LUTs"],
      whyWeShoot: "Every video is graded in a dark, neutrally-balanced color suite in Karaikudi, ensuring colors look rich, consistent, and identical across all screens.",
      badge: "Color Finishing"
    },
    "Dolby Atmos 7.1.4 Mix": {
      name: "Dolby Atmos 7.1.4 Spatial Sound Suite",
      type: "Surround Audio Mixing",
      specs: ["7.1.4 Immersive Speaker Array", "Genelec Smart Active Monitors", "Binaural Headphone Rendering", "EBU R128 Broadcast Loudness"],
      whyWeShoot: "Transforms sound from flat stereo into a three-dimensional acoustic atmosphere that wraps completely around the audience.",
      badge: "Immersive Audio"
    }
  };

  const gearSpecs = Object.keys(gearDetails);

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#09090b] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F5B726]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#F5B726]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#F5B726] uppercase">
              OUR MANIFESTO
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6">
            We don’t shoot footage.
            <br />
            We capture{' '}
            <span className="italic cinema-gold-text">unrepeatable moments.</span>
          </h2>
          <p className="text-lg text-[#a1a1aa] leading-relaxed">
            Pixel was founded on a simple premise: commercial videos shouldn’t feel like sterile advertisements,
            and personal heirloom videos shouldn’t look like amateur videography. Every video we capture is treated
            as a piece of cinema—curated with intention, respect for light, and obsessive devotion to narrative truth.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#111116] border border-[#23232c] hover:border-[#F5B726]/40 transition-all cinema-card-hover group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#1a1a24] border border-[#2d2d3a] flex items-center justify-center text-[#F5B726] mb-6 group-hover:bg-[#F5B726] group-hover:text-black transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-serif">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Studio Quote & Gear Badge Marquee */}
        <div className="rounded-3xl bg-gradient-to-r from-[#14141c] via-[#111116] to-[#14141c] border border-[#23232c] p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <p className="text-xl sm:text-2xl font-serif italic text-[#e4e4e7] leading-relaxed mb-6">
              “Every great video gives weight to fleeting seconds. When you watch a Pixel video, you shouldn't just observe what happened—you should feel the exact temperature of the room.”
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5B726] text-black font-bold flex items-center justify-center font-serif text-sm">
                AK
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Arun Kumar</span>
                <span className="text-xs text-[#a1a1aa]">Founder &amp; Creative Director · Pixel Video Studio, Karaikudi</span>
              </div>
            </div>
          </div>

          {/* Gear vault pills */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a1a1aa] block">
                OUR IN-HOUSE PRODUCTION ARSENAL &nbsp;·&nbsp; CLICK TO INSPECT GEAR SPECS
              </span>
              <span className="hidden sm:inline text-[11px] text-[#F5B726]">8 Verified Cinema Units</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {gearSpecs.map((gear, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedGear(gearDetails[gear])}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#d4d4d8] bg-[#1a1a24] hover:bg-[#F5B726] hover:text-black border border-[#2d2d38] hover:border-[#F5B726] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <Cpu className="w-3 h-3 text-[#F5B726] hover:text-black" />
                  <span>{gear}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GEAR VAULT INSPECTOR MODAL */}
      {selectedGear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#111116] border border-[#2b2b38] rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#23232c] mb-6">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black bg-[#F5B726] px-2.5 py-0.5 rounded-full">
                  {selectedGear.badge}
                </span>
                <span className="text-xs text-[#71717a]">{selectedGear.type}</span>
              </div>
              <button
                onClick={() => setSelectedGear(null)}
                className="p-1.5 rounded-full text-[#a1a1aa] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              {selectedGear.name}
            </h3>

            <div className="mb-6 p-4 rounded-2xl bg-[#161620] border border-[#252535]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#a1a1aa] block mb-2">
                Why Pixel Shoots With This
              </span>
              <p className="text-xs text-[#d4d4d8] leading-relaxed">
                {selectedGear.whyWeShoot}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#71717a] block mb-3">
                Technical Specifications &amp; Sensor Architecture
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedGear.specs.map((sp, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1a1a24] text-[#e4e4e7]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#F5B726] shrink-0" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-[#71717a]">
                Available at Karaikudi Studio Vault
              </span>
              <button
                onClick={() => setSelectedGear(null)}
                className="px-5 py-2 rounded-full text-xs font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
