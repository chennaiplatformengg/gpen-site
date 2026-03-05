// Script to generate placeholder SVG images for development
// Run: node scripts/generate-placeholders.mjs

import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const publicDir = join(process.cwd(), "public");

function createPlaceholder(path, width, height, label, emoji = "📷") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0e1a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.4"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect x="0" y="${height - 3}" width="${width}" height="3" fill="url(#accent)"/>
  <circle cx="${width / 2}" cy="${height / 2 - 15}" r="35" fill="none" stroke="#06b6d4" stroke-width="1.5" opacity="0.4"/>
  <text x="50%" y="${height / 2 - 12}" font-family="system-ui,sans-serif" font-size="28" fill="#06b6d4" text-anchor="middle" opacity="0.6">${emoji}</text>
  <text x="50%" y="${height / 2 + 30}" font-family="monospace" font-size="12" fill="#94a3b8" text-anchor="middle" opacity="0.7">${label}</text>
  <text x="50%" y="${height / 2 + 50}" font-family="monospace" font-size="10" fill="#475569" text-anchor="middle">${width}×${height}</text>
</svg>`;
  writeFileSync(join(publicDir, path), svg);
  console.log(`  ✓ ${path}`);
}

console.log("\\n🎨 Generating GPEN placeholder images...\\n");

// Team member photos
for (let i = 1; i <= 6; i++) {
  createPlaceholder(`team/member${i}.jpg`, 400, 500, `Team Member ${i}`, "👤");
}
createPlaceholder("team/group.jpg", 1200, 600, "GPEN Group Photo", "👥");

// Event images
const eventEmojis = ["🎤", "⚙️", "☸️", "🏗️", "📊", "💻"];
for (let i = 1; i <= 6; i++) {
  createPlaceholder(`events/event${i}.jpg`, 600, 400, `Event ${i}`, eventEmojis[i - 1]);
}

// Gallery photos
const galleryEmojis = ["🎯", "🛠️", "🤝", "💡", "🎙️", "🌐", "🏆", "🎉"];
for (let i = 1; i <= 8; i++) {
  createPlaceholder(`gallery/photo${i}.jpg`, 600, 400, `Gallery ${i}`, galleryEmojis[i - 1]);
}

console.log("\\n✅ All placeholders generated!");
console.log("\\n📌 Replace with real images in:");
console.log("   public/team/     — member1.jpg to member6.jpg + group.jpg");
console.log("   public/events/   — event1.jpg to event6.jpg");
console.log("   public/gallery/  — photo1.jpg to photo8.jpg\\n");
