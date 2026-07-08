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
  role: 'VAPT engineer & AI security builder',
  focus: 'mobile · web · API · OT/ICS pentesting — plus the AI tooling that scales it',
  email: 'kvmukilan@gmail.com',
  github: 'https://github.com/kvmukilan',
  linkedin: 'https://linkedin.com/in/karmukilanv/',
  resume: 'https://drive.google.com/file/d/14yhv1semLOU-DD0yfy_IakYYBN3rKjk5/view?usp=sharing',
  projects: [
    'livewire/            — stateful TCP session replay, seq/ack-synced, pure Go',
    'soc_gpt/             — LangGraph SOC triage: Sigma → Elasticsearch → ATT&CK reports',
    'ot_attack_simulator/ — Modbus digital twin + LLM attack generator (ATT&CK for ICS)',
    'ics_cve_scanner/     — NVD + CISA KEV correlation, IEC 62443 remediation playbooks',
    'kabini_rag/          — production RAG at ABB: Milvus + LangGraph, RBAC, 10k+ chunks',
    'ai_pcap_triage/      — ML triage of fuzzing-session PCAPs',
  ],
  certs: [
    'Databricks GenAI Fundamentals            [2025]',
    'Google Cloud Generative AI Learning Path [2025]',
    'LangChain for LLM App Dev (DeepLearning) [2025]',
    'Microsoft Azure AI Engineer (AI-102)     [in progress]',
    'ISA/IEC 62443 Cybersecurity Fundamentals [in progress]',
    'NPTEL Silver Medal — IIoT 4.0            [2022]',
  ],
  ctf: [
    'TryHackMe   — 32 rooms', // ✏️ EDIT: your real stats
    'HackTheBox  — 14 boxes',
    'PortSwigger — 6 labs',
  ],
};

/* Hero terminal typed sequence: [cssClass, text] */
const HERO_SEQUENCE = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: `${SITE.handle} — ${SITE.role}` },
  { type: 'cmd', text: 'cat focus.txt' },
  { type: 'out', text: 'breaking live industrial devices @ ABB CDEC — 10+ assessments' },
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

/* Page sections `cd` can jump to, and repos `open` can launch. */
const SECTIONS = ['about', 'skills', 'experience', 'projects', 'proof', 'contact'];
const REPOS = {
  livewire: 'https://github.com/kvmukilan/livewire',
  soc_gpt: 'https://github.com/kvmukilan/soc-gpt',
  ot_attack_simulator: 'https://github.com/kvmukilan/ot-digital-twin',
  ics_cve_scanner: 'https://github.com/kvmukilan/ics-supply-chain-scanner',
  // ✏️ EDIT: no public repo yet — these fall back to the profile
  kabini_rag: SITE.github,
  ai_pcap_triage: SITE.github,
};

const FILES = {
  'about.txt': `${SITE.name} — ${SITE.role}\nM.Tech AI & Data Science (Cybersecurity), NFSU.\nFocus: ${SITE.focus}`,
  'focus.txt': SITE.focus,
  'contact.txt': `email:    ${SITE.email}\ngithub:   ${SITE.github}\nlinkedin: ${SITE.linkedin}`,
  'findings/sample.md': [
    '# Finding (sanitized sample — client & target redacted)',
    '',
    'title    : Insecure credential storage on embedded device',
    'severity : HIGH   ·   CVSS v3.1: 7.4 (AV:P/AC:L/...)',
    'att&ck   : T1552.001 — Credentials in Files',
    'iec62443 : CR 1.5 (authenticator management)',
    '',
    'summary  : Firmware persisted service credentials in plaintext',
    '           on a world-readable partition; recoverable over an',
    '           exposed debug interface. Reproducible PoC attached in',
    '           the engagement report.',
    '',
    'status   : reported · fixed in vendor pre-production build',
  ].join('\n'),
};

/* neofetch-style identity card */
const NEOFETCH = [
  '    ╔═══════════╗     karmukilan_v@muki-portfolio',
  '    ║   >_      ║     ───────────────────────────',
  `    ║  ┌─────┐  ║     role   : ${SITE.role}`,
  '    ║  │ SEC │  ║     base   : India · NFSU (M.Tech AI & Cybersec)',
  '    ║  └─────┘  ║     stack  : Burp · Frida · MobSF · LangGraph',
  '    ║           ║     ot     : Modbus · IEC 61850 · OPC UA · DNP3',
  '    ╚═══════════╝     status : ● open to work',
].join('\n');

