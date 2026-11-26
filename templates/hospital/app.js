/**
 * WELLBASE - FRONTEND INTERACTIONS & SCROLL ANIMATIONS
 * Pixel-Perfect Functional Logic for WellBase Clone
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initLiveClock();
  initDropdownMenu();
  initScrollReveals();
  initAnimatedCounters();
  initFeaturesCarousel();
  initDoctorCallMockup();
  initContactModal();
  initSmoothScroll();
  initVideoFallbacks();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. DYNAMIC LIVE CLOCK (NY TIMEZONE)
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('live-clock-text');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    // Format: May 13, 2026 • 13:00 (NY)
    const options = {
      timeZone: 'America/New_York',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    
    // Formatting with NY time
    try {
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(now);
      const month = parts.find(p => p.type === 'month')?.value || 'May';
      const day = parts.find(p => p.type === 'day')?.value || '13';
      const year = parts.find(p => p.type === 'year')?.value || '2026';
      const hour = parts.find(p => p.type === 'hour')?.value || '13';
      const minute = parts.find(p => p.type === 'minute')?.value || '00';
      
      clockEl.textContent = `${month} ${day}, ${year} • ${hour}:${minute} (NY)`;
    } catch (e) {
      clockEl.textContent = 'May 13, 2026 • 13:00 (NY)';
    }
  }

  updateClock();
  setInterval(updateClock, 30000); // update every 30s
}

/* --------------------------------------------------------------------------
   3. FLOATING DROPDOWN NAVIGATION CARD
   -------------------------------------------------------------------------- */
function initDropdownMenu() {
  const toggleBtn = document.getElementById('menu-toggle-btn');
  const navCard = document.getElementById('dropdown-nav-card');
  if (!toggleBtn || !navCard) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navCard.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  function openMenu() {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    navCard.classList.add('open');
  }

  function closeMenu() {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navCard.classList.remove('open');
  }

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navCard.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close on link click
  navCard.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/* --------------------------------------------------------------------------
   4. SCROLL-TRIGGERED REVEAL ANIMATIONS (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-init');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   5. ANIMATED NUMERICAL COUNTERS (Spring / Easing)
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-counter-target'), 10);
        const duration = parseInt(entry.target.getAttribute('data-counter-duration') || '1800', 10);
        animateCounter(entry.target, 0, target, duration);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  counterElements.forEach(el => counterObserver.observe(el));

  function animateCounter(el, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * (end - start) + start);
      el.textContent = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    };
    window.requestAnimationFrame(step);
  }
}

/* --------------------------------------------------------------------------
   6. FEATURES HORIZONTAL CAROUSEL (Section 1)
   -------------------------------------------------------------------------- */
function initFeaturesCarousel() {
  const viewport = document.querySelector('.carousel-viewport');
  const prevBtn = document.getElementById('feat-prev-btn');
  const nextBtn = document.getElementById('feat-next-btn');
  if (!viewport || !prevBtn || !nextBtn) return;

  function getScrollStep() {
    const firstCard = viewport.querySelector('.metric-card');
    return firstCard ? firstCard.offsetWidth + 24 : 360;
  }

  function updateButtons() {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth - 5;
    prevBtn.disabled = viewport.scrollLeft <= 5;
    nextBtn.disabled = viewport.scrollLeft >= maxScroll;
  }

  nextBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    setTimeout(updateButtons, 350);
  });

  prevBtn.addEventListener('click', () => {
    viewport.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    setTimeout(updateButtons, 350);
  });

  viewport.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
}

/* --------------------------------------------------------------------------
   7. VIRTUAL DOCTOR CONSULTATION LIVE CALL MOCKUP
   -------------------------------------------------------------------------- */
function initDoctorCallMockup() {
  // Call timer simulation
  const timerEl = document.getElementById('call-timer-text');
  let seconds = 503; // starts at 08:23
  if (timerEl) {
    setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  // Mic mute toggle
  const micBtn = document.getElementById('call-mic-btn');
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      micBtn.classList.toggle('muted');
      const isMuted = micBtn.classList.contains('muted');
      micBtn.title = isMuted ? 'Unmute Microphone' : 'Mute Microphone';
    });
  }

  // Camera video toggle
  const camBtn = document.getElementById('call-cam-btn');
  const videoEl = document.getElementById('doctor-video-feed');
  if (camBtn && videoEl) {
    camBtn.addEventListener('click', () => {
      camBtn.classList.toggle('muted');
      const isOff = camBtn.classList.contains('muted');
      if (isOff) {
        videoEl.style.opacity = '0.2';
      } else {
        videoEl.style.opacity = '1';
      }
    });
  }

  // End call toggle
  const endCallBtn = document.getElementById('call-end-btn');
  if (endCallBtn) {
    endCallBtn.addEventListener('click', () => {
      alert('Consultation call paused. Reconnecting with Dr. Mitchell in high-definition...');
    });
  }
}

/* --------------------------------------------------------------------------
   8. CONTACT MODAL / DRAWER
   -------------------------------------------------------------------------- */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const openButtons = document.querySelectorAll('[data-open-contact]');
  const closeBtn = document.getElementById('contact-modal-close');
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('contact-success-msg');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form && successBox) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      successBox.style.display = 'block';
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          form.reset();
          form.style.display = 'flex';
          successBox.style.display = 'none';
        }, 400);
      }, 2500);
    });
  }
}

/* --------------------------------------------------------------------------
   9. SMOOTH SCROLLING FOR ANCHORS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. VIDEO FALLBACK HANDLING (Ensure autoplay works smoothly)
   -------------------------------------------------------------------------- */
function initVideoFallbacks() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
    video.play().catch(() => {
      // Autoplay with sound is blocked, but muted autoplay works seamlessly
      video.muted = true;
      video.play();
    });
  });
}
