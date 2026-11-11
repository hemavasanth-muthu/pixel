import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/mockData';
import { Play, Clock, ArrowRight, Eye } from 'lucide-react';
import VideoPlayerModal from './VideoPlayerModal';

export default function WorkSection({ onStartProject }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Brand Videos', 'Wedding Videos', 'Commercial Videos', 'Narrative Videos'];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-24 sm:py-32 bg-[#09090b] relative scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#F5B726]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#F5B726] uppercase">
                FEATURED VIDEOS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight">
              Selected videos &amp;{' '}
              <br className="hidden sm:block" />
              <span className="italic cinema-gold-text">living stories.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-[#a1a1aa] max-w-md">
            Click on any video to watch our 4K color science, original sound scores, and anamorphic camera work in full high definition.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 sm:mb-12 border-b border-white/10 pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === category
                  ? 'bg-[#F5B726] text-black shadow-md shadow-[#F5B726]/20'
                  : 'bg-[#14141a] text-[#a1a1aa] hover:text-white hover:bg-[#1f1f26] border border-[#23232c]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl bg-[#111116] border border-[#23232c] hover:border-[#F5B726]/40 overflow-hidden cinema-card-hover flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.88] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent opacity-80" />

                {/* Aspect ratio badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#d4d4d8] border border-white/10">
                    {project.aspectRatio}
                  </span>
                </div>

                {/* Duration badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#F5B726] border border-white/10">
                    <Clock className="w-3 h-3" /> {project.duration}
                  </span>
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#F5B726] text-black flex items-center justify-center transform scale-90 opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all shadow-[0_0_30px_rgba(245,183,38,0.5)]">
                    <Play className="w-6 h-6 fill-black ml-1" />
                  </div>
                </div>

                {/* Bottom thumbnail tag */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#a1a1aa]">
                  <span className="text-white font-medium">{project.client}</span>
                  <span className="flex items-center gap-1 text-[11px] text-[#F5B726]">
                    <Eye className="w-3.5 h-3.5" /> {project.views}
                  </span>
                </div>
              </div>

              {/* Project Card Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5B726]">
                    {project.category}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-[10px] text-[#71717a]">{project.year}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#F5B726] transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs text-[#a1a1aa] leading-relaxed line-clamp-2">
                  {project.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onKickoffSimilar={(title) => {
          onStartProject?.({ projectType: title });
        }}
      />
    </section>
  );
}
