# CLAUDE.md — SodaMax Cinematic Project Context

## Project Overview

**SodaMax** is a luxury scroll-animation website for a premium sparkling water / soda machine.

- Stack: Next.js 14 (App Router, TypeScript), Tailwind CSS, HTML5 Canvas API
- No Three.js. No GSAP. Canvas only.
- Fonts: Cormorant Garamond (headings) + Inter (body) from Google Fonts
- Deploy target: Vercel

---

## Brand Identity

| Key | Value |
|-----|------|
| Name | SodaMax |
| Tagline | Sparkle Every Moment |
| Sub-tagline | Premium carbonation. Perfectly crafted. |
| Aesthetic | Apple meets Aesop meets luxury beverage — dark, amber, cinematic |
| Feel | Like pouring a perfect sparkling drink in a luxury lounge at golden hour |

---

## Color System

```css
--bg-deep:       #050301;
--bg-section:    #120804;
--bg-card:       #1E0F06;

--amber:         #C97818;
--amber-light:   #F6A735;
--citrus:        #FFD35A;

--chrome:        #D8D8D8;
--glass:         rgba(255,255,255,0.08);

--cream:         #FFF4DD;
--cream-muted:   #B8946A;

--gradient-hero: linear-gradient(180deg, #050301 0%, #120804 50%, #050301 100%);
--gradient-amber: linear-gradient(135deg, #C97818 0%, #F6A735 50%, #C97818 100%);
--gradient-text: linear-gradient(135deg, #FFF4DD 0%, #C97818 40%, #F6A735 100%);
```

---

## Typography System

Cormorant Garamond: 400, 500, 700  
Inter: 300, 400, 500  

---

## Scroll Animation Architecture

### Source

Video file:
`/mnt/c/Users/KavishMojhoa-Zapproa/Desktop/sodamax/sodamax.mp4`

### Frame Extraction

Run from project root:

```bash
mkdir -p public/frames
ffmpeg -i sodamax.mp4 -vf fps=30 public/frames/frame_%04d.webp
```

---

## Canvas Setup

- Full viewport canvas
- position: sticky
- background: #050301
- Total scroll height: 500vh
- Frame driven by scroll progress (0–1)

---

## 3-Act Story

| Act | Scroll % | Scene |
|-----|--------|------|
| 1 | 0–28% | SodaMax machine still |
| 2 | 30–68% | Citrus explosion |
| 3 | 72–100% | Reverse collapse |

---

## Text Overlay

### Hero
Sparkle. Refined. Perfect.

### Splash
The Spark Moment.

### Reverse
Back to Perfection.

### CTA
Bring the Spark Home.

---

## Performance Rules

- Preload ALL frames
- Use requestAnimationFrame
- Mobile: skip frames
- Cache images

---

## File Structure

/public/frames
/app/page.tsx
/components/ScrollCanvas.tsx
/hooks/useScrollProgress.ts

---

## FINAL GOAL

Build a cinematic, premium SodaMax website experience.
