import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import WorkSection from './components/WorkSection';
import ProcessSection from './components/ProcessSection';
import PackagesSection from './components/PackagesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ProjectAndTaskHub from './components/ProjectAndTaskHub';
import Footer from './components/Footer';

export default function App() {
  const [prefilledData, setPrefilledData] = useState(null);
  const [activeHubTab, setActiveHubTab] = useState('start-project');

  // Handle hash route changes like #contact when clicked
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#contact') {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenTaskBoard = () => {
    setActiveHubTab('task-board');
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProject = (customData = null) => {
    setActiveHubTab('start-project');
    if (customData) {
      setPrefilledData(customData);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (packageName) => {
    setActiveHubTab('start-project');
    setPrefilledData({ packageTier: packageName });
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle) => {
    setActiveHubTab('start-project');
    setPrefilledData({ projectType: serviceTitle });
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#F5B726] selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onOpenTaskBoard={handleOpenTaskBoard}
        onStartProject={() => handleStartProject()}
      />

      {/* Hero Section matching Figma design */}
      <Hero />

      {/* Studio Philosophy & Manifesto */}
      <AboutSection />

      {/* Production Services */}
      <ServicesSection
        onSelectService={handleSelectService}
      />

      {/* Featured Portfolio / Video Showcase with Player Modal */}
      <WorkSection
        onStartProject={handleStartProject}
      />

      {/* 5-Step Production Workflow */}
      <ProcessSection />

      {/* Transparent Packages & Investment */}
      <PackagesSection
        onSelectPackage={handleSelectPackage}
      />

      {/* Testimonials & FAQs */}
      <TestimonialsSection />

      {/* Dual Hub: Start a Project (#contact) & Task Assignment App */}
      <ProjectAndTaskHub
        prefilledData={prefilledData}
        activeTabOverride={activeHubTab}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

