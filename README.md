# Karmukilan V — Cybersecurity Portfolio

Personal portfolio with a pro-cyber terminal aesthetic. Pure HTML/CSS/JS — no frameworks, no build step, no trackers.

**Live:** https://muki-portfolio.vercel.app

## Features

- Terminal-style hero with a typed `whoami` sequence
- **Interactive terminal** — press <kbd>~</kbd> (or the `>_` button in the nav) and type `help`, `whoami`, `projects`, `resume`, `sudo hire-me`...
- Skills matrix (Offensive / Defensive / AI-Security / Tooling)
- Proof-of-skill section: certifications + CTF/TryHackMe/HTB stats
- Security writeups grid
- Bento project grid, scroll reveals, subtle 3D tilt
- Responsive, keyboard-accessible, honors `prefers-reduced-motion`

## Run locally

Any static server works:

```sh
python -m http.server 8000
# or
npx serve
```

Then open http://localhost:8000.

## Editing content

All placeholder content is flagged — search the codebase for **`✏️ EDIT`**:

- **`index.html`** — about text, certifications, CTF stats, writeup cards, resume link, project links
- **`script.js`** — the `SITE` object at the top drives the hero typing sequence *and* every interactive-terminal command (projects, certs, ctf, contact). Edit once, both update.

The typed hero lines live in `HERO_SEQUENCE` in `script.js`.

## Structure

```
index.html   — all markup (single page)
styles.css   — design system + components
script.js    — typewriter, interactive terminal, scroll effects
profile.png  — profile photo
```

## Deploy

Static site — deploys as-is on Vercel / GitHub Pages / Netlify.
