#!/usr/bin/env node

/**
 * Generate visual placeholder frames for testing
 * Creates gradient frames that simulate a video
 */

const fs = require("fs");
const path = require("path");

async function generateVisualFrames() {
  const OUTPUT_DIR = path.join(__dirname, "../public/frames");
  const TOTAL_FRAMES = 180;

  // Try to use sharp if available, otherwise create simple SVG-based frames
  try {
    const sharp = require("sharp");
    console.log("📝 Generating visual frames with sharp...");

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const frameNum = String(i + 1).padStart(4, "0");
      const filePath = path.join(OUTPUT_DIR, `frame_${frameNum}.webp`);

      // Create a gradient based on frame position
      const progress = i / TOTAL_FRAMES;
      const hue = Math.floor(progress * 360);

      // Create SVG with gradient
      const svg = `
        <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:hsl(${hue},70%,30%);stop-opacity:1" />
              <stop offset="100%" style="stop-color:hsl(${hue + 60},70%,50%);stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="1920" height="1080" fill="url(#grad)"/>
          <text x="960" y="540" font-size="72" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial">
            Frame ${i + 1}/${TOTAL_FRAMES}
          </text>
        </svg>
      `;

      await sharp(Buffer.from(svg))
        .webp({ quality: 80 })
        .toFile(filePath);

      if ((i + 1) % 30 === 0) {
        process.stdout.write(`\r✓ Generated ${i + 1}/${TOTAL_FRAMES} frames`);
      }
    }
    console.log(`\n✓ Generated ${TOTAL_FRAMES} visual frames`);
  } catch (err) {
    // Fallback: Create simple binary WebP files
    console.log("⚠️  sharp not available, creating minimal WebP files...");
    console.log("   For proper video frames, install ffmpeg:");
    console.log("   npm run build (with sodamax.mp4 present)");

    // Create minimal valid WebP file (1x1 pixel)
    const minimalWebP = Buffer.from([
      0x52, 0x49, 0x46, 0x46, 0x1a, 0x00, 0x00, 0x00,
      0x57, 0x45, 0x42, 0x50, 0x56, 0x50, 0x38, 0x4c,
      0x0d, 0x00, 0x00, 0x00, 0x2f, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ]);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const frameNum = String(i + 1).padStart(4, "0");
      const filePath = path.join(OUTPUT_DIR, `frame_${frameNum}.webp`);
      fs.writeFileSync(filePath, minimalWebP);
    }
    console.log(`✓ Created ${TOTAL_FRAMES} minimal frames`);
  }
}

generateVisualFrames().catch(console.error);
