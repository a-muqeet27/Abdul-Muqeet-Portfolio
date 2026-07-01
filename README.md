# Abdul Muqeet — Portfolio (v2.0)

Modern portfolio built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lenis** smooth scrolling. Preserves the original design identity, content, section order, and cyan/blue color theme.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) for best results (zero-config Next.js hosting).

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS (theme matches original CSS variables)
- Framer Motion (scroll animations, stagger, hover)
- Lenis (smooth scrolling)
- Lucide React (icons)

## Features

- Glassmorphism navbar with hide/show on scroll and active section highlighting
- Scroll progress bar and back-to-top button
- Letter-by-letter typing animation on hero subtitle
- Fade-in / stagger animations on scroll (re-triggers when leaving viewport)
- Expandable experience cards (description + tags)
- Alternating project layout with GitHub links and unified tag styling
- Technology grid with icon hover glow
- Resume download and social connect links
- Fully responsive (mobile, tablet, desktop)

## Project Structure

```
portfolio/
├── public/                 # Static assets (images, resume PDF)
├── src/
│   ├── app/                # Next.js app router (layout, page, globals.css)
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, SmoothScroll, ScrollProgress
│   │   ├── sections/       # Home, About, Education, Experience, etc.
│   │   └── ui/             # Tag, AnimatedSection
│   ├── data/portfolio.ts   # All site content (single source of truth)
│   ├── hooks/              # useActiveSection, useTypingEffect
│   └── lib/utils.ts
├── index.html              # Legacy static version (fallback)
├── styles.css
└── script.js
```

## Customization

Edit `src/data/portfolio.ts` to update content — name, projects, education, experience, technologies, and social links. Images live in `public/images/`.

## Legacy Static Site

The original HTML/CSS/JS version (`index.html`, `styles.css`, `script.js`) is kept for reference. The Next.js app is the primary v2.0 experience.

## License

Personal portfolio — modify freely for your own use.
