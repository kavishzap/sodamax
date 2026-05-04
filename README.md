# SodaMax — Cinematic Product Experience

A luxury scroll-animation website for the SodaMax premium sparkling water machine. Built with Next.js 14, TypeScript, Tailwind CSS, HTML5 Canvas, and Framer Motion.

## ✨ Features

- **Scroll-driven Canvas animation** with 3-act story structure
- **Framer Motion text overlays** with smooth scroll-triggered reveals
- **Cinematic aesthetic** with warm amber color palette and premium typography (Cormorant Garamond)
- **Performance optimized** with frame skipping on mobile devices
- **Loading screen** with preload progress tracking
- **Fully responsive** design with dark theme

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- `ffmpeg` (for extracting frames from video)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📦 Building for Production

The build process automatically extracts frames from `sodamax.mp4` (if present):

```bash
npm run build
npm start
```

### Frame Extraction

**Option 1: Auto-extract from video (Recommended)**

Place `sodamax.mp4` in the project root, then run:

```bash
npm run build
```

The script uses `ffmpeg` to extract frames at 30fps as WebP files.

**Option 2: Use placeholder frames (Development)**

For development without the video file:

```bash
node scripts/generate-placeholders.js
npm run dev
```

This creates placeholder frames for testing the animation structure.

## 🏗️ Project Structure

```
sodamax/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Main page with scroll container
│   └── globals.css             # Dark theme & Canvas styling
├── components/
│   ├── ScrollCanvas.tsx        # Sticky Canvas + frame playback
│   └── TextOverlay.tsx         # Framer Motion text animations
├── hooks/
│   └── useScrollProgress.ts    # Scroll tracking utility
├── public/
│   └── frames/                 # Generated WebP frames (from video)
├── scripts/
│   ├── extract-frames.js       # FFmpeg wrapper for video extraction
│   └── generate-placeholders.js # Placeholder frame generator
├── SodaMax_CLAUDE.md           # Project spec & design guidelines
└── package.json
```

## 🎨 Design System

### Colors

- **Deep dark**: `#050301`
- **Section bg**: `#120804`
- **Amber**: `#C97818` (primary)
- **Amber light**: `#F6A735` (accent)
- **Citrus**: `#FFD35A` (highlight)
- **Cream**: `#FFF4DD` (text)

### Typography

- **Cormorant Garamond** (headings) — elegant serif
- **Inter** (body) — clean sans-serif

## 📊 Scroll Animation Structure (3-Act)

| Act | Scroll % | Description |
|-----|----------|-------------|
| 1 | 0–28% | Hero machine still, calm |
| 2 | 30–68% | Citrus splash explosion |
| 3 | 72–100% | Reverse collapse back to clean |

### Text Overlays

- **Hero** (5%): "Sparkle. Refined. Perfect."
- **Splash** (35%): "The Spark Moment."
- **Reverse** (75%): "Back to Perfection."
- **CTA** (95%): "Bring the Spark Home" (button)

## 🔧 Configuration

### Scroll Height

Adjust total scroll distance in `app/page.tsx`:

```tsx
<div className="relative h-[500vh] bg-bg-deep"></div>
```

### Frame Count

Frame count is determined by video duration & FPS in `scripts/extract-frames.js`:

```js
const FPS = 30; // Frames per second
```

### Mobile Performance

Frame skipping is controlled in `components/ScrollCanvas.tsx`:

```tsx
const isMobile = window.innerWidth < 768;
if (isMobile) {
  frameIndex = Math.floor(frameIndex / 2) * 2; // Skip every other frame
}
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14.1+
- Mobile browsers with Canvas support

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
git push
# Push to your Vercel repo
```

Frames are automatically included in `/public/frames` during build.

### Other Hosts

Ensure `/public` directory is served statically, and frames are extracted during build.

## 🐛 Troubleshooting

**Frames not extracted:**
- Ensure `ffmpeg` is installed: `which ffmpeg` (macOS/Linux) or `where ffmpeg` (Windows)
- Verify `sodamax.mp4` is in project root
- Check build logs: `npm run build 2>&1`

**Canvas showing blank:**
- Check browser DevTools Console for errors
- Verify frames exist: `ls public/frames/`
- Test with placeholder frames: `node scripts/generate-placeholders.js`

**Text overlays not appearing:**
- Scroll to trigger animations (they're scroll-driven)
- Check Framer Motion library is installed: `npm list framer-motion`

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## 📄 License

See SodaMax_CLAUDE.md for project specifications and design guidelines.

