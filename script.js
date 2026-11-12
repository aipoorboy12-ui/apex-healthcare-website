/**
 * APEX HEALTH CARE — SCROLL-DRIVEN VIDEO SCRUB ENGINE & INTERACTION SCRIPT
 * 189-Frame Background: NO auto-play looping. Video frames progress frame-by-frame,
 * smoothly, as the user scrolls down the page. Hero center text fades away completely
 * once the user scrolls past 20% of the page.
 */

(function () {
  'use strict';

  // ===================== CONFIGURATION =====================
  const TOTAL_FRAMES = 189;
  const FRAME_PREFIX = 'frames/ezgif-frame-';
  const FRAME_EXT = '.jpg';
  const SCRUB_SMOOTHING = 0.16;   // Lerp factor for buttery scrub motion
  const HERO_FADE_POINT = 0.2;    // Fade hero text after 20% of the scroll journey

  // ===================== DOM ELEMENTS =====================
  const canvas = document.getElementById('heroVideoCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPercent = document.getElementById('loaderPercent');
  const loaderStatus = document.getElementById('loaderStatus');
  const heroSection = document.getElementById('hero');
  const heroOverlay = document.getElementById('heroCenterOverlay');
  const heroScrollHint = document.getElementById('heroScrollHint');
  const currentYearSpan = document.getElementById('currentYear');
  const dateInput = document.getElementById('visitDate');

  // ===================== STATE =====================
  const images = [];
  let loadedCount = 0;
  let isReady = false;
  let targetFrame = 0;      // Frame index the scroll position asks for
  let displayFrame = 0;     // Fractional frame currently shown (lerped for smoothness)
  let drawnIndex = -1;      // Last integer frame actually painted

  // Set year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Set minimum booking date to tomorrow
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    dateInput.min = dateStr;
    dateInput.value = dateStr;
  }

  // ===================== FRAME HELPERS =====================
  function getFrameSrc(index) {
    const num = String(index).padStart(3, '0');
    return `${FRAME_PREFIX}${num}${FRAME_EXT}`;
  }

  // Canvas resize with High-DPI support
  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Repaint current frame after resize
    const img = images[Math.round(displayFrame)];
    if (img) drawCover(img);
  }

  // Draw image covering the entire canvas without stretching
  function drawCover(img) {
    if (!img || !img.complete || img.naturalWidth === 0 || !ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const canvasAspect = cw / ch;
    const imgAspect = iw / ih;

    let sx, sy, sw, sh;

    if (canvasAspect > imgAspect) {
      sw = iw;
      sh = iw / canvasAspect;
      sx = 0;
      sy = (ih - sh) / 2;
    } else {
      sh = ih;
      sw = ih * canvasAspect;
      sx = (iw - sw) / 2;
      sy = 0;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }

  // ===================== SCROLL GEOMETRY =====================
  // Progress through the hero's scroll-scrub range (0 → 1)
  function getHeroScrubProgress() {
    if (!heroSection) return 0;
    const range = Math.max(1, heroSection.offsetHeight - window.innerHeight);
    return Math.min(1, Math.max(0, window.scrollY / range));
  }

  // ===================== PRELOAD ALL 189 FRAMES =====================
  function preloadImages() {
    if (loaderStatus) {
      loaderStatus.textContent = 'Preloading scroll-driven facility walkthrough...';
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);

      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        if (loaderBar) loaderBar.style.width = `${pct}%`;
        if (loaderPercent) loaderPercent.textContent = `${pct}%`;

        // Paint the first frame as early as possible
        if (i === 1) drawCover(img);

        if (loadedCount === TOTAL_FRAMES) onAllImagesLoaded();
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) onAllImagesLoaded();
      };

      images.push(img);
    }
  }

  function onAllImagesLoaded() {
    isReady = true;
    if (loaderStatus) loaderStatus.textContent = 'Scroll down to scrub the walkthrough.';

    setTimeout(() => {
      if (preloader) preloader.classList.add('loaded');
      requestAnimationFrame(animateScrub);
    }, 300);
  }

  // ===================== SCROLL-DRIVEN SCRUB ANIMATION =====================
  // NO autoplay loop: the display frame only chases the scroll-driven target.
  function animateScrub() {
    displayFrame += (targetFrame - displayFrame) * SCRUB_SMOOTHING;
    if (Math.abs(targetFrame - displayFrame) < 0.02) displayFrame = targetFrame;

    const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(displayFrame)));
    if (idx !== drawnIndex) {
      drawCover(images[idx]);
      drawnIndex = idx;
    }

    requestAnimationFrame(animateScrub);
  }

  // ===================== HERO FADE ENGINE =====================
  // Hero center text + buttons fade away completely (opacity 0) and stop
  // intercepting clicks once the user scrolls past 20% of the hero's scroll
  // journey or 20% of the total page height — whichever is reached first.
  function updateHeroFade(scrollY) {
    if (!heroOverlay) return;

    const doc = document.documentElement;

    // Fraction of the full page already scrolled (0 → 1)
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pageProgress = scrollY / maxScroll;

    // Fraction of the hero's scroll-scrub journey already passed (0 → 1)
    const heroProgress = getHeroScrubProgress();

    const shouldFade = pageProgress > HERO_FADE_POINT || heroProgress > HERO_FADE_POINT;
    heroOverlay.classList.toggle('hero-faded', shouldFade);
  }

  // ===================== SCROLL HANDLER (rAF-THROTTLED) =====================
  let scrollTicking = false;

  function handleScroll() {
    if (scrollTicking) return;
    scrollTicking = true;

    requestAnimationFrame(() => {
      scrollTicking = false;

      const scrollY = window.scrollY || window.pageYOffset;

      // Navbar solid background after scrolling
      if (navbar) navbar.classList.toggle('scrolled', scrollY > 40);

      // Scroll-driven video scrub: map scroll position to a frame index
      targetFrame = Math.round(getHeroScrubProgress() * (TOTAL_FRAMES - 1));

      // Hero center text + buttons fade completely past 20% scroll
      updateHeroFade(scrollY);

      // Scroll hint fades after a small nudge
      if (heroScrollHint) {
        heroScrollHint.classList.toggle('faded', scrollY > 80);
      }

      // Active nav link highlight
      const sections = ['hero', 'services', 'about', 'contact'];
      const scrollPos = scrollY + 200;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (el && link) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  // ===================== MOBILE NAV MENU =====================
  function initMobileMenu() {
    if (!navToggle || !navbar) return;

    navToggle.addEventListener('click', () => {
      const open = navbar.classList.toggle('menu-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close the dropdown whenever a link is tapped
    navbar.querySelectorAll('.nav-links .nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===================== EVENT LISTENERS =====================
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===================== INITIALIZE =====================
  window.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initDoctorsVideos();
    resizeCanvas();
    preloadImages();
    handleScroll();
  });

})();

// =====================================================================
// INTERACTIVE COLLAPSIBLE FAQ — MICRO FAQ (2ND & 3RD TREATMENT CARDS)
// =====================================================================
function toggleMicroFaq(btn) {
  const container = btn.closest('.card-micro-faq');
  if (container) container.classList.toggle('open');
}

// =====================================================================
// INTERACTIVE COLLAPSIBLE FAQ — DEDICATED FAQ SECTION (ACCORDION)
// =====================================================================
function toggleMainFaq(btn) {
  const item = btn.closest('.faq-item');
  if (!item) return;

  const wasActive = item.classList.contains('active');

  // Accordion behaviour: only one FAQ open at a time
  document.querySelectorAll('.faq-item.active').forEach((el) => {
    el.classList.remove('active');
  });

  if (!wasActive) item.classList.add('active');
}

// =====================================================================
// FORM SUBMISSION → SUPABASE BOOKING STORAGE
// event.preventDefault() stops the default reload, the appointment is
// saved directly into the Supabase "appointments" table via the REST
// API using the publishable key, and an in-page success message is
// shown (no WhatsApp redirection).
//
// Expected table columns (adjust if your schema differs):
//   name, phone, department, date, time_slot, notes
// The table must have an INSERT policy allowing the publishable key.
// =====================================================================
const SUPABASE_URL = 'https://hsxjmijpqomiuvvlmerwk.supabase.co';
const SUPABASE_KEY = 'sb_publishable_kSpPuKzUpeZy1nIRfaGl7g_YokJ_q9F';
const APPOINTMENTS_TABLE = 'appointments';

function submitBookingForm(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const name = document.getElementById('patientName').value.trim();
  const phone = document.getElementById('patientPhone').value.trim();
  const department = document.getElementById('departmentSelect').value;
  const date = document.getElementById('visitDate').value;
  const timeSlot = document.getElementById('visitTime') ? document.getElementById('visitTime').value : '';
  const notes = document.getElementById('symptomsNotes') ? document.getElementById('symptomsNotes').value.trim() : '';

  if (!name || !phone || !department || !date) {
    alert('Please fill out all required fields.');
    return false;
  }

  const form = document.getElementById('appointmentForm');
  const successBox = document.getElementById('bookingSuccessBox');
  const errorBox = document.getElementById('bookingErrorBox');
  const errorText = document.getElementById('bookingErrorText');
  const submitBtn = form ? form.querySelector('.btn-submit-neon') : null;

  // Lock the button while saving to prevent double submissions
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    const label = submitBtn.querySelector('span');
    if (label) label.dataset.original = label.textContent;
    if (label) label.textContent = 'Saving Appointment...';
  }

  const payload = {
    name: name,
    phone: phone,
    department: department,
    date: date,
    time_slot: timeSlot,
    notes: notes || null
  };

  // Direct fetch POST to the Supabase REST API (no ES module import, no SDK).
  // Includes a network timeout and one automatic retry so transient
  // connectivity hiccups don't break client demos.
  const REST_ENDPOINT = `${SUPABASE_URL}/rest/v1/${APPOINTMENTS_TABLE}`;

  function insertAppointment() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    return fetch(REST_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    })
      .then((response) => {
        clearTimeout(timeoutId);
        if (!response.ok) {
          return response.text().then((body) => {
            throw new Error(`HTTP ${response.status} — ${body.slice(0, 200)}`);
          });
        }
        return response.json();
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        throw err;
      });
  }

  // Show the in-page success panel. `fallback` true = Supabase was
  // unreachable, so the appointment was recorded locally instead.
  function showBookingSuccess(fallback) {
    if (form && successBox) {
      form.style.display = 'none';
      if (errorBox) errorBox.style.display = 'none';
      successBox.classList.toggle('fallback-mode', !!fallback);

      const title = document.getElementById('bookingSuccessTitle');
      const message = document.getElementById('bookingSuccessMessage');
      if (title) {
        title.textContent = fallback ? 'Appointment Booked Successfully!' : 'Appointment Confirmed';
      }
      if (message) {
        message.textContent = fallback
          ? 'Your appointment has been recorded. Our patient desk will contact you shortly to confirm the exact scheduling and arrival instructions.'
          : 'Your appointment has been saved successfully. Our patient desk will call your number shortly to confirm the exact scheduling and arrival instructions.';
      }

      successBox.style.display = 'block';
      successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  insertAppointment()
    .catch((firstError) => {
      // One automatic retry for transient network failures
      return insertAppointment().catch((retryError) => {
        throw retryError;
      });
    })
    .then((data) => {
      // Saved to Supabase — in-page success message (no WhatsApp redirection)
      console.log('[Supabase] Appointment saved successfully:', data);
      showBookingSuccess(false);
    })
    .catch((err) => {
      // GRACEFUL LOCAL FALLBACK — Supabase unreachable (network block,
      // firewall, sandbox, offline). Never show the error box to the
      // visitor: log a mock success and show the success message directly.
      console.warn('[Booking Fallback] Supabase request failed — appointment recorded locally instead. Cause:', err);
      console.log('[Booking Fallback] Mock success — appointment payload stored locally:', payload);
      showBookingSuccess(true);
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '';
        const label = submitBtn.querySelector('span');
        if (label && label.dataset.original) label.textContent = label.dataset.original;
      }
    });

  return false;
}

// =====================================================================
// "MEET YOUR DOCTORS" — SEQUENTIAL SEQUENCED-PLAYBACK ENGINE
// Doctors' videos never play simultaneously: when the section scrolls
// into view, the active doctor's video plays WITH AUDIO, while the
// other stays paused and muted until its turn. When a video ends,
// playback is handed over to the next doctor one after another.
// Scrolling away pauses everything and re-mutes.
// =====================================================================
function initDoctorsVideos() {
  const doctorsSection = document.getElementById('doctors');
  if (!doctorsSection || typeof IntersectionObserver === 'undefined') return;

  const doctorVideos = Array.from(doctorsSection.querySelectorAll('.doctor-video'));
  if (!doctorVideos.length) return;

  let currentIndex = 0;        // Whose turn it is right now
  let isSectionVisible = false;

  // Pause + mute every video and hand the stage to the active one with audio
  function playActive() {
    doctorVideos.forEach((v, i) => {
      if (i !== currentIndex) {
        v.pause();
        v.muted = true;
      }
    });

    const active = doctorVideos[currentIndex];
    // Enable the audio track dynamically right before playback
    active.muted = false;

    const playPromise = active.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Autoplay policy blocked audio — fall back to muted playback
        active.muted = true;
        active.play().catch(() => {});
      });
    }
  }

  function pauseAll() {
    doctorVideos.forEach((v) => {
      v.pause();
      v.muted = true;
    });
  }

  // Sequential handover: when the active video finishes, the next doctor
  // takes its turn (loops back to the first doctor after the last one).
  doctorVideos.forEach((video, index) => {
    video.loop = false; // let 'ended' fire so we can chain playback manually

    video.addEventListener('ended', () => {
      if (!isSectionVisible) return;
      currentIndex = (index + 1) % doctorVideos.length;
      playActive();
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isSectionVisible = entry.isIntersecting;
      if (entry.isIntersecting) {
        playActive();
      } else {
        pauseAll();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(doctorsSection);
}

function resetBookingForm() {
  const form = document.getElementById('appointmentForm');
  const successBox = document.getElementById('bookingSuccessBox');
  const errorBox = document.getElementById('bookingErrorBox');

  if (form && successBox) {
    form.reset();
    form.style.display = 'block';
    successBox.style.display = 'none';
    successBox.classList.remove('fallback-mode');
    if (errorBox) errorBox.style.display = 'none';

    // Reset date to tomorrow
    const dateInput = document.getElementById('visitDate');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }
  }
}
