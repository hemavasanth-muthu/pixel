import React, { useState, useEffect } from 'react';
import { Award, Globe, Radio, Video, X, CheckCircle, Cpu } from 'lucide-react';

export default function AboutSection() {
  const [selectedGear, setSelectedGear] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedGear(null);
    };
    if (selectedGear) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGear]);

  const pillars = [
    {
      icon: Video,
      title: "Sony FX30 & Nikon ZR Cinema Rigs",
      description: "We shoot on dedicated cinema bodies—the Sony FX30 Cinema Line and Nikon ZR high-resolution hybrid—paired with the DJI RS 5 for fluid cinematic movement."
    },
    {
      icon: Globe,
      title: "DJI Air 3 Dual-Camera Drone",
      description: "Equipped with the DJI Air 3 dual-camera drone, we capture sweeping 4K aerial vistas, Chettinad architectural grandeur, and dynamic subject tracking from above."
    },
    {
      icon: Radio,
      title: "iPhone 17 Pro & 17 Vertical Video",
      description: "We harness iPhone 17 Pro and 17 ProRes Log capture for rapid, high-impact vertical Reels and social campaigns engineered to stop thumbs on mobile feeds."
    },
    {
      icon: Award,
      title: "Premiere Pro (PR) & CapCut Mastery",
      description: "Every video is mastered through a dual post-production pipeline: Adobe Premiere Pro for full-length cinematic narrative cutting, paired with CapCut for high-velocity viral edits."
    }
  ];

  const gearDetails = {
    "Sony FX30 Cinema Line": {
      name: "Sony FX30 Cinema Line Camera",
      type: "Super 35 4K Cinema Camera",
      specs: [
        "4K Super 35 Exmor R Back-Illuminated Sensor",
        "Dual Base ISO (800 / 2500) for Ultra-Clean Low-Light",
        "S-Cinetone™ Color Profile with 14+ Stops Dynamic Range",
        "4K 120p High Frame Rate for Silky Slow Motion"
      ],
      whyWeShoot: "Akash's primary workhorse for brand anthems, weddings, and commercial TVCs—delivering rich organic skin tones, compact handheld agility, and dependable high dynamic range.",
      badge: "Primary Cinema"
    },
    "Nikon ZR / Z Series": {
      name: "Nikon ZR / Z Series Hybrid System",
      type: "Full-Frame Cinema & High-Resolution Stills",
      specs: [
        "Full-Frame High-Resolution CMOS Sensor",
        "10-Bit N-Log & Internal High-Bitrate Cinema Video",
        "In-Body 5-Axis Sensor-Shift Image Stabilization",
        "Precision Eye-Tracking & Dynamic Subject Autofocus"
      ],
      whyWeShoot: "Unlocks unmatched resolving power and natural color fidelity for hybrid commercial campaigns, editorial portrait stills, and vibrant cinematic b-roll.",
      badge: "Hybrid Cinema & Stills"
    },
    "Drone Air 3 (DJI)": {
      name: "DJI Air 3 Dual Primary Camera Drone",
      type: "Dual-Camera 4K HDR Aerial Cinema Drone",
      specs: [
        "Dual 1/1.3\" CMOS Medium Tele (70mm) & Wide (24mm) Cameras",
        "4K/60fps HDR & 4K/100fps Slow Motion Aerials",
        "10-Bit D-Log M & HLG Profiles for Precise Color Matching",
        "Omnidirectional Obstacle Sensing with 46-Min Flight Time"
      ],
      whyWeShoot: "Flown across heritage architecture, destination wedding venues, and sprawling landscapes, capturing breathtaking establishing flyovers and cinematic parallax tracking.",
      badge: "Aerial Drone Unit"
    },
    "DJI RS 5 Stabilizer": {
      name: "DJI RS 5 Pro 3-Axis Gimbal Stabilizer",
      type: "Motorized 3-Axis Cinema Stabilization System",
      specs: [
        "Next-Generation 3-Axis Motorized Stabilization Architecture",
        "Lightweight Carbon Fiber Arms & Automated Axis Locks",
        "High-Torque Motors Supporting Heavy Cinema Lens Rigs",
        "Ultra-Smooth Low-Angle Underslung & Dolly Moves"
      ],
      whyWeShoot: "Guarantees butter-smooth tracking sequences, walking shots, and dynamic one-shot camera choreography with zero camera shake.",
      badge: "Gimbal Stabilization"
    },
    "iPhone 17 Pro & 17": {
      name: "iPhone 17 Pro & iPhone 17 Cinema Setup",
      type: "4K ProRes Log & High-End Vertical Video",
      specs: [
        "4K ProRes Log Video with Direct External SSD Workflow",
        "Advanced Cinematic Mode & Instant Focus Transitions",
        "Native 9:16 Vertical Master Capture for Social Reels & Shorts",
        "Ultra-Portable Form Factor for Stealth BTS & Candid Stories"
      ],
      whyWeShoot: "Essential for instant behind-the-scenes capture, viral high-converting Instagram Reels, and dynamic vertical commercial content with ProRes color depth.",
      badge: "Vertical & Mobile Cinema"
    },
    "Premiere Pro (PR)": {
      name: "Adobe Premiere Pro (PR) Master Suite",
      type: "Industry-Standard Professional Video Editor",
      specs: [
        "Multi-Camera 4K Timeline Assembly & Narrative Trimming",
        "Lumetri Deep Color Grading & 3D LUT Color Science",
        "Essential Sound Audio Mastering & Dialogue Clarity",
        "Broadcast & Cinema Master File Export Pipelines"
      ],
      whyWeShoot: "The core editorial workstation where Akash shapes the master narrative, synchronizes multi-angle footage, and crafts the emotional rhythm of the video.",
      badge: "Master Post-Production"
    },
    "CapCut Pro": {
      name: "CapCut Pro Dynamic Social Suite",
      type: "High-Velocity Vertical & Viral Video Finishing",
      specs: [
        "Rapid Kinetic Text Typography & Sound FX Design",
        "High-Impact Beat Synchronization & Speed Ramping",
        "Native 9:16 Vertical Video Optimization for Social Media",
        "Fast-Turnaround Viral Teasers, Reels & TikTok Hooks"
      ],
      whyWeShoot: "Powers our fast-delivery social pipeline, turning raw footage into viral-paced, thumb-stopping vertical videos engineered for maximum audience engagement.",
      badge: "Social Velocity"
    }
  };

  const gearSpecs = Object.keys(gearDetails);

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#09090b] relative overflow-hidden scroll-mt-24 sm:scroll-mt-28">
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
            <strong className="text-white font-bold">Pixel Production</strong> was founded on a simple premise: commercial videos shouldn’t feel like sterile advertisements,
            and personal heirloom videos shouldn’t look like amateur videography. Every video crafted by Pixel Production is treated
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
              “Every great video gives weight to fleeting seconds. When you watch a Pixel Production video, you shouldn't just observe what happened—you should feel the exact temperature of the room.”
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5B726] text-black font-bold flex items-center justify-center font-serif text-sm">
                AK
              </div>
              <div>
                <span className="font-bold text-white block text-sm">Akash</span>
                <span className="text-xs text-[#a1a1aa]">Founder &amp; Creative Director · Pixel Production, Karaikudi</span>
              </div>
            </div>
          </div>

          {/* Gear vault pills */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#a1a1aa] block">
                OUR IN-HOUSE PRODUCTION ARSENAL &nbsp;·&nbsp; CLICK TO INSPECT GEAR SPECS
              </span>
              <span className="hidden sm:inline text-[11px] text-[#F5B726] font-semibold">{gearSpecs.length} Verified Production Units</span>
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
        <div
          onClick={() => setSelectedGear(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-[#111116] border border-[#2b2b38] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
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

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
              {selectedGear.name}
            </h3>

            <div className="mb-6 p-4 rounded-2xl bg-[#161620] border border-[#252535]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#a1a1aa] block mb-2">
                Why Pixel Production Shoots With This
              </span>
              <p className="text-xs text-[#d4d4d8] leading-relaxed">
                {selectedGear.whyWeShoot}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#71717a] block mb-3">
                Technical Specifications &amp; Sensor Architecture
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedGear.specs.map((sp, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1a1a24] text-[#e4e4e7]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#F5B726] shrink-0" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-[11px] text-[#71717a]">
                Available at Pixel Production Vault · Karaikudi
              </span>
              <button
                onClick={() => setSelectedGear(null)}
                className="w-full sm:w-auto px-5 py-2 rounded-full text-xs font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all"
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
