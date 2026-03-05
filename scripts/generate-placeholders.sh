#!/bin/bash
# Generate placeholder images for GPEN website development
# Replace these with real photos later

# Colors
CYAN="#06b6d4"
PURPLE="#8b5cf6"
DARK="#0a0e1a"

create_svg() {
  local path="$1"
  local width="$2"
  local height="$3"
  local text="$4"
  local color1="${5:-$CYAN}"
  local color2="${6:-$PURPLE}"

  mkdir -p "$(dirname "$path")"
  cat > "$path" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${DARK};stop-opacity:1" />
      <stop offset="50%" style="stop-color:#111827;stop-opacity:1" />
      <stop offset="100%" style="stop-color:${DARK};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  <rect x="0" y="$((height - 4))" width="${width}" height="4" fill="url(#accent)"/>
  <circle cx="$((width / 2))" cy="$((height / 2 - 20))" r="30" fill="url(#accent)" stroke="${color1}" stroke-width="1" opacity="0.5"/>
  <text x="50%" y="55%" font-family="monospace" font-size="14" fill="${color1}" text-anchor="middle" opacity="0.8">${text}</text>
</svg>
EOF
}

# Create directories
mkdir -p public/team public/events public/gallery

# Team member placeholders
for i in 1 2 3 4 5 6; do
  create_svg "public/team/member${i}.jpg.svg" 400 500 "Team Member ${i}"
done

# Team group photo
create_svg "public/team/group.jpg.svg" 1200 600 "GPEN Group Photo"

# Event images
for i in 1 2 3 4 5 6; do
  create_svg "public/events/event${i}.jpg.svg" 600 400 "Event ${i}"
done

# Gallery images
for i in 1 2 3 4 5 6 7 8; do
  create_svg "public/gallery/photo${i}.jpg.svg" 600 400 "Gallery Photo ${i}"
done

echo "✅ SVG placeholders created!"
echo ""
echo "⚠️  For production, replace files in:"
echo "   public/team/    — Team member photos (member1.jpg ... member6.jpg, group.jpg)"
echo "   public/events/  — Event images (event1.jpg ... event6.jpg)"
echo "   public/gallery/ — Gallery photos (photo1.jpg ... photo8.jpg)"
