/**
 * Habit Tracker: Planner Routine — Interactive Website JavaScript
 * High-performance, zero-dependency modern JS for UI micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndColor();
  initMobileMenu();
  initAppShowcase();
  initInteractivePlayground();
  initFocusTimerDemo();
  initMiniHeatmap();
  initGalleryFilterAndLightbox();
  initFAQAccordion();
  initQRCodeModal();
  initSmoothScroll();
});

/* ==========================================================================
   1. Theme & Accent Color Controller
   ========================================================================== */
function initThemeAndColor() {
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const colorDots = document.querySelectorAll('.color-dot');

  // Load saved theme or match system
  const savedTheme = localStorage.getItem('ht_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', activeTheme);
  updateThemeIcon(activeTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ht_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    }
  }

  // Load saved accent color
  const savedColor = localStorage.getItem('ht_color') || 'indigo';
  html.setAttribute('data-theme-color', savedColor);
  colorDots.forEach(dot => {
    dot.classList.toggle('active', dot.dataset.color === savedColor);
    dot.setAttribute('aria-pressed', String(dot.dataset.color === savedColor));
    dot.addEventListener('click', () => {
      colorDots.forEach(d => {
        d.classList.remove('active');
        d.setAttribute('aria-pressed', 'false');
      });
      dot.classList.add('active');
      dot.setAttribute('aria-pressed', 'true');
      const color = dot.dataset.color;
      html.setAttribute('data-theme-color', color);
      localStorage.setItem('ht_color', color);
    });
  });
}

/* ==========================================================================
   2. Interactive App Showcase (Tabs Switcher)
   ========================================================================== */
const SHOWCASE_DATA = {
  today: {
    tag: "Daily Rhythm",
    title: "Make today count with calm simplicity",
    desc: "A distraction-free dashboard showing today's active habits, sorted by time of day. Check off routines, tap to add custom amounts, or see your day's overall progress ring at a glance.",
    features: [
      "Custom Quick Add amounts — tap once to log 330 ml water, 2,500 steps, or 15 mins",
      "Time-of-day sections: Morning, Afternoon, Evening, and Anytime",
      "Support for Build habits and Quit habits with smart periodic limits",
      "200+ curated icons across Health, Fitness, Mind, Routine, and Work"
    ],
    img: "assets/screenshots/01-today.png",
    thumb: "assets/screenshots/thumb/01-today.jpg",
    alt: "Habit Tracker Today view showing habits, quick add and progress"
  },
  insights: {
    tag: "Habit Patterns",
    title: "Private, on-device patterns revealed for you",
    desc: "Your logged history turns into actionable, plain-language insights. Everything runs 100% locally on your iPhone using SwiftData — zero servers, zero accounts, and zero cloud tracking.",
    features: [
      "Keystone Habit detection: discover which morning routines unlock your highest daily consistency",
      "Mood correlations: see how mindfulness, outdoor walks, or sleep directly impact how you feel",
      "Best weekday trends: identify your highest-momentum days of the week",
      "Encouraging, non-judgmental tone that celebrates wins without guilt"
    ],
    img: "assets/screenshots/02-insights.png",
    thumb: "assets/screenshots/thumb/02-insights.jpg",
    alt: "Habit Tracker private on-device insights view"
  },
  widgets: {
    tag: "iOS Widgets",
    title: "Habits live directly on your Home Screen",
    desc: "Check your progress and log habits in a fraction of a second with interactive widgets. Zero app launches required.",
    features: [
      "Interactive tap-to-log buttons right on the Home Screen",
      "Small circular progress rings, medium habit lists, and large summary calendars",
      "Circular Lock Screen widget: glance at progress or log with a tap",
      "Smart midnight rollover: automatically rebuilds the schedule with zero stale data"
    ],
    img: "assets/screenshots/03-widget-progress.png",
    thumb: "assets/screenshots/thumb/03-widget-progress.jpg",
    alt: "Habit Tracker interactive widgets on iPhone home screen"
  },
  stats: {
    tag: "Momentum & Streaks",
    title: "Streaks that motivate, with humane forgiveness",
    desc: "Visualise your momentum through comprehensive analytics. Track current streaks, all-time bests, and annual heatmaps with built-in Streak Shields so life never ruins your dedication.",
    features: [
      "Streak Shields: earn 1 shield per 7 days of consistency; auto-freezes missed days",
      "Vacation Mode: intentionally pause habits during travel without penalty",
      "52-week contribution heatmaps: turn consistency into an inspiring visual tapestry",
      "Export, share, and re-import your habit data anytime in open formats"
    ],
    img: "assets/screenshots/04-stats.png",
    thumb: "assets/screenshots/thumb/04-stats.jpg",
    alt: "Habit Tracker stats, streaks and heatmap analytics"
  },
  focus: {
    tag: "Deep Work",
    title: "Protect focus time with Live Activities",
    desc: "A built-in Pomodoro and deep work timer seamlessly linked to your duration habits like Reading, Coding, Writing, or Meditation.",
    features: [
      "Live Activities & Dynamic Island integration for Lock Screen countdowns",
      "Automatically saves completed minutes straight into your habit records",
      "If the linked habit syncs with Apple Health, the minutes are saved there too",
      "Pick any session length from 5 to 120 minutes"
    ],
    img: "assets/screenshots/06-focus.png",
    thumb: "assets/screenshots/thumb/06-focus.jpg",
    alt: "Habit Tracker focus timer with live activity support"
  },
  wellness: {
    tag: "Holistic Wellness",
    title: "Connect mood, sleep, hydration & recovery",
    desc: "Track daily mood alongside habits to see how routines shape your emotional well-being, with 2-way Apple Health synchronization.",
    features: [
      "Daily mood check-ins across 5 intuitive levels with trend charts",
      "Two-way Apple Health sync: mindful minutes, water intake, steps, workouts, sleep, HRV",
      "Idempotent HealthKit writes with non-destructive Undo support",
      "Weekly, monthly, and yearly habit matrices to inspect routine patterns"
    ],
    img: "assets/screenshots/08-mood-report.png",
    thumb: "assets/screenshots/thumb/08-mood-report.jpg",
    alt: "Habit Tracker mood and wellness tracking report"
  }
};

