/* ========================================
   Cybersec Portfolio — JavaScript
   Typewriter hero, interactive terminal,
   scroll effects. No dependencies.
   ======================================== */

document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========================================
   ✏️ EDIT: Site data — everything the hero
   terminal and interactive terminal say
   lives here.
   ======================================== */

const SITE = {
  name: 'Karmukilan V',
  handle: 'karmukilan_v',
  role: 'cybersecurity analyst & ai engineer',
  focus: 'VAPT · threat modeling · AI-powered security tooling',
  email: 'kvmukilan@gmail.com',
  github: 'https://github.com/kvmukilan',
  linkedin: 'https://linkedin.com/in/karmukilanv/',
  resume: 'https://drive.google.com/file/d/14yhv1semLOU-DD0yfy_IakYYBN3rKjk5/view?usp=sharing',
  projects: [
    'agentic_security_analyst/  — LangChain agent for scan orchestration & MITRE-mapped triage',
    'ai_pcap_triage/            — ML triage of fuzzing-session PCAPs',
    'graph_rag_assistant/       — Neo4j Graph-RAG mapped to ISO 27001 / NIST CSF',
    'llm_qna_assistant/         — self-hosted LLM Q&A over user files',
  ],
  certs: [
    'CompTIA Security+  [in progress]', // ✏️ EDIT: your real certs
    'eJPT               [planned]',
  ],
  ctf: [
    'TryHackMe   — XX rooms', // ✏️ EDIT: your real stats
    'HackTheBox  — XX boxes',
    'PortSwigger — XX labs',
  ],
};

/* Hero terminal typed sequence: [cssClass, text] */
const HERO_SEQUENCE = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: `${SITE.handle} — ${SITE.role}` },
  { type: 'cmd', text: 'cat focus.txt' },
  { type: 'out', text: SITE.focus },
  { type: 'cmd', text: './status --check' },
  { type: 'ok', text: '[OK] open to full-time roles & internships' },
];

/* ========================================
   1. Hero typewriter
   ======================================== */

const heroBody = document.getElementById('hero-terminal-body');

function heroLine(type) {
  const line = document.createElement('div');
  if (type === 'cmd') {
    const prompt = document.createElement('span');
    prompt.className = 't-prompt';
    prompt.textContent = '$ ';
    line.appendChild(prompt);
    const cmd = document.createElement('span');
    cmd.className = 't-cmd';
    line.appendChild(cmd);
    return { line, target: cmd };
  }
  const out = document.createElement('span');
  out.className = type === 'ok' ? 't-ok' : 't-out';
  line.appendChild(out);
  return { line, target: out };
}

function typeHeroSequence() {
  if (!heroBody) return;

  const cursor = document.createElement('span');
  cursor.className = 't-cursor';

  if (prefersReducedMotion) {
    HERO_SEQUENCE.forEach(step => {
      const { line, target } = heroLine(step.type);
      target.textContent = step.text;
      heroBody.appendChild(line);
    });
    heroBody.appendChild(cursor);
    return;
  }

  let stepIndex = 0;

  function nextStep() {
    if (stepIndex >= HERO_SEQUENCE.length) {
      heroBody.appendChild(cursor);
      return;
    }
    const step = HERO_SEQUENCE[stepIndex++];
    const { line, target } = heroLine(step.type);
    heroBody.appendChild(line);

    if (step.type !== 'cmd') {
      // output lines appear at once, like a real terminal
      target.textContent = step.text;
      setTimeout(nextStep, 260);
      return;
    }

    line.appendChild(cursor);
    let charIndex = 0;
    const timer = setInterval(() => {
      target.textContent = step.text.slice(0, ++charIndex);
      if (charIndex >= step.text.length) {
        clearInterval(timer);
        setTimeout(nextStep, 320);
      }
    }, 45);
  }

  setTimeout(nextStep, 600);
}

typeHeroSequence();

/* ========================================
   2. Mobile menu
   ======================================== */

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  mobileMenu.querySelectorAll('.mobile-link, .mobile-resume').forEach(link => {
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
   3. Smooth scrolling
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
});

/* ========================================
   4. Scroll handler (navbar state)
   ======================================== */

let ticking = false;

function onScroll() {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.pageYOffset > 50);
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
   5. Reveal on scroll
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
   6. Subtle 3D tilt (throttled)
   ======================================== */

