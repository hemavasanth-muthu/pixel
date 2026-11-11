import React, { useState, useMemo } from 'react';
import { PACKAGES } from '../data/mockData';
import { Check, ArrowRight, Sparkles, Clock, Calculator, Sliders } from 'lucide-react';

export default function PackagesSection({ onSelectPackage }) {
  const [currency, setCurrency] = useState('INR'); // 'INR' or 'USD'
  const [showCalculator, setShowCalculator] = useState(false);

  // Custom Quote Calculator State
  const [duration, setDuration] = useState('60s'); // '30s', '60s', '3min', '10min'
  const [shootDays, setShootDays] = useState(1);
  const [cameraPackage, setCameraPackage] = useState('red'); // 'sony' | 'red'
  const [addons, setAddons] = useState({
    drone: true,
    customScore: false,
    verticalCuts: true,
    rushDelivery: false,
  });

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate dynamic custom price
  const calculatedEstimate = useMemo(() => {
    let baseInr = 50000;
    if (duration === '30s') baseInr = 45000;
    if (duration === '60s') baseInr = 65000;
    if (duration === '3min') baseInr = 110000;
    if (duration === '10min') baseInr = 180000;

    // Days multiplier
    baseInr += (shootDays - 1) * 35000;

    // Camera tier
    if (cameraPackage === 'red') baseInr += 30000;

    // Addons
    if (addons.drone) baseInr += 20000;
    if (addons.customScore) baseInr += 25000;
    if (addons.verticalCuts) baseInr += 15000;
    if (addons.rushDelivery) baseInr += 30000;

    const inrFormatted = `₹${baseInr.toLocaleString('en-IN')}`;
    const usdVal = Math.round(baseInr / 75);
    const usdFormatted = `$${usdVal.toLocaleString()}`;

    return {
      inr: inrFormatted,
      usd: usdFormatted,
      days: shootDays,
      turnaround: addons.rushDelivery ? '7 Business Days (Rush)' : shootDays > 2 ? '3 - 4 Weeks' : '2 Weeks',
    };
  }, [duration, shootDays, cameraPackage, addons]);

  const handleApplyCustomEstimate = () => {
    const summary = `Custom Video Scope: ${duration} Video, ${shootDays} Shoot Days, ${cameraPackage.toUpperCase()} Camera, Addons: ${Object.keys(addons).filter(k => addons[k]).join(', ')}. Est: ${currency === 'INR' ? calculatedEstimate.inr : calculatedEstimate.usd}`;
    onSelectPackage(summary);
  };

  return (
    <section id="packages" className="py-24 sm:py-32 bg-[#09090b] relative scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#F5B726]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F5B726] uppercase">
                INVESTMENT &amp; PACKAGES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
              Transparent tiers for{' '}
              <br className="hidden sm:block" />
              <span className="italic cinema-gold-text">uncompromised video.</span>
            </h2>
          </div>

          {/* Right Controls: Currency Toggle & Custom Calculator Trigger */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                showCalculator
                  ? 'bg-[#F5B726] text-black border-[#F5B726] shadow-md shadow-[#F5B726]/30'
                  : 'bg-[#14141c] text-[#d4d4d8] border-[#23232c] hover:border-[#F5B726]/50'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{showCalculator ? 'Hide Custom Calculator' : 'Custom Estimate Calculator'}</span>
            </button>

            <div className="flex items-center bg-[#14141a] p-1 rounded-full border border-[#23232c]">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currency === 'INR'
                    ? 'bg-[#F5B726] text-black shadow-sm'
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                INR (₹)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currency === 'USD'
                    ? 'bg-[#F5B726] text-black shadow-sm'
                    : 'text-[#a1a1aa] hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>

        {/* INTERACTIVE CUSTOM ESTIMATE CALCULATOR */}
        {showCalculator && (
          <div className="mb-16 p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#161620] via-[#121217] to-[#161620] border-2 border-[#F5B726]/50 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/10 gap-4 sm:gap-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5B726] flex items-center gap-1.5 mb-2">
                  <Sliders className="w-4 h-4" />
                  Interactive Video Scope Builder
                </span>
                <h3 className="text-xl sm:text-3xl font-serif font-bold text-white">
                  Estimate Your Custom Video Production
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#1c1c28] border border-[#2d2d3e]">
                <span className="text-[10px] sm:text-xs text-[#a1a1aa] uppercase font-bold">Estimated Investment:</span>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#F5B726]">
                  {currency === 'INR' ? calculatedEstimate.inr : calculatedEstimate.usd}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Duration */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-3">
                  1. Target Video Duration
                </label>
                <div className="space-y-2">
                  {[
                    { id: '30s', label: '30s Social / Ad Hook' },
                    { id: '60s', label: '60-90s Hero Story' },
                    { id: '3min', label: '2-3 Min Cinematic Video' },
                    { id: '10min', label: '5-10 Min Documentary' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDuration(d.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                        duration === d.id
                          ? 'border-[#F5B726] bg-[#F5B726]/10 text-white font-bold'
                          : 'border-[#23232c] bg-[#14141a] text-[#a1a1aa] hover:border-[#383848]'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shoot Days */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-3">
                  2. Principal Shooting Days: {shootDays} {shootDays === 1 ? 'Day' : 'Days'}
                </label>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={shootDays}
                  onChange={(e) => setShootDays(parseInt(e.target.value))}
                  className="w-full accent-[#F5B726] bg-[#23232c] h-2 rounded-lg cursor-pointer mb-3"
                />
                <div className="flex justify-between text-[11px] text-[#71717a] font-mono">
                  <span>1 Day (Quick)</span>
                  <span>2 Days (Standard)</span>
                  <span>3+ (Multi-loc)</span>
                </div>
                <div className="mt-4 p-3 rounded-xl bg-[#14141a] border border-[#23232c] text-[11px] text-[#a1a1aa]">
                  Includes camera operator, audio engineer, and gaffer package.
                </div>
              </div>

              {/* Camera Package */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-3">
                  3. Camera &amp; Lens Package
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setCameraPackage('sony')}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      cameraPackage === 'sony'
                        ? 'border-[#F5B726] bg-[#F5B726]/10 text-white font-bold'
                        : 'border-[#23232c] bg-[#14141a] text-[#a1a1aa] hover:border-[#383848]'
                    }`}
                  >
                    <span className="block font-bold">Sony FX Cinema 4K</span>
                    <span className="text-[10px] text-[#71717a]">G-Master primes, high sensitivity</span>
                  </button>
                  <button
                    onClick={() => setCameraPackage('red')}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      cameraPackage === 'red'
                        ? 'border-[#F5B726] bg-[#F5B726]/10 text-white font-bold'
                        : 'border-[#23232c] bg-[#14141a] text-[#a1a1aa] hover:border-[#383848]'
                    }`}
                  >
                    <span className="block font-bold">RED 8K + Cooke Anamorphic</span>
                    <span className="text-[10px] text-[#71717a]">Organic cinema bokeh &amp; 2.39:1 widescreen</span>
                  </button>
                </div>
              </div>

              {/* Addons */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-3">
                  4. Production Add-ons
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'drone', label: '4K Drone Aerials', price: '+₹20k / $300' },
                    { key: 'customScore', label: 'Custom Music Score', price: '+₹25k / $350' },
                    { key: 'verticalCuts', label: '3x Social 9:16 Cuts', price: '+₹15k / $200' },
                    { key: 'rushDelivery', label: '7-Day Rush Delivery', price: '+₹30k / $450' }
                  ].map((ad) => (
                    <button
                      key={ad.key}
                      onClick={() => toggleAddon(ad.key)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                        addons[ad.key]
                          ? 'border-[#F5B726] bg-[#F5B726]/10 text-white font-bold'
                          : 'border-[#23232c] bg-[#14141a] text-[#a1a1aa] hover:border-[#383848]'
                      }`}
                    >
                      <span>{ad.label}</span>
                      <span className="text-[10px] text-[#F5B726]">{ad.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Scope Button */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#a1a1aa]">
                Estimated Turnaround: <strong className="text-white">{calculatedEstimate.turnaround}</strong>
              </span>
              <button
                onClick={handleApplyCustomEstimate}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all shadow-md shadow-[#F5B726]/30"
              >
                <span>Apply Estimate to Project Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const isSignature = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  isSignature
                    ? 'bg-gradient-to-b from-[#181822] to-[#121217] border-2 border-[#F5B726] shadow-[0_0_40px_rgba(245,183,38,0.2)] lg:-translate-y-3'
                    : 'bg-[#121217] border border-[#23232c] hover:border-[#383848]'
                }`}
              >
                {/* Popular badge */}
                {isSignature && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F5B726] text-black shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] min-h-[36px] leading-relaxed mb-6">
                    {pkg.tagline}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-white">
                      {currency === 'INR' ? pkg.price : pkg.internationalPrice}
                    </span>
                    <span className="text-xs text-[#71717a]">/ project</span>
                  </div>

                  {/* Turnaround */}
                  <div className="flex items-center gap-1.5 text-xs text-[#F5B726] font-medium mb-8">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Typical delivery: {pkg.timeline}</span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-[#71717a] font-semibold block mb-3">
                      Included In This Scope
                    </span>
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-[#d4d4d8]">
                        <Check className="w-4 h-4 text-[#F5B726] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    href="#contact"
                    onClick={() => onSelectPackage(pkg.name)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-sm font-bold transition-all ${
                      isSignature
                        ? 'bg-[#F5B726] text-black hover:bg-[#FED40E] shadow-lg shadow-[#F5B726]/30'
                        : 'bg-[#1e1e28] text-white hover:bg-[#F5B726] hover:text-black border border-[#2d2d3c]'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
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
