import React, { useState, useEffect, useMemo } from 'react';
import {
  Kanban,
  Send,
  Plus,
  CheckCircle2,
  Clock,
  User,
  AlertCircle,
  Filter,
  Search,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckSquare,
  Square,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Video,
  Download,
  Users,
  ListTodo,
  Volume2,
  VolumeX,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CREW_MEMBERS, INITIAL_TASKS, PIPELINE_STAGES, STUDIO_INFO } from '../data/mockData';
import { playClapperboardSound, playCameraShutterSound, playMilestoneChime } from '../utils/audioEffects';

export default function ProjectAndTaskHub({ prefilledData, activeTabOverride }) {
  const [activeTab, setActiveTab] = useState(activeTabOverride || 'start-project'); // 'start-project' | 'task-board'
  const [boardViewMode, setBoardViewMode] = useState('kanban'); // 'kanban' | 'crew' | 'timeline'
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Contact Form State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Brand Cinema',
    packageTier: 'Cinematic Signature',
    budget: '₹1.5L - ₹3.5L',
    targetDate: '',
    vision: '',
    references: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState('');

  // Task Board State (with automatic migration from legacy v1 store)
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('pixel_video_tasks_v2') || localStorage.getItem('pixel_cinema_tasks_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((t) => ({
          ...t,
          stage: t.stage === 'Filming' ? 'Video Shoot' : t.stage,
          title: typeof t.title === 'string' ? t.title.replace(/\bFilm\b/g, 'Video').replace(/\bfilm\b/g, 'video') : t.title,
          description: typeof t.description === 'string' ? t.description.replace(/\bFilm\b/g, 'Video').replace(/\bfilm\b/g, 'video') : t.description
        }));
      }
      return INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [crewFilter, setCrewFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // New Task Form Modal State
  const [newTask, setNewTask] = useState({
    title: '',
    project: '',
    stage: 'Pre-Production',
    assignedTo: 'crew-1',
    priority: 'Medium',
    dueDate: '',
    description: '',
    checklistText: ''
  });

  // Save tasks to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pixel_video_tasks_v2', JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving tasks:', e);
    }
  }, [tasks]);

  // Update form if prefilledData changes
  useEffect(() => {
    if (prefilledData) {
      setForm((prev) => ({
        ...prev,
        projectType: prefilledData.projectType || prev.projectType,
        packageTier: prefilledData.recommendedPackage === 'essential' ? 'Essential Story' : 'Cinematic Signature',
        vision: prefilledData.aesthetic ? `Aesthetic: ${prefilledData.aesthetic}. Platform: ${prefilledData.platform || 'Digital'}.` : prev.vision
      }));
      setActiveTab('start-project');
    }
  }, [prefilledData]);

  useEffect(() => {
    if (activeTabOverride) {
      setActiveTab(activeTabOverride);
    }
  }, [activeTabOverride]);

  const uniqueProjects = useMemo(() => {
    const set = new Set(tasks.map((t) => t.project).filter(Boolean));
    return Array.from(set);
  }, [tasks]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const projectId = `PX-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastSubmittedId(projectId);
    setFormSubmitted(true);

    if (soundEnabled) playClapperboardSound();

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F5B726', '#FED40E', '#ffffff', '#FFAE00']
      });
    } catch {}

    // Automatically generate initial production tasks for this new project
    const createdTasks = [
      {
        id: `task-${Date.now()}-1`,
        title: `Kickoff & Creative Treatment: ${form.projectType}`,
        project: `${form.name} (${projectId})`,
        stage: 'Pre-Production',
        assignedTo: 'crew-1', // Creative Director
        priority: 'High',
        dueDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        description: `Draft moodboards and schedule initial creative discovery with ${form.name} (${form.email}). Budget: ${form.budget}.`,
        checklist: [
          { text: 'Send intro email & discovery deck', done: true },
          { text: 'Establish tone & reference video links', done: false },
          { text: 'Set preliminary shoot dates in KARAIKUDI', done: false }
        ]
      },
      {
        id: `task-${Date.now()}-2`,
        title: `Camera Package & Crew Allocation: ${projectId}`,
        project: `${form.name} (${projectId})`,
        stage: 'Pre-Production',
        assignedTo: 'crew-2', // DP
        priority: 'Medium',
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        description: `Lock RED/ARRI gear vault allocation and crew roster for ${form.packageTier}.`,
        checklist: [
          { text: 'Reserve anamorphic prime lens set', done: false },
          { text: 'Assign gaffer & camera assistant', done: false }
        ]
      }
    ];

    setTasks((prev) => [createdTasks[0], createdTasks[1], ...prev]);
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    if (soundEnabled) playCameraShutterSound();

    const checklistItems = newTask.checklistText
      .split('\n')
      .filter((line) => line.trim())
      .map((text) => ({ text: text.trim(), done: false }));

    const taskToAdd = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      project: newTask.project || 'Studio Production',
      stage: newTask.stage,
      assignedTo: newTask.assignedTo,
      priority: newTask.priority,
      dueDate: newTask.dueDate || new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      description: newTask.description,
      checklist: checklistItems.length > 0 ? checklistItems : [{ text: 'Initiate task execution', done: false }]
    };

    setTasks((prev) => [taskToAdd, ...prev]);
    setIsAddTaskModalOpen(false);
    setNewTask({
      title: '',
      project: '',
      stage: 'Pre-Production',
      assignedTo: 'crew-1',
      priority: 'Medium',
      dueDate: '',
      description: '',
      checklistText: ''
    });
  };

  const handleMoveStage = (taskId, direction) => {
    if (soundEnabled) playCameraShutterSound();
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const currentIndex = PIPELINE_STAGES.indexOf(t.stage);
        const nextIndex = currentIndex + direction;
        if (nextIndex < 0 || nextIndex >= PIPELINE_STAGES.length) return t;
        return { ...t, stage: PIPELINE_STAGES[nextIndex] };
      })
    );
  };

  const handleToggleChecklist = (taskId, checkIdx) => {
    if (soundEnabled) playMilestoneChime();
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const updatedList = t.checklist.map((item, idx) =>
          idx === checkIdx ? { ...item, done: !item.done } : item
        );
        return { ...t, checklist: updatedList };
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Export production schedule & call sheet
  const handleExportTasks = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pixel-production-tasks-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesCrew = crewFilter === 'all' || t.assignedTo === crewFilter;
    const matchesProject = projectFilter === 'all' || t.project === projectFilter;
    const matchesSearch =
      searchQuery === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrew && matchesProject && matchesSearch;
  });

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.stage === 'Completed').length;
  const inProgressTasks = totalTasks - completedTasks;
  const urgentTasks = tasks.filter((t) => t.priority === 'Urgent' && t.stage !== 'Completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#09090b] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#F5B726]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-amber-700/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#F5B726]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#F5B726] uppercase">
              PIXEL PRODUCTION &nbsp;·&nbsp; KARAIKUDI STUDIO
            </span>
            <span className="w-8 h-[2px] bg-[#F5B726]" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight mb-4">
            Let's create something{' '}
            <span className="italic cinema-gold-text">unforgettable.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">
            Inquire for your next video production or review live schedules on the Pixel Production operations portal.
          </p>

          {/* Dual Tab Switcher */}
          <div className="mt-8 inline-flex flex-wrap sm:flex-nowrap p-1.5 rounded-2xl sm:rounded-full bg-[#14141c] border border-[#23232c] shadow-xl max-w-full justify-center gap-1.5">
            <button
              onClick={() => setActiveTab('start-project')}
              className={`flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'start-project'
                  ? 'bg-[#F5B726] text-black shadow-md shadow-[#F5B726]/20'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Book a Production</span>
            </button>
            <button
              onClick={() => setActiveTab('task-board')}
              className={`flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'task-board'
                  ? 'bg-[#F5B726] text-black shadow-md shadow-[#F5B726]/20'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span>Studio Operations Board</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#23232c] text-[#F5B726] ml-1">
                {tasks.length}
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: START A PROJECT (Inquiry & Briefing) */}
        {activeTab === 'start-project' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Studio details & Contact information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-[#121217] border border-[#23232c]">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  Pixel Production Studio
                </h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6">
                  Based in Sekkalai Road, Karaikudi. We handle everything from concept development and storyboard animatics to Hollywood-grade color finishing.
                </p>

                <div className="space-y-4 text-sm text-[#d4d4d8]">
                  <div className="flex items-start gap-3">
                    <span className="text-[#F5B726] font-bold text-xs uppercase w-20 shrink-0">Studio</span>
                    <span>{STUDIO_INFO.contact.address}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#F5B726] font-bold text-xs uppercase w-20 shrink-0">Email</span>
                    <a href={`mailto:${STUDIO_INFO.contact.email}`} className="text-white hover:text-[#F5B726] transition-colors">
                      {STUDIO_INFO.contact.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#F5B726] font-bold text-xs uppercase w-20 shrink-0">Phone</span>
                    <a href={`tel:${STUDIO_INFO.contact.phone.replace(/\s+/g, '')}`} className="text-white hover:text-[#F5B726] transition-colors">
                      {STUDIO_INFO.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#F5B726] font-bold text-xs uppercase w-20 shrink-0">WhatsApp</span>
                    <a href={STUDIO_INFO.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                      Direct WhatsApp Chat (+91 93423 36009)
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4 text-xs font-semibold text-[#a1a1aa]">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Booking Q4 2026 &amp; Q1 2027
                  </span>
                  <span>·</span>
                  <span>Avg Response: &lt; 4 Hours</span>
                </div>
              </div>

              {/* Production Pipeline Overview */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#181822] to-[#121218] border border-[#F5B726]/30">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5B726] mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Dedicated Production Pipeline</span>
                </div>
                <p className="text-xs text-[#a1a1aa] leading-relaxed mb-4">
                  Every Pixel Production project is assigned dedicated department heads (Creative Director, DP, Senior Editor &amp; Colorist) with structured milestones.
                </p>
                <button
                  onClick={() => setActiveTab('task-board')}
                  className="text-xs font-bold text-[#F5B726] hover:text-[#FED40E] flex items-center gap-1 group"
                >
                  <span>View Pixel Production Operations Board</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: Kickoff Form */}
            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div className="p-8 sm:p-12 rounded-3xl bg-[#121217] border border-[#F5B726]/40 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#F5B726]/10 border border-[#F5B726] text-[#F5B726] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white">
                    Project Brief Received!
                  </h3>
                  <p className="text-base text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{form.name}</strong>. Your project inquiry has been logged as{' '}
                    <span className="font-mono font-bold text-[#F5B726]">{lastSubmittedId}</span>. Arun Kumar and our cinematography team will review your treatment today.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#191924] border border-[#2b2b3a] max-w-sm mx-auto text-xs text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#71717a]">Project Type:</span>
                      <span className="text-white font-semibold">{form.projectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71717a]">Package Scope:</span>
                      <span className="text-[#F5B726] font-semibold">{form.packageTier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71717a]">Initial Tasks:</span>
                      <span className="text-emerald-400 font-semibold">2 Tasks Assigned to Crew</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setActiveTab('task-board')}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all"
                    >
                      <span>View Live Production Board</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-3.5 rounded-full text-sm font-medium text-[#a1a1aa] hover:text-white bg-[#1a1a24]"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleFormSubmit}
                  className="p-8 sm:p-10 rounded-3xl bg-[#121217] border border-[#23232c] shadow-2xl space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your Name / Organization"
                        className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-[#2b2b38] text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#F5B726] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-[#2b2b38] text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#F5B726] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 93423 36009"
                        className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-[#2b2b38] text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#F5B726] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-2">
                        Project Type
                      </label>
                      <select
                        value={form.projectType}
                        onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-[#2b2b38] text-white text-sm focus:outline-none focus:border-[#F5B726] transition-colors"
                      >
                        <option value="Brand Videos">Brand Anthem / Story Video</option>
                        <option value="Commercial Videos">Commercial Ad / Promo Video</option>
                        <option value="Wedding Videos">Bespoke Wedding Video</option>
                        <option value="Documentary Videos">Documentary / Story Video</option>
                        <option value="Product & Fashion Videos">Product / Fashion Video</option>
                        <option value="Post-Production & Color">Color Grading & Video Finishing</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-2">
                        Preferred Package Scope
                      </label>
                      <select
                        value={form.packageTier}
                        onChange={(e) => setForm({ ...form, packageTier: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-[#2b2b38] text-white text-sm focus:outline-none focus:border-[#F5B726] transition-colors"
                      >
                        <option value="Essential Story Video">Essential Story Video (Single Day / ₹75k+)</option>
                        <option value="Cinematic Signature Video">Cinematic Signature Video (2-Day / Anamorphic / ₹1.85L+)</option>
                        <option value="Bespoke Video Production">Bespoke Video Production (Multi-Day Campaign / ₹3.9L+)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-2">
                        Target Shoot / Delivery Date
                      </label>
                      <input
                        type="date"
                        value={form.targetDate}
                        onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-[#2b2b38] text-white text-sm focus:outline-none focus:border-[#F5B726] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-2">
                      Creative Vision &amp; Narrative Goals
                    </label>
                    <textarea
                      rows={3}
                      value={form.vision}
                      onChange={(e) => setForm({ ...form, vision: e.target.value })}
                      placeholder="Tell us what feeling you want your audience to walk away with. Any location preferences or visual references?"
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-[#2b2b38] text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#F5B726] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#a1a1aa] mb-2">
                      Reference Links (Vimeo, YouTube, Behance)
                    </label>
                    <input
                      type="url"
                      value={form.references}
                      onChange={(e) => setForm({ ...form, references: e.target.value })}
                      placeholder="https://vimeo.com/... or reference links"
                      className="w-full px-4 py-3 rounded-xl bg-[#181820] border border-[#2b2b38] text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-[#F5B726] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-base font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all shadow-lg shadow-[#F5B726]/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Submit Project Brief &amp; Generate Tasks</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTION TASK ASSIGNMENT APP (Figma "Create a Task Assignment App") */}
        {activeTab === 'task-board' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Board Bar: Stats, View Switcher, Search, Filters, Export, and New Task Trigger */}
            <div className="p-6 rounded-3xl bg-[#121217] border border-[#23232c] space-y-6 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Board Quick Metrics */}
                <div className="flex flex-wrap items-center gap-6 text-xs">
                  <div>
                    <span className="text-[#71717a] uppercase font-bold block text-[10px]">Total Tasks</span>
                    <span className="text-xl font-bold font-serif text-white">{totalTasks}</span>
                  </div>
                  <div>
                    <span className="text-[#71717a] uppercase font-bold block text-[10px]">In Production</span>
                    <span className="text-xl font-bold font-serif text-[#F5B726]">{inProgressTasks}</span>
                  </div>
                  <div>
                    <span className="text-[#71717a] uppercase font-bold block text-[10px]">Delivered</span>
                    <span className="text-xl font-bold font-serif text-emerald-400">{completedTasks}</span>
                  </div>
                  <div>
                    <span className="text-[#71717a] uppercase font-bold block text-[10px]">Completion</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-24 bg-[#1f1f28] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#F5B726] h-full rounded-full transition-all duration-300" style={{ width: `${completionRate}%` }} />
                      </div>
                      <span className="font-bold text-white text-[11px]">{completionRate}%</span>
                    </div>
                  </div>
                </div>

                {/* View Switcher: Kanban / Crew Workload / Timeline */}
                <div className="flex flex-wrap items-center gap-1 bg-[#181822] p-1 rounded-2xl sm:rounded-full border border-[#2a2a38]">
                  <button
                    onClick={() => setBoardViewMode('kanban')}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      boardViewMode === 'kanban' ? 'bg-[#F5B726] text-black shadow-sm' : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    <Kanban className="w-3.5 h-3.5" />
                    <span>Board</span>
                  </button>
                  <button
                    onClick={() => setBoardViewMode('crew')}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      boardViewMode === 'crew' ? 'bg-[#F5B726] text-black shadow-sm' : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Crew Roster</span>
                  </button>
                  <button
                    onClick={() => setBoardViewMode('timeline')}
                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      boardViewMode === 'timeline' ? 'bg-[#F5B726] text-black shadow-sm' : 'text-[#a1a1aa] hover:text-white'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule</span>
                  </button>
                </div>
              </div>

              {/* Bottom Control Row: Search, Project Filter, Crew Filter, Sound, Export, Add Task */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {/* Search */}
                  <div className="relative w-full sm:w-auto min-w-[180px]">
                    <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tasks, shots, notes..."
                      className="w-full pl-9 pr-4 py-2 rounded-full bg-[#181822] border border-[#292938] text-xs text-white placeholder-[#52525b] focus:outline-none focus:border-[#F5B726]"
                    />
                  </div>

                  {/* Project Filter */}
                  <div className="flex items-center gap-1.5 bg-[#181822] border border-[#292938] rounded-full px-3 py-1.5 text-xs">
                    <Video className="w-3.5 h-3.5 text-[#F5B726]" />
                    <select
                      value={projectFilter}
                      onChange={(e) => setProjectFilter(e.target.value)}
                      className="bg-transparent text-[#e4e4e7] focus:outline-none text-xs"
                    >
                      <option value="all" className="bg-[#181822]">All Projects</option>
                      {uniqueProjects.map((proj) => (
                        <option key={proj} value={proj} className="bg-[#181822]">{proj}</option>
                      ))}
                    </select>
                  </div>

                  {/* Assignee Filter */}
                  <div className="flex items-center gap-1.5 bg-[#181822] border border-[#292938] rounded-full px-3 py-1.5 text-xs">
                    <User className="w-3.5 h-3.5 text-[#F5B726]" />
                    <select
                      value={crewFilter}
                      onChange={(e) => setCrewFilter(e.target.value)}
                      className="bg-transparent text-[#e4e4e7] focus:outline-none text-xs"
                    >
                      <option value="all" className="bg-[#181822]">All Crew Members</option>
                      {CREW_MEMBERS.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#181822]">
                          {c.name} ({c.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5">
                  {/* Sound FX Toggle */}
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`p-2 rounded-full border text-xs transition-colors ${
                      soundEnabled
                        ? 'border-[#F5B726]/40 text-[#F5B726] bg-[#F5B726]/10'
                        : 'border-[#2a2a38] text-[#71717a] bg-[#181822]'
                    }`}
                    title={soundEnabled ? 'Sound FX Enabled' : 'Sound FX Muted'}
                  >
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  {/* Export Call Sheet */}
                  <button
                    onClick={handleExportTasks}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#e4e4e7] bg-[#181822] hover:bg-[#232330] border border-[#2a2a38] transition-all"
                    title="Export Production Tasks JSON"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F5B726]" />
                    <span className="hidden sm:inline">Export</span>
                  </button>

                  {/* Add Task Button */}
                  <button
                    onClick={() => setIsAddTaskModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all shadow-md shadow-[#F5B726]/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Assign Task</span>
                  </button>
                </div>
              </div>
            </div>

            {/* VIEW 1: KANBAN BOARD */}
            {boardViewMode === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {PIPELINE_STAGES.map((stage, stageIdx) => {
                  const stageTasks = filteredTasks.filter((t) => t.stage === stage);
                  return (
                    <div
                      key={stage}
                      className="rounded-3xl bg-[#111116] border border-[#23232c] p-4 flex flex-col min-h-[340px] lg:min-h-[640px] shadow-lg"
                    >
                      {/* Stage Header */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#F5B726]" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                            {stage}
                          </h4>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#a1a1aa] bg-[#1a1a24] px-2 py-0.5 rounded-full">
                          {stageTasks.length}
                        </span>
                      </div>

                      {/* Task Cards Container */}
                      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                        {stageTasks.length === 0 ? (
                          <div className="h-40 flex flex-col items-center justify-center text-center p-4 border border-dashed border-[#23232c] rounded-2xl text-xs text-[#52525b]">
                            <span>No tasks in {stage}</span>
                          </div>
                        ) : (
                          stageTasks.map((task) => {
                            const crew = CREW_MEMBERS.find((c) => c.id === task.assignedTo) || CREW_MEMBERS[0];
                            const completedItems = task.checklist ? task.checklist.filter((i) => i.done).length : 0;
                            const totalItems = task.checklist ? task.checklist.length : 0;

                            return (
                              <div
                                key={task.id}
                                className="p-4 rounded-2xl bg-[#16161e] border border-[#252533] hover:border-[#F5B726]/50 transition-all shadow-sm space-y-3 group"
                              >
                                {/* Top card row: Project & Priority */}
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="font-semibold text-[#F5B726] bg-[#F5B726]/10 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                                    {task.project}
                                  </span>
                                  <span
                                    className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                                      task.priority === 'Urgent'
                                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                        : task.priority === 'High'
                                        ? 'bg-amber-500/20 text-amber-300'
                                        : 'bg-zinc-800 text-zinc-400'
                                    }`}
                                  >
                                    {task.priority}
                                  </span>
                                </div>

                                {/* Task Title */}
                                <h5 className="text-sm font-bold text-white leading-snug group-hover:text-[#F5B726] transition-colors">
                                  {task.title}
                                </h5>

                                {/* Description */}
                                {task.description && (
                                  <p className="text-xs text-[#a1a1aa] leading-relaxed line-clamp-2">
                                    {task.description}
                                  </p>
                                )}

                                {/* Checklist Items */}
                                {task.checklist && task.checklist.length > 0 && (
                                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                                    <div className="flex items-center justify-between text-[10px] text-[#71717a]">
                                      <span>Milestones</span>
                                      <span>{completedItems}/{totalItems}</span>
                                    </div>
                                    {task.checklist.map((item, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => handleToggleChecklist(task.id, idx)}
                                        className="w-full flex items-start gap-2 text-left text-xs text-[#d4d4d8] hover:text-white transition-colors"
                                      >
                                        {item.done ? (
                                          <CheckSquare className="w-3.5 h-3.5 text-[#F5B726] shrink-0 mt-0.5" />
                                        ) : (
                                          <Square className="w-3.5 h-3.5 text-[#52525b] shrink-0 mt-0.5" />
                                        )}
                                        <span className={item.done ? 'line-through text-[#71717a]' : ''}>
                                          {item.text}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                )}

                                {/* Card Footer: Assignee, Due date & Move Stage Buttons */}
                                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                                  {/* Assigned Crew */}
                                  <div className="flex items-center gap-1.5" title={`${crew.name} (${crew.role})`}>
                                    <div className={`w-6 h-6 rounded-full ${crew.color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>
                                      {crew.avatar}
                                    </div>
                                    <span className="text-[11px] text-[#d4d4d8] truncate max-w-[80px]">
                                      {crew.name.split(' ')[0]}
                                    </span>
                                  </div>

                                  {/* Move Column Buttons */}
                                  <div className="flex items-center gap-1">
                                    {stageIdx > 0 && (
                                      <button
                                        onClick={() => handleMoveStage(task.id, -1)}
                                        className="p-1 rounded bg-[#20202c] hover:bg-[#F5B726] hover:text-black text-[#a1a1aa] transition-colors"
                                        title="Move to previous stage"
                                      >
                                        <ChevronLeft className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    {stageIdx < PIPELINE_STAGES.length - 1 && (
                                      <button
                                        onClick={() => handleMoveStage(task.id, 1)}
                                        className="p-1 rounded bg-[#20202c] hover:bg-[#F5B726] hover:text-black text-[#a1a1aa] transition-colors"
                                        title="Move to next stage"
                                      >
                                        <ChevronRight className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="p-1 rounded hover:bg-rose-500/20 text-[#71717a] hover:text-rose-400 transition-colors ml-1"
                                      title="Delete task"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* VIEW 2: CREW WORKLOAD & ROSTER VIEW */}
            {boardViewMode === 'crew' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
                {CREW_MEMBERS.map((member) => {
                  const memberTasks = tasks.filter((t) => t.assignedTo === member.id);
                  const completed = memberTasks.filter((t) => t.stage === 'Completed').length;
                  const active = memberTasks.length - completed;

                  return (
                    <div
                      key={member.id}
                      className="p-6 rounded-3xl bg-[#111116] border border-[#23232c] hover:border-[#F5B726]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Member Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-2xl ${member.color} text-white font-serif font-bold text-base flex items-center justify-center shadow-md`}>
                              {member.avatar}
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-white font-serif">{member.name}</h4>
                              <span className="text-xs text-[#F5B726]">{member.role}</span>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#1a1a24] text-white">
                            {active} Active
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6 pt-2">
                          <div className="flex justify-between text-[11px] text-[#71717a] mb-1">
                            <span>Workload Delivery</span>
                            <span>{memberTasks.length > 0 ? Math.round((completed / memberTasks.length) * 100) : 0}%</span>
                          </div>
                          <div className="w-full bg-[#1b1b24] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#F5B726] h-full rounded-full"
                              style={{ width: `${memberTasks.length > 0 ? (completed / memberTasks.length) * 100 : 0}%` }}
                            />
                          </div>
                        </div>

                        {/* Assigned Tasks Mini List */}
                        <div className="space-y-2.5">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#71717a] block">
                            Assigned Production Milestones
                          </span>
                          {memberTasks.length === 0 ? (
                            <p className="text-xs text-[#52525b] italic py-2">No active tasks assigned.</p>
                          ) : (
                            memberTasks.slice(0, 4).map((task) => (
                              <div
                                key={task.id}
                                className="p-2.5 rounded-xl bg-[#171720] border border-[#232330] flex items-center justify-between text-xs"
                              >
                                <div className="truncate pr-2">
                                  <span className="font-semibold text-white block truncate">{task.title}</span>
                                  <span className="text-[10px] text-[#a1a1aa]">{task.stage}</span>
                                </div>
                                <span className="text-[10px] font-mono text-[#F5B726] shrink-0">{task.dueDate}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5">
                        <button
                          onClick={() => {
                            setNewTask((prev) => ({ ...prev, assignedTo: member.id }));
                            setIsAddTaskModalOpen(true);
                          }}
                          className="w-full py-2 rounded-xl text-xs font-bold text-white bg-[#1a1a24] hover:bg-[#F5B726] hover:text-black transition-colors border border-[#2d2d3a] hover:border-[#F5B726]"
                        >
                          + Assign Task to {member.name.split(' ')[0]}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* VIEW 3: SCHEDULE / TIMELINE VIEW */}
            {boardViewMode === 'timeline' && (
              <div className="rounded-3xl bg-[#111116] border border-[#23232c] p-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
                  <h4 className="text-base font-serif font-bold text-white">Production Milestones Schedule</h4>
                  <span className="text-xs text-[#a1a1aa]">Sorted by Due Date</span>
                </div>

                <div className="space-y-3">
                  {[...filteredTasks]
                    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                    .map((task) => {
                      const crew = CREW_MEMBERS.find((c) => c.id === task.assignedTo) || CREW_MEMBERS[0];
                      const isPastDue = new Date(task.dueDate) < new Date() && task.stage !== 'Completed';

                      return (
                        <div
                          key={task.id}
                          className="p-4 rounded-2xl bg-[#16161e] border border-[#232330] hover:border-[#F5B726]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start sm:items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#1e1e28] flex flex-col items-center justify-center font-mono shrink-0">
                              <span className="text-[9px] uppercase text-[#71717a]">
                                {new Date(task.dueDate).toLocaleString('default', { month: 'short' })}
                              </span>
                              <span className="text-sm font-bold text-[#F5B726]">
                                {new Date(task.dueDate).getDate() || '15'}
                              </span>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-[#F5B726] bg-[#F5B726]/10 px-2 py-0.5 rounded">
                                  {task.project}
                                </span>
                                <span className="text-[10px] text-[#71717a]">· {task.stage}</span>
                              </div>
                              <h5 className="text-sm font-bold text-white">{task.title}</h5>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-full ${crew.color} text-white text-[10px] font-bold flex items-center justify-center`}>
                                {crew.avatar}
                              </div>
                              <span className="text-[#a1a1aa]">{crew.name}</span>
                            </div>

                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                task.stage === 'Completed'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : isPastDue
                                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                  : 'bg-zinc-800 text-zinc-300'
                              }`}
                            >
                              {task.stage}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MODAL: ADD / ASSIGN NEW TASK */}
        {isAddTaskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-xl bg-[#121217] border border-[#2b2b38] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#23232c] mb-6">
                <div className="flex items-center gap-2.5">
                  <Kanban className="w-5 h-5 text-[#F5B726]" />
                  <h3 className="text-xl font-serif font-bold text-white">Assign Production Task</h3>
                </div>
                <button
                  onClick={() => setIsAddTaskModalOpen(false)}
                  className="p-1.5 rounded-full text-[#a1a1aa] hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#a1a1aa] font-bold uppercase mb-1">Task Title *</label>
                  <input
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="e.g. Anamorphic lens flare alignment & test"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-[#2d2d3c] text-white text-xs focus:outline-none focus:border-[#F5B726]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[#a1a1aa] font-bold uppercase mb-1">Project Name</label>
                    <input
                      type="text"
                      value={newTask.project}
                      onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
                      placeholder="e.g. Commercial Hero Video"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-[#2d2d3c] text-white text-xs focus:outline-none focus:border-[#F5B726]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#a1a1aa] font-bold uppercase mb-1">Pipeline Stage</label>
                    <select
                      value={newTask.stage}
                      onChange={(e) => setNewTask({ ...newTask, stage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-[#2d2d3c] text-white text-xs focus:outline-none focus:border-[#F5B726]"
                    >
                      {PIPELINE_STAGES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[#a1a1aa] font-bold uppercase mb-1">Assign Crew Member</label>
                    <select
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-[#2d2d3c] text-white text-xs focus:outline-none focus:border-[#F5B726]"
                    >
                      {CREW_MEMBERS.map((c) => (
                        <option key={c.id} value={c.id}>{c.name} — {c.role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#a1a1aa] font-bold uppercase mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-[#2d2d3c] text-white text-xs focus:outline-none focus:border-[#F5B726]"
                    >
                      <option value="Urgent">Urgent</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#a1a1aa] font-bold uppercase mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-[#2d2d3c] text-white text-xs focus:outline-none focus:border-[#F5B726]"
                  />
                </div>

                <div>
                  <label className="block text-[#a1a1aa] font-bold uppercase mb-1">Brief / Instructions</label>
                  <textarea
                    rows={2}
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Specific lens, camera setting, lighting, or notes..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-[#2d2d3c] text-white text-xs focus:outline-none focus:border-[#F5B726]"
                  />
                </div>

                <div>
                  <label className="block text-[#a1a1aa] font-bold uppercase mb-1">Milestones / Checklist (One per line)</label>
                  <textarea
                    rows={2}
                    value={newTask.checklistText}
                    onChange={(e) => setNewTask({ ...newTask, checklistText: e.target.value })}
                    placeholder="Calibrate monitor&#10;Sync 96kHz audio stems&#10;Deliver ProRes 4444"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#181822] border border-[#2d2d3c] text-white text-xs focus:outline-none focus:border-[#F5B726]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsAddTaskModalOpen(false)}
                    className="px-4 py-2 text-xs text-[#a1a1aa] hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-black bg-[#F5B726] hover:bg-[#FED40E] transition-all"
                  >
                    Assign Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