function initAppShowcase() {
  const tabs = document.querySelectorAll('.tab-btn');
  const tagEl = document.getElementById('showcaseTag');
  const titleEl = document.getElementById('showcaseTitle');
  const descEl = document.getElementById('showcaseDesc');
  const listEl = document.getElementById('showcaseList');
  const imgEl = document.getElementById('showcaseImg');

  if (!tabs.length || !imgEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const key = tab.dataset.tab;
      const data = SHOWCASE_DATA[key];
      if (!data) return;

      // Animate crossfade
      imgEl.style.opacity = '0';
      imgEl.style.transform = 'scale(0.97)';

      setTimeout(() => {
        tagEl.textContent = data.tag;
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;

        listEl.innerHTML = data.features.map(f => `
          <li class="showcase-feature-item">
            <span class="feature-check">✓</span>
            <span>${f}</span>
          </li>
        `).join('');

        imgEl.src = data.thumb;
        imgEl.alt = data.alt;
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      }, 150);
    });
  });
}

/* ==========================================================================
   3. Interactive Habit Playground (Live Mini App Simulator)
   ========================================================================== */
function initInteractivePlayground() {
  const habits = [
    { id: 'water', current: 1500, target: 2000, step: 250, unit: 'ml', complete: false },
    { id: 'meditate', current: 0, target: 15, step: 15, unit: 'min', complete: false },
    { id: 'read', current: 10, target: 20, step: 10, unit: 'min', complete: false },
    { id: 'run', current: 0, target: 5, step: 5, unit: 'km', complete: false }
  ];

  const rows = document.querySelectorAll('.habit-interactive-row');
  const progressText = document.getElementById('playgroundPct');
  const progressRing = document.getElementById('playgroundRingFill');
  const rewardBanner = document.getElementById('playgroundRewardBanner');

  if (!rows.length) return;

  function updatePlayground() {
    let completedCount = 0;
    habits.forEach((habit, idx) => {
      const row = rows[idx];
      if (!row) return;

      const progressLabel = row.querySelector('.habit-row-progress');
      const actionBtn = row.querySelector('.quick-add-btn');

      if (habit.current >= habit.target) {
        habit.complete = true;
        completedCount++;
        row.classList.add('completed');
        if (progressLabel) progressLabel.textContent = `Completed (${habit.target.toLocaleString('en-US')} ${habit.unit})`;
        if (actionBtn) {
          actionBtn.innerHTML = `✓ Done`;
          actionBtn.style.background = 'var(--accent-primary)';
          actionBtn.style.color = '#ffffff';
        }
      } else {
        habit.complete = false;
        row.classList.remove('completed');
        if (progressLabel) progressLabel.textContent = `${habit.current.toLocaleString('en-US')} / ${habit.target.toLocaleString('en-US')} ${habit.unit}`;
        if (actionBtn) {
          actionBtn.innerHTML = `+${habit.step} ${habit.unit}`;
          actionBtn.style.background = '';
          actionBtn.style.color = '';
        }
      }
    });

    const totalHabits = habits.length;
    const pct = Math.round((completedCount / totalHabits) * 100);

    if (progressText) progressText.textContent = `${pct}%`;

    // SVG circle circumference for r=25 is 2 * pi * 25 ~= 157
    const circumference = 157;
    const offset = circumference - (circumference * pct) / 100;
    if (progressRing) {
      progressRing.style.strokeDashoffset = offset;
    }

    if (pct === 100) {
      if (rewardBanner) rewardBanner.style.display = 'block';
      triggerConfetti();
    } else {
      if (rewardBanner) rewardBanner.style.display = 'none';
    }
  }

  rows.forEach((row, idx) => {
    const btn = row.querySelector('.quick-add-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const habit = habits[idx];
      if (habit.current >= habit.target) {
        // Toggle reset for interactive replay
        habit.current = 0;
      } else {
        habit.current = Math.min(habit.current + habit.step, habit.target);
      }
      updatePlayground();
    });
  });

  updatePlayground();
}