const COMMANDS = {
  help() {
    termPrint('available commands:', 'line-ok');
    termPrint(
      '  neofetch      — system / identity card\n' +
      '  whoami        — who is this guy\n' +
      '  projects      — list projects\n' +
      '  open <proj>   — open a project repo (new tab)\n' +
      '  cd <section>  — jump to a page section\n' +
      '  certs         — certifications\n' +
      '  nmap          — scan this host (try it)\n' +
      '  resume        — open resume (new tab)\n' +
      '  contact       — how to reach me\n' +
      '  social        — github / linkedin\n' +
      '  ls            — list files\n' +
      '  cat <file>    — print a file\n' +
      '  clear         — clear screen\n' +
      '  exit          — close terminal'
    );
    termPrint('tip: <Tab> completes · ↑/↓ history', 'line-out');
  },
  neofetch() {
    termPrint(NEOFETCH, 'line-ok');
  },
  whoami() {
    termPrint(`${SITE.handle} — ${SITE.role}`);
  },
  projects() {
    SITE.projects.forEach(p => termPrint(p));
    termPrint('run `open <name>` to view a repo, or `cd contact` to reach out.', 'line-ok');
  },
  open(args) {
    const name = (args[0] || '').replace(/\/$/, '');
    if (!name) { termPrint('usage: open <project>  ·  try `projects`', 'line-err'); return; }
    if (REPOS[name]) {
      termPrint(`opening ${name}...`, 'line-ok');
      window.open(REPOS[name], '_blank', 'noopener');
    } else {
      termPrint(`open: ${name}: unknown project — run \`projects\``, 'line-err');
    }
  },
  cd(args) {
    const dest = (args[0] || '').replace(/^[~/]+|\/$/g, '') || 'top';
    if (dest === 'top' || dest === '') {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      termPrint('~', 'line-ok');
      setTimeout(closeTerminal, 250);
      return;
    }
    if (SECTIONS.includes(dest)) {
      const el = document.getElementById(dest);
      termPrint(`cd ~/${dest}`, 'line-ok');
      setTimeout(() => {
        el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        closeTerminal();
      }, 250);
    } else {
      termPrint(`cd: ${dest}: no such section — try: ${SECTIONS.join(', ')}`, 'line-err');
    }
  },
  certs() {
    SITE.certs.forEach(c => termPrint(c));
  },
  ctf() {
    SITE.ctf.forEach(c => termPrint(c));
  },
  nmap() {
    termPrint('Starting Nmap against localhost ( you )...', 'line-out');
    termPrint(
      'PORT     STATE  SERVICE\n' +
      '22/tcp   open   ssh          curious visitor detected\n' +
      '80/tcp   open   http         serving this portfolio\n' +
      '443/tcp  open   https        recruiter-friendly\n' +
      '1337/tcp open   hire-me      accepting connections',
      'line-ok'
    );
    termPrint('Host is up. 1 host looking for their next engineer.', 'line-out');
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
    if (!file) { termPrint('usage: cat <file>  ·  run `ls`', 'line-err'); return; }
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

/* Names Tab-completion can suggest, keyed by first word. */
const COMMAND_NAMES = Object.keys(COMMANDS);
function completionsFor(parts) {
  if (parts.length <= 1) return COMMAND_NAMES;
  const cmd = parts[0].toLowerCase();
  if (cmd === 'cat') return Object.keys(FILES);
  if (cmd === 'open') return Object.keys(REPOS);
  if (cmd === 'cd') return SECTIONS;
  return [];
}

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

const BOOT_LINES = [
  { text: 'booting muki-portfolio shell v2.1 ...', cls: 'line-out' },
  { text: '[  ok  ] mounting /home/visitor', cls: 'line-ok' },
  { text: '[  ok  ] loading projects.db (6 records)', cls: 'line-ok' },
  { text: '[  ok  ] establishing secure channel', cls: 'line-ok' },
  { text: `welcome to ${SITE.handle}'s portfolio shell`, cls: 'line-ok' },
  { text: 'type `help` to see what you can do — or `neofetch` to start.', cls: 'line-out' },
];

function bootSequence() {
  if (prefersReducedMotion) {
    BOOT_LINES.forEach(l => termPrint(l.text, l.cls));
    return;
  }
  let i = 0;
  (function step() {
    if (i >= BOOT_LINES.length) return;
    const l = BOOT_LINES[i++];
    termPrint(l.text, l.cls);
    setTimeout(step, 180);
  })();
}

function openTerminal() {
  if (!overlay) return;
  overlay.hidden = false;
  if (!greeted) {
    greeted = true;
    bootSequence();
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const value = termInput.value;
      const parts = value.split(/\s+/);
      const frag = parts[parts.length - 1].toLowerCase();
      const pool = completionsFor(parts);
      const matches = pool.filter(name => name.toLowerCase().startsWith(frag));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        termInput.value = parts.join(' ') + (parts.length === 1 ? ' ' : '');
      } else if (matches.length > 1) {
        termPrint(value, 'line-cmd');
        termPrint(matches.join('   '));
      }
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