if (!prefersReducedMotion) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    let rafId = null;

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });

    card.addEventListener('mousemove', (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const rotateX = (e.clientY - rect.top - rect.height / 2) / 45;
        const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 45;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        rafId = null;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

/* ========================================
   7. Counter animation
   ======================================== */

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const value = el.textContent;
      if (/^\d+/.test(value) && !prefersReducedMotion) {
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
   8. Interactive terminal
   ======================================== */

const overlay = document.getElementById('terminal-overlay');
const termOutput = document.getElementById('terminal-output');
const termInput = document.getElementById('terminal-input');
const termOpenBtn = document.getElementById('terminal-open-btn');
const termCloseBtn = document.getElementById('terminal-close');

const history = [];
let historyIndex = -1;
let greeted = false;

function termPrint(text, cls = 'line-out') {
  const line = document.createElement('div');
  line.className = cls;
  line.textContent = text;
  termOutput.appendChild(line);
  termOutput.scrollTop = termOutput.scrollHeight;
  return line;
}

function termPrintLink(label, url) {
  const line = document.createElement('div');
  line.className = 'line-out';
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = label;
  line.appendChild(a);
  termOutput.appendChild(line);
  termOutput.scrollTop = termOutput.scrollHeight;
}

const FILES = {
  'about.txt': `${SITE.name} — ${SITE.role}\nM.Tech AI & Data Science (Cybersecurity), NFSU.\nFocus: ${SITE.focus}`,
  'focus.txt': SITE.focus,
  'contact.txt': `email:    ${SITE.email}\ngithub:   ${SITE.github}\nlinkedin: ${SITE.linkedin}`,
};

const COMMANDS = {
  help() {
    termPrint('available commands:', 'line-ok');
    termPrint(
      '  whoami      — who is this guy\n' +
      '  projects    — list projects\n' +
      '  certs       — certifications\n' +
      '  ctf         — hands-on practice stats\n' +
      '  resume      — open resume (new tab)\n' +
      '  contact     — how to reach me\n' +
      '  social      — github / linkedin\n' +
      '  ls          — list files\n' +
      '  cat <file>  — print a file\n' +
      '  clear       — clear screen\n' +
      '  exit        — close terminal'
    );
  },
  whoami() {
    termPrint(`${SITE.handle} — ${SITE.role}`);
  },
  projects() {
    SITE.projects.forEach(p => termPrint(p));
    termPrint('run `cat contact.txt` if any of these look useful to your team.', 'line-ok');
  },
  certs() {
    SITE.certs.forEach(c => termPrint(c));
  },
  ctf() {
    SITE.ctf.forEach(c => termPrint(c));
  },
  resume() {
    termPrint('opening resume...', 'line-ok');
    window.open(SITE.resume, '_blank', 'noopener');
  },
  contact() {
    termPrint(FILES['contact.txt']);
  },
  social() {
    termPrintLink(SITE.github, SITE.github);
    termPrintLink(SITE.linkedin, SITE.linkedin);
  },
  ls() {
    termPrint(Object.keys(FILES).join('   '));
  },
  cat(args) {
    const file = args[0];
    if (!file) { termPrint('usage: cat <file>', 'line-err'); return; }
    if (FILES[file]) termPrint(FILES[file]);
    else termPrint(`cat: ${file}: No such file or directory`, 'line-err');
  },
  clear() {
    termOutput.innerHTML = '';
  },
  exit() {
    closeTerminal();
  },
  sudo(args) {
    if (args.join(' ').startsWith('hire-me') || args.join(' ').startsWith('hire me')) {
      termPrint('[sudo] password for visitor: ********', 'line-out');
      termPrint('access granted. drafting offer letter...', 'line-ok');
      termPrint(`just kidding — but the email works: ${SITE.email}`, 'line-out');
    } else {
      termPrint('visitor is not in the sudoers file. this incident will be reported.', 'line-err');
    }
  },
  pwd() {
    termPrint('/home/visitor/muki-portfolio');
  },
  echo(args) {
    termPrint(args.join(' '));
  },
};

function runCommand(raw) {
  const input = raw.trim();
  termPrint(input, 'line-cmd');
  if (!input) return;

  history.push(input);
  historyIndex = history.length;

  const [cmd, ...args] = input.split(/\s+/);
  const handler = COMMANDS[cmd.toLowerCase()];
  if (handler) {
    handler(args);
  } else {
    termPrint(`${cmd}: command not found — try \`help\``, 'line-err');
  }
}

function openTerminal() {
  if (!overlay) return;
  overlay.hidden = false;
  if (!greeted) {
    greeted = true;
    termPrint(`welcome to ${SITE.handle}'s portfolio shell`, 'line-ok');
    termPrint('type `help` to see what you can do.');
  }
  termInput.focus();
}

function closeTerminal() {
  if (overlay) overlay.hidden = true;
}

if (overlay && termInput) {
  termOpenBtn?.addEventListener('click', openTerminal);
  termCloseBtn?.addEventListener('click', closeTerminal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeTerminal();
  });

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runCommand(termInput.value);
      termInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) termInput.value = history[--historyIndex] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        termInput.value = history[++historyIndex] || '';
      } else {
        historyIndex = history.length;
        termInput.value = '';
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    const typingInInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;

    if ((e.key === '~' || e.key === '`') && !typingInInput) {
      e.preventDefault();
      openTerminal();
    }

    if (e.key === 'Escape') {
      if (!overlay.hidden) closeTerminal();
      if (mobileMenu?.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    }
  });
}

/* ========================================
   9. Devtools easter egg
   ======================================== */

console.log(
  '%c>_ hello, fellow inspector',
  'color:#00e5a0; font-family:monospace; font-size:16px; font-weight:bold;'
);
console.log(
  `%cIf you're reading this, you're my kind of person.\n` +
  `mail:   ${SITE.email}\n` +
  `github: ${SITE.github}\n` +
  `tip: press ~ on the page for the terminal.`,
  'color:#8aa39a; font-family:monospace; font-size:12px;'
);
