/* ========================================
   Premium Portfolio - JavaScript
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
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    html.classList.remove('dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }

  localStorage.setItem('theme', theme);
}

// Initialize theme
applyTheme(getThemePreference());

// Theme toggle click handler
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
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

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
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
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ========================================
   4. Navbar Scroll Effect
   ======================================== */

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

/* ========================================
   5. Reveal on Scroll (Intersection Observer)
   ======================================== */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

/* ========================================
   6. 3D Tilt Effect on Cards
   ======================================== */

const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* ========================================
   7. Active Navigation Link Highlight
   ======================================== */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ========================================
   8. Typed Text Effect (Optional)
   ======================================== */

// Simple typing effect for hero section
const typedText = document.querySelector('.gradient-text');
if (typedText) {
  const words = ['secure AI systems', 'intelligent security tools', 'threat detection systems'];
  let wordIndex = 0;

  // Optional: Enable typing effect by uncommenting below
  /*
  function typeWord() {
    const word = words[wordIndex];
    typedText.textContent = word;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeWord, 3000);
  }
  typeWord();
  */
}

/* ========================================
   9. Smooth Counter Animation
   ======================================== */

const statValues = document.querySelectorAll('.stat-value');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const value = target.textContent;

      // Check if it's a number
      if (/^\d+/.test(value)) {
        const num = parseInt(value);
        animateCounter(target, num);
      }

      counterObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 30;
  const suffix = element.textContent.replace(/[\d]/g, '');

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 30);
}

statValues.forEach(stat => {
  counterObserver.observe(stat);
});

/* ========================================
   10. Magnetic Button Effect
   ======================================== */

const magneticBtns = document.querySelectorAll('.btn-glow');

magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-2px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
  });
});

/* ========================================
   11. Page Load Animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  // Staggered animation for hero elements
  const heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.1}s`;
  });
});

/* ========================================
   12. Parallax Effect on Scroll
   ======================================== */

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;

  // Subtle parallax on background
  const bgGradient = document.querySelector('.bg-gradient');
  if (bgGradient) {
    bgGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

/* ========================================
   13. Hide Scroll Indicator on Scroll
   ======================================== */

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
  if (scrollIndicator) {
    if (window.pageYOffset > 100) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.pointerEvents = 'none';
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.pointerEvents = 'auto';
    }
  }
});

/* ========================================
   14. Keyboard Navigation Support
   ======================================== */

document.addEventListener('keydown', (e) => {
  // ESC to close mobile menu
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});

console.log('Portfolio loaded successfully! 🚀');
