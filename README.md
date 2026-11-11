# Pixel Cinema | Creative Visual Studio & Production Task App

A modern, high-performance web application created from the Figma design (**"Your story, told like cinema"** — Coimbatore · Available Worldwide) with an integrated real-time **Production Task Assignment Board** (`#contact`).

---

## 🎬 Features & Architecture

### 1. Pixel-Perfect Hero Section (from Figma)
- **Cinematic Photography Background**: High-resolution 4K RED/ARRI cinema camera operator on set with warm golden bokeh.
- **Brand Monogram Logo**: Extracted vectorized "P" with golden cinema upward swoosh.
- **Headline & Typography**:
  - *"Your story, told like cinema."* (*cinema.* in warm italic golden gradient `#F5B726`)
  - Subtext: *"We craft videos with feeling—for brands, people, and moments that deserve to be remembered."*
  - Location badge: `COIMBATORE · AVAILABLE WORLDWIDE`
- **CTAs & Actions**:
  - Primary: `Explore our work ->`
  - Secondary: `Find your video` (Launches an interactive scope recommendation questionnaire)
- **Studio Credibility Statistics**:
  - `100+` Videos Delivered
  - `5+` Years Creating
  - `1M+` Views Earned
  - `Scroll to discover ↓`

---

### 2. Interactive "Find Your Video" Scope Builder
- 3-step interactive questionnaire helping potential clients specify their story type, mood/aesthetic, and distribution channels.
- Instantly calculates recommended package scope, turnaround time, camera package, and allows one-click kickoff into the inquiry form.

---

### 3. Studio Manifesto & Capabilities (About)
- Story of the Coimbatore cinema vault, optical heritage (Cooke & Atlas anamorphic lenses), tactile audio recording, and ACES DaVinci Resolve color grading.
- In-house cinema gear specifications.

---

### 4. Production Services
- **01. Brand Videos & Anthems**
- **02. Commercial Ad & TVC Videos**
- **03. Bespoke Wedding Videos**
- **04. Documentaries & Cultural Stories**
- **05. Product & Fashion Video Reels**
- **06. Color Grading & Audio Finishing**
- Key deliverables checklist, typical turnaround, and direct service inquiry buttons.

---

### 5. Filterable Work & Video Player
- Filter by: `All`, `Brand Cinema`, `Weddings & Events`, `Commercials`, `Narrative`.
- Interactive video cards with play buttons, duration, client tags, and view metrics.
- **Video Player Modal**: Full cinematic player with playback controls, crew credits (Director, DP), aspect ratio indicator (`2.39:1 Anamorphic`), and instant project matching.

---

### 6. 5-Step Production Workflow
- Structured timeline from Discovery & Pitching to Pre-Production, Principal Photography, Post-Production, and 4K Master Delivery.

---

### 7. Transparent Packages & Pricing
- Currency switcher: **INR (₹)** / **USD ($)**.
- **Essential Story** (Single-day / ₹75,000 / $1,200)
- **Cinematic Signature** (Most Popular / 2-day anamorphic / ₹1,85,000 / $2,800)
- **Bespoke Campaign** (Multi-day expedition / ₹3,90,000+ / $5,500+)

---

### 8. Production Hub & Task Assignment App (`#contact`)
Honors both the Figma `#contact` route and the project prompt *"Create a Task Assignment App"*:
- **Tab A: Start a Project (Client Briefing)**:
  - Form collecting name, email, phone, project type, package tier, target shoot dates, and creative references.
  - Submitting fires celebratory confetti, logs a unique Project ID (e.g. `PX-4821`), and **automatically generates initial tasks assigned to the Creative Director and DP** on the board!
- **Tab B: Production Task Board (Kanban / List Tracker)**:
  - 5 Pipeline Stages: `Pre-Production`, `Video Shoot`, `Post-Production`, `Client Review`, `Completed`.
  - Assign crew members:
    - *Arun Kumar* (Creative Director)
    - *Siddharth Raman* (Director of Photography)
    - *Priya Mohan* (Lead Video Editor)
    - *Karthik Raja* (Senior Colorist)
    - *Ananya Krishnan* (Sound Designer & Composer)
    - *Rajesh V* (Production Coordinator)
  - Features:
    - Assign new tasks with custom checklists, deadlines, and priorities (Urgent, High, Medium, Low).
    - Advance or revert tasks across stages with one click.
    - Interactive sub-milestone checkboxes with live completion progress.
    - Filter by crew member, priority, or search query.
    - Persistent in `localStorage`.

---

## 🚀 Getting Started

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

