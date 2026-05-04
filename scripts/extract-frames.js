#!/usr/bin/env node

/**
 * Extract frames from sodamax.mp4 video for scroll animation
 * Requires: ffmpeg installed on system
 * Usage: node scripts/extract-frames.js
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const VIDEO_PATH = path.join(__dirname, "../sodamax.mp4");
const OUTPUT_DIR = path.join(__dirname, "../public/frames");
const FPS = 30;
const FORMAT = "webp";

async function extractFrames() {
  // Check if video file exists
  if (!fs.existsSync(VIDEO_PATH)) {
    console.warn(`⚠️  Video file not found at ${VIDEO_PATH}`);
    console.log("Skipping frame extraction. Place sodamax.mp4 in project root to extract frames.");
    return;
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created frames directory: ${OUTPUT_DIR}`);
  }

  try {
    console.log("🎬 Extracting frames from video...");
    console.log(`📹 Input: ${VIDEO_PATH}`);
    console.log(`📁 Output: ${OUTPUT_DIR}`);
    console.log(`🎞️  FPS: ${FPS}`);

    // Run ffmpeg to extract frames
    // Use execFileSync (no shell) so %04d is passed directly to ffmpeg
    // without CMD expanding it as a variable
    const outputPattern = path.join(OUTPUT_DIR, `frame_%04d.${FORMAT}`);
    execFileSync("ffmpeg", [
      "-i", VIDEO_PATH,
      "-vf", `fps=${FPS}`,
      "-vcodec", "libwebp",  // force single-frame encoder, not libwebp_anim
      "-q:v", "80",
      outputPattern,
      "-y"
    ], { stdio: "inherit" });

    // Count extracted frames
    const files = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(`.${FORMAT}`));
    console.log(`\n✓ Successfully extracted ${files.length} frames`);
  } catch (error) {
    console.warn(`⚠️  Frame extraction failed: ${error.message}`);
    console.log("\nTo extract frames from video, install ffmpeg:");
    console.log("  macOS: brew install ffmpeg");
    console.log("  Ubuntu: sudo apt-get install ffmpeg");
    console.log("  Windows: Download from https://ffmpeg.org/download.html");
    console.log("\n✓ Build will continue with existing frames (if any)");
  }
}

extractFrames().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
