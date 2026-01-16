/* ========================================
   Premium Portfolio - Optimized JavaScript
   ======================================== */

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');

/* ========================================
   1. Theme Toggle (Dark/Light Mode)
   ======================================== */

function getThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  return 'dark';
}

function applyTheme(theme) {
  const html = document.documentElement;

  if (theme === 'dark') {
    html.classList.add('dark');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  } else {
    html.classList.remove('dark');
    if (themeIcon) {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }

  localStorage.setItem('theme', theme);
}

applyTheme(getThemePreference());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

/* ========================================
   2. Mobile Menu Toggle
   ======================================== */

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });
}

/* ========================================
   3. Smooth Scrolling
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ========================================
   4. Optimized Scroll Handler (Single Listener)
   ======================================== */

let ticking = false;
const scrollIndicator = document.querySelector('.scroll-indicator');

function onScroll() {
  const scrollY = window.pageYOffset;

  // Navbar effect
  if (navbar) {
    navbar.classList.toggle('scrolled', scrollY > 50);
  }

  // Hide scroll indicator
  if (scrollIndicator) {
    scrollIndicator.style.opacity = scrollY > 100 ? '0' : '1';
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

/* ========================================
   5. Reveal on Scroll (Intersection Observer)
   ======================================== */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ========================================
   6. Lightweight 3D Tilt Effect (Throttled)
   ======================================== */

const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  let rafId = null;

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });

  card.addEventListener('mousemove', (e) => {
    if (rafId) return; // Throttle

    rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      rafId = null;
    });
  });

  card.addEventListener('mouseleave', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

/* ========================================
   7. Counter Animation (On Visibility)
   ======================================== */

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const value = el.textContent;
      if (/^\d+/.test(value)) {
        const num = parseInt(value);
        const suffix = value.replace(/[\d]/g, '');
        let current = 0;
        const increment = num / 20;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) {
            el.textContent = num + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, 40);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(stat => counterObserver.observe(stat));

/* ========================================
   8. Keyboard Support
   ======================================== */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});

console.log('Portfolio loaded! 🚀');
