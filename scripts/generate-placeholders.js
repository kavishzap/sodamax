#!/usr/bin/env node

/**
 * Generate placeholder frames for development/testing
 * Creates solid color gradient frames to test scroll animation
 */

const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "../public/frames");
const TOTAL_FRAMES = 180;

function generatePlaceholderFrames() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log("📝 Generating placeholder frames...");

  // For now, just create empty marker files
  // In production, you would use canvas or similar to generate actual images
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const frameNum = String(i + 1).padStart(4, "0");
    const filePath = path.join(OUTPUT_DIR, `frame_${frameNum}.webp`);

    // Create a placeholder file (in real implementation, this would be actual image data)
    fs.writeFileSync(filePath, Buffer.from(""));
  }

  console.log(`✓ Generated ${TOTAL_FRAMES} placeholder frame markers`);
  console.log(`📁 Location: ${OUTPUT_DIR}`);
  console.log("\n⚠️  Note: These are placeholder frames. Run the build with sodamax.mp4");
  console.log("    present in the project root to extract actual video frames:");
  console.log("    npm run build");
}

generatePlaceholderFrames();
