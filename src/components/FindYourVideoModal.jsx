import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, ArrowRight, Video, Clock, DollarSign } from 'lucide-react';

export default function FindYourVideoModal({ isOpen, onClose, onSelectPlanAndPrefill }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    type: 'Brand Anthem / Story',
    aesthetic: 'Warm & Cinematic',
    platform: 'Digital & Website',
    timeline: '3 - 4 Weeks'
  });

  const storyTypes = [
    { id: 'Brand Anthem / Story Video', label: 'Brand Video', desc: 'Define your company purpose and emotional identity', icon: Video },
    { id: 'Commercial & TVC Video', label: 'Commercial Video', desc: 'High-impact conversion & product showcase', icon: Video },
    { id: 'Bespoke Wedding Video', label: 'Wedding Video', desc: 'Poetic, candid family celebration video', icon: Sparkles },
    { id: 'Documentary Video', label: 'Documentary Video', desc: 'Deep human story, heritage, or craft profile', icon: Video },
  ];

  const aesthetics = [
    { id: 'Warm & Cinematic', label: 'Warm & Cinematic', desc: 'Golden-hour bokeh, rich natural skin tones, timeless feel' },
    { id: 'Moody & Dramatic', label: 'Moody & Dramatic', desc: 'High contrast, shadow-play, anamorphic lens flares' },
    { id: 'Modern & High-Energy', label: 'Dynamic & Modern', desc: 'Fast rhythmic cuts, sound-driven motion, macro angles' },
    { id: 'Minimalist & Organic', label: 'Understated Artistry', desc: 'Natural soundscapes, unhurried pacing, poetic framing' }
  ];

  const platforms = [
    { id: 'Hero Website & YouTube', label: 'Hero Website & 4K OTT' },
    { id: 'Instagram Reels & Social Ads', label: 'Social First (9:16 & 1:1)' },
    { id: 'Video Screenings & Private Cinema', label: 'Cinema & Screenings' },
    { id: 'Omnichannel Campaign', label: 'Omnichannel (All Formats)' }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Summary result
    }
  };

  const handleFinish = () => {
    onSelectPlanAndPrefill({
      projectType: selections.type,
      aesthetic: selections.aesthetic,
      platform: selections.platform,
      recommendedPackage: selections.type.includes('Wedding') || selections.type.includes('Brand') ? 'signature' : 'essential'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#111116] border border-[#23232c] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5B726]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#23232c]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5B726]/10 border border-[#F5B726]/30 flex items-center justify-center text-[#F5B726]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-white">Find Your Ideal Video Scope</h3>
              <p className="text-xs text-[#a1a1aa]">Step {step} of 3 · 60-second interactive scope builder</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#a1a1aa] hover:text-white hover:bg-[#1f1f26] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#1c1c24] h-1.5 my-6 rounded-full overflow-hidden">
          <div
            className="bg-[#F5B726] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step 1: Type */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">What type of visual story are you creating?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {storyTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = selections.type === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelections({ ...selections, type: item.id })}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-[#F5B726] bg-[#F5B726]/10 text-white shadow-sm'
                        : 'border-[#23232c] bg-[#14141a] hover:border-[#383845] text-[#d4d4d8]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#F5B726]' : 'text-[#a1a1aa]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#F5B726]" />}
                    </div>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Aesthetic */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Select the emotional mood & aesthetic:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aesthetics.map((item) => {
                const isSelected = selections.aesthetic === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelections({ ...selections, aesthetic: item.id })}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-[#F5B726] bg-[#F5B726]/10 text-white'
                        : 'border-[#23232c] bg-[#14141a] hover:border-[#383845] text-[#d4d4d8]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm">{item.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#F5B726]" />}
                    </div>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Platform */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-white">Where will your video be showcased?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {platforms.map((item) => {
                const isSelected = selections.platform === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelections({ ...selections, platform: item.id })}
                    className={`text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-[#F5B726] bg-[#F5B726]/10 text-white'
                        : 'border-[#23232c] bg-[#14141a] hover:border-[#383845] text-[#d4d4d8]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#F5B726]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Recommendation Results */}
        {step === 4 && (
          <div className="space-y-6 py-2 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-[#171720] border border-[#F5B726]/40">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-black bg-[#F5B726] px-2.5 py-0.5 rounded-full mb-3">
                RECOMMENDED MATCH
              </span>
              <h4 className="text-2xl font-serif font-bold text-white mb-2">
                Cinematic Signature Package
              </h4>
              <p className="text-sm text-[#d4d4d8] leading-relaxed">
                Based on your vision for a <strong className="text-white">{selections.aesthetic}</strong>{' '}
                <strong className="text-[#F5B726]">{selections.type}</strong> for{' '}
                <strong className="text-white">{selections.platform}</strong>, we recommend our hallmark 2-day
                anamorphic shoot with dedicated color grading and sound master.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-5 mt-5 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[#a1a1aa] block text-[10px] uppercase font-semibold">Camera Package</span>
                  <span className="font-bold text-white mt-0.5 block">RED V-Raptor / ARRI</span>
                </div>
                <div>
                  <span className="text-[#a1a1aa] block text-[10px] uppercase font-semibold">Turnaround</span>
                  <span className="font-bold text-[#F5B726] mt-0.5 block">3 - 4 Weeks</span>
                </div>
                <div>
                  <span className="text-[#a1a1aa] block text-[10px] uppercase font-semibold">Deliverables</span>
                  <span className="font-bold text-white mt-0.5 block">Hero 4K + 3x Social</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#23232c]">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-white"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all"
            >
              <span>{step === 3 ? 'View Recommendation' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-base font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all shadow-lg shadow-[#F5B726]/30"
            >
              <span>Apply Scope & Kick Off Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