/* ==========================================================================
   4. Interactive Focus Timer Demo
   ========================================================================== */
function initFocusTimerDemo() {
  const display = document.getElementById('focusTimerDisplay');
  const toggleBtn = document.getElementById('focusToggleBtn');
  const resetBtn = document.getElementById('focusResetBtn');
  const durationBtns = document.querySelectorAll('.focus-duration-btn');

  if (!display || !toggleBtn) return;

  let totalMinutes = 25;
  let remainingSeconds = totalMinutes * 60;
  let interval = null;
  let isRunning = false;

  function renderTime() {
    const m = Math.floor(remainingSeconds / 60);
    const s = remainingSeconds % 60;
    display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    toggleBtn.textContent = 'Pause';
    toggleBtn.classList.add('primary');

    interval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        renderTime();
      } else {
        pauseTimer();
        showToast('🎉 Focus Session Complete!', `${totalMinutes} minutes logged directly to Deep Work.`, '⏱️');
        triggerConfetti();
      }
    }, 1000);
  }

  function pauseTimer() {
    isRunning = false;
    clearInterval(interval);
    interval = null;
    toggleBtn.textContent = 'Start Focus';
  }

  function resetTimer() {
    pauseTimer();
    remainingSeconds = totalMinutes * 60;
    renderTime();
  }

  toggleBtn.addEventListener('click', () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', resetTimer);
  }

  durationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      durationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      totalMinutes = parseInt(btn.dataset.mins, 10) || 25;
      resetTimer();
    });
  });

  renderTime();
}

/* ==========================================================================
   Toast Notification Controller
   ========================================================================== */
