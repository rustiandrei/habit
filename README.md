# Habit Tracker: Planner Routine — Official Website

Modern, Apple-inspired marketing website and interactive web showcase for **Habit Tracker: Planner Routine** (iOS / iPadOS).

## ✨ Website Features

- **Apple Human Interface & SaaS Aesthetics**:
  - Frosted glass navbar (`backdrop-filter: blur(20px)`), ambient gradient glow, Apple-style titanium iPhone 17 Pro mockup with Dynamic Island.
  - Floating contextual glass cards: Live Activity focus sessions, Streak Shield status, Keystone insight alerts.
- **Dynamic Accent Color Picker**:
  - Live in-browser theme switcher supporting 6 color palettes matching in-app themes: Classic Indigo, Solar Coral, Ocean Teal, Mint Green, Plum Violet, and Minimal Slate.
- **Light & Dark Mode**:
  - Seamless toggle with instant CSS variable transitions, matching system settings by default with persistent preference.
- **Interactive App Showcase**:
  - Tabbed screen explorer (`Today`, `Insights`, `Widgets`, `Stats & Heatmaps`, `Focus Timer`, `Mood & Health`).
  - Fluid crossfade transitions displaying authentic App Store screenshots.
- **Live Habit Simulator (Playground)**:
  - Working browser-based mini-app demonstrating Quick Add (`+250 ml`, `+15 min`, `+10 min`, `+5 km`).
  - Real-time SVG circular progress ring calculation and celebratory confetti burst when daily completion reaches 100%.
- **Interactive Focus Timer Demo**:
  - Live working Pomodoro timer with countdown controls (`15m`, `25m`, `45m`).
- **52-Week Year Heatmap Grid**:
  - Generates GitHub-style annual contribution grid with completion intensity.
- **Humane Habit Building Philosophy**:
  - Deep-dive into Streak Shields (earned every 7 days to protect missed days) and Vacation Mode.
- **High-Resolution Gallery & Lightbox**:
  - Filterable by iPhone (6.9"), iPad (13"), and App Store Frames with click-to-zoom modal.
- **Feature Comparison Table**:
  - Side-by-side comparison with conventional habit apps (Privacy, Streaks, Ads, Widgets, HealthKit).
- **Interactive FAQ Accordion**:
  - Smooth expandable answers to frequently asked questions.
- **App Store QR Code Modal**:
  - Mobile-ready SVG QR code for direct scanning and installation on iOS.
- **Dedicated Legal Pages**:
  - `privacy.html`: Comprehensive privacy policy emphasizing 100% on-device SwiftData architecture and zero tracking.
  - `terms.html`: Complete Terms of Service.

---

## 📁 Directory Structure

```
website/
├── index.html              # Main landing page
├── styles.css              # Modular CSS with variables, themes & animations
├── app.js                  # Zero-dependency vanilla ES6 interactions
├── privacy.html            # Dedicated Privacy Policy
├── terms.html              # Dedicated Terms of Service
├── README.md               # Documentation & hosting guide
└── assets/
    ├── icons/              # App icons (Classic, Dark, Tinted, Mint, Solar, Ocean, Plum, Slate)
    ├── screenshots/        # High-res raw iPhone screenshots (1320x2868)
    │   ├── thumb/          # Web-optimized 800px previews for instant loading
    │   ├── ipad/           # iPad 13" screenshots & thumbnails
    │   └── evidence/       # In-app review screenshots & theme proofs
    ├── frames/             # App Store framed marketing slides
    │   └── thumb/          # Web-optimized framed thumbnails
    └── previews/           # Report card previews (Weekly, Sleep, Mood)
```

---

## 🚀 How to Run Locally

Because the website is built with vanilla HTML5, modern CSS3, and ES6 JavaScript with **zero build step or npm dependencies required**, you can open it directly:

### Option 1: Open directly in browser
Double-click `index.html` or run:
```bash
open website/index.html
```

### Option 2: Run with Python HTTP server
```bash
cd website
python3 -m http.server 8080
```
Then visit `http://localhost:8080`.

---

## 🌐 Free 1-Click Deployment

### GitHub Pages
1. Go to repository **Settings > Pages**.
2. Select **Source**: Deploy from branch.
3. Select branch: `main`, folder: `/website` (or copy contents to `docs/`).
4. Click Save. Your website will be live at `https://<username>.github.io/<repo>/`!

### Cloudflare Pages / Vercel / Netlify
- Set build command: *(Leave empty)*
- Set output directory: `website`
