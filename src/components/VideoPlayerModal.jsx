import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Award, Calendar, Clock } from 'lucide-react';

export default function VideoPlayerModal({ project, isOpen, onClose, onKickoffSimilar }) {
  if (!isOpen || !project) return null;

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#111116] border border-[#272733] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#14141c] border-b border-[#23232c]">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase font-mono font-bold tracking-widest text-[#F5B726] truncate">
              {project.aspectRatio} &nbsp;·&nbsp; 4K MASTER VIDEO
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-[#a1a1aa] hover:text-white hover:bg-[#23232c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative bg-black flex-1 min-h-[220px] sm:min-h-[460px] flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.thumbnail}
            autoPlay
            playsInline
            controls
            className="w-full h-full max-h-[50vh] sm:max-h-[58vh] object-contain"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>

        {/* Video Meta Info & Crew Breakdown */}
        <div className="p-4 sm:p-8 bg-[#111116] border-t border-[#23232c] overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-[#F5B726] bg-[#F5B726]/10 px-2.5 py-0.5 rounded-full border border-[#F5B726]/20">
                  {project.category}
                </span>
                <span className="text-xs text-[#71717a]">{project.year}</span>
                <span className="text-xs text-[#71717a] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#F5B726]" /> {project.duration}
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <button
                onClick={() => {
                  onClose();
                  onKickoffSimilar(project.title);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all shadow-md shadow-[#F5B726]/20"
              >
                Inquire for similar video
              </button>
            </div>
          </div>

          {/* Credits row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/5 text-xs">
            <div>
              <span className="text-[#71717a] uppercase font-semibold text-[9px] sm:text-[10px] block">Client</span>
              <span className="text-white font-medium mt-0.5 block">{project.client}</span>
            </div>
            <div>
              <span className="text-[#71717a] uppercase font-semibold text-[9px] sm:text-[10px] block">Director</span>
              <span className="text-[#F5B726] font-medium mt-0.5 block">{project.director}</span>
            </div>
            <div>
              <span className="text-[#71717a] uppercase font-semibold text-[9px] sm:text-[10px] block">Cinematographer</span>
              <span className="text-white font-medium mt-0.5 block">{project.cinematographer}</span>
            </div>
            <div>
              <span className="text-[#71717a] uppercase font-semibold text-[9px] sm:text-[10px] block">Organic Views</span>
              <span className="text-[#F5B726] font-medium mt-0.5 block">{project.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