let toastTimeout = null;
function showToast(title, message, icon = '🎉') {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;

  const iconEl = toast.querySelector('.toast-icon');
  const titleEl = toast.querySelector('.toast-title');
  const msgEl = toast.querySelector('.toast-msg');

  if (iconEl) iconEl.textContent = icon;
  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;

  toast.classList.add('active');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}

/* ==========================================================================
   Mobile Navigation Drawer Controller
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  function openDrawer() {
    drawer.classList.add('open');
    menuBtn.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  // Close when clicking any nav link inside drawer
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   5. Mini Heatmap Generator (Year in Review)
   ========================================================================== */
function initMiniHeatmap() {
  const heatmapEl = document.getElementById('bentoHeatmap');
  if (!heatmapEl) return;

  // Generate 80 realistic activity cells (16 cols x 5 rows)
  const levels = ['l1', 'l2', 'l3', 'l4'];
  let html = '';
  for (let i = 0; i < 80; i++) {
    // Semi-random deterministic seed for aesthetic distribution
    const rand = Math.sin(i * 999) * 10000;
    const normalized = rand - Math.floor(rand);
    let levelClass = '';
    if (normalized > 0.75) levelClass = 'l4';
    else if (normalized > 0.45) levelClass = 'l3';
    else if (normalized > 0.2) levelClass = 'l2';
    else levelClass = 'l1';

    html += `<div class="heat-cell ${levelClass}" title="Day ${i + 1}: Completed habits logged"></div>`;
  }
  heatmapEl.innerHTML = html;
}

/* ==========================================================================
   6. Gallery Filter & Lightbox
   ========================================================================== */
function initGalleryFilterAndLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const filterBtns = document.querySelectorAll('.gallery-btn');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!galleryItems.length) return;

  // Filter Buttons (iPhone vs iPad vs Framed)
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox Zoom
  let lastFocused = null;

  function openLightbox(item) {
    const fullSrc = item.dataset.full;
    const title = item.querySelector('.gallery-item-title')?.textContent || '';
    const sub = item.querySelector('.gallery-item-sub')?.textContent || '';

    if (lightboxImg) {
      lightboxImg.src = fullSrc;
      lightboxImg.alt = item.querySelector('img')?.alt || title;
    }
    if (lightboxCaption) lightboxCaption.innerHTML = `<strong>${title}</strong> — ${sub}`;
    if (lightboxModal) {
      lastFocused = item;
      openModal(lightboxModal, lightboxClose);
    }
  }

  galleryItems.forEach(item => {
    // Gallery cards are divs, so give them button semantics for keyboard users.
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Zoom: ${item.querySelector('.gallery-item-title')?.textContent || 'screenshot'}`);
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      closeModal(lightboxModal, lastFocused);
    });
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeModal(lightboxModal, lastFocused);
    });
  }
}

/* ==========================================================================
   Modal helpers (shared by lightbox & QR modal)
   ========================================================================== */
function openModal(modal, focusTarget) {
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  focusTarget?.focus();
}

function closeModal(modal, returnFocusTo) {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  returnFocusTo?.focus();
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal-overlay.active').forEach(modal => closeModal(modal));
});

/* ==========================================================================
   7. FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
      questionBtn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/* ==========================================================================
   8. QR Code Modal
   ========================================================================== */
function initQRCodeModal() {
  const qrTriggers = document.querySelectorAll('.qr-modal-trigger');
  const qrModal = document.getElementById('qrModal');
  const qrClose = document.getElementById('qrClose');

  if (!qrModal) return;
  let lastTrigger = null;

  qrTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      lastTrigger = btn;
      openModal(qrModal, qrClose);
    });
  });

  if (qrClose) {
    qrClose.addEventListener('click', () => {
      closeModal(qrModal, lastTrigger);
    });
  }

  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) closeModal(qrModal, lastTrigger);
  });
}

/* ==========================================================================
   9. Smooth Scroll & Header Shadow
   ========================================================================== */
function initSmoothScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   Confetti Burst Helper
   ========================================================================== */
function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#9333ea'];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.8) * 14,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;
      p.alpha -= 0.015;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrame);
      canvas.remove();
    }
  }

  animate();
}
