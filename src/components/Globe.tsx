"use client";

import { useRef, useEffect, useCallback } from "react";

// Connection arcs between city nodes
interface CityNode {
  lat: number;
  lng: number;
  label: string;
}

const cities: CityNode[] = [
  { lat: 37.77, lng: -122.42, label: "San Francisco" },
  { lat: 40.71, lng: -74.01, label: "New York" },
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 48.86, lng: 2.35, label: "Paris" },
  { lat: 52.52, lng: 13.41, label: "Berlin" },
  { lat: 35.68, lng: 139.69, label: "Tokyo" },
  { lat: 22.32, lng: 114.17, label: "Hong Kong" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
  { lat: -33.87, lng: 151.21, label: "Sydney" },
  { lat: 19.08, lng: 72.88, label: "Mumbai" },
  { lat: 28.61, lng: 77.21, label: "Delhi" },
  { lat: 12.97, lng: 77.59, label: "Bangalore" },
  { lat: 55.76, lng: 37.62, label: "Moscow" },
  { lat: -23.55, lng: -46.63, label: "São Paulo" },
  { lat: 25.28, lng: 55.3, label: "Dubai" },
  { lat: 37.57, lng: 126.98, label: "Seoul" },
  { lat: 30.05, lng: 31.24, label: "Cairo" },
  { lat: 49.28, lng: -123.12, label: "Vancouver" },
  { lat: 43.65, lng: -79.38, label: "Toronto" },
  { lat: -34.6, lng: -58.38, label: "Buenos Aires" },
];

// Connections between cities (index pairs)
const connections: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [5, 6],
  [6, 7], [7, 8], [9, 10], [10, 11], [2, 12],
  [13, 19], [14, 9], [5, 15], [1, 18], [0, 17],
  [4, 12], [14, 16], [7, 11], [3, 14], [2, 4],
  [8, 7], [15, 5], [16, 14], [17, 0], [18, 1],
];

function latLngToXYZ(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

function rotateY(x: number, y: number, z: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: x * cos + z * sin,
    y,
    z: -x * sin + z * cos,
  };
}

function rotateX(x: number, y: number, z: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x,
    y: y * cos - z * sin,
    z: y * sin + z * cos,
  };
}

function project(x: number, y: number, z: number, cx: number, cy: number, fov: number) {
  const scale = fov / (fov + z);
  return {
    x: cx + x * scale,
    y: cy + y * scale,
    scale,
    z,
  };
}

// Simplified continent outlines as lat/lng polylines
const continents: number[][][] = [
  // North America
  [
    [60, -140], [65, -168], [72, -168], [72, -140], [68, -100], [60, -80],
    [50, -60], [45, -65], [43, -70], [30, -82], [25, -80], [25, -98],
    [20, -105], [15, -92], [15, -85], [10, -75], [8, -77], [10, -83],
    [15, -87], [20, -87], [20, -90], [30, -88], [28, -96], [35, -95],
    [30, -115], [35, -120], [40, -124], [48, -124], [50, -127], [55, -132],
    [58, -136], [60, -140],
  ],
  // South America
  [
    [10, -75], [5, -77], [0, -80], [-5, -81], [-15, -75], [-20, -70],
    [-30, -72], [-40, -73], [-50, -75], [-55, -68], [-55, -64], [-50, -65],
    [-40, -62], [-35, -57], [-30, -50], [-22, -41], [-15, -39], [-5, -35],
    [0, -50], [5, -60], [10, -72], [10, -75],
  ],
  // Europe
  [
    [36, -10], [38, -8], [43, -9], [44, 0], [48, -5], [50, 2],
    [52, 5], [54, 8], [57, 10], [60, 5], [62, 5], [65, 12],
    [70, 20], [70, 30], [65, 30], [60, 30], [55, 28], [50, 30],
    [45, 28], [42, 29], [40, 26], [38, 24], [35, 25], [36, 15],
    [38, 12], [40, 15], [42, 13], [44, 8], [43, 6], [42, 3],
    [36, -5], [36, -10],
  ],
  // Africa
  [
    [35, -5], [37, 10], [32, 32], [30, 32], [22, 37], [12, 44],
    [10, 50], [2, 42], [-10, 40], [-15, 40], [-25, 35], [-34, 26],
    [-34, 18], [-30, 16], [-20, 12], [-12, 14], [-5, 12], [5, 2],
    [5, -5], [10, -15], [15, -17], [20, -17], [25, -15], [30, -10],
    [35, -5],
  ],
  // Asia (simplified)
  [
    [70, 30], [72, 60], [72, 100], [70, 130], [65, 140], [60, 150],
    [55, 140], [50, 140], [45, 135], [40, 130], [35, 128], [30, 120],
    [22, 115], [20, 110], [10, 105], [0, 105], [0, 95], [8, 80],
    [15, 75], [22, 70], [25, 65], [25, 60], [28, 50], [32, 35],
    [40, 28], [45, 30], [50, 30], [55, 28], [60, 30], [65, 30],
    [70, 30],
  ],
  // Australia
  [
    [-12, 130], [-15, 125], [-20, 115], [-25, 114], [-30, 115],
    [-35, 117], [-35, 138], [-38, 145], [-38, 148], [-34, 151],
    [-28, 153], [-22, 149], [-18, 146], [-15, 145], [-12, 142],
    [-10, 135], [-12, 130],
  ],
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.38;
    const fov = 600;
    const tiltX = -0.2; // slight tilt

    ctx.clearRect(0, 0, w, h);

    rotationRef.current += 0.003;
    const rotY = rotationRef.current;

    // === Draw globe outline (subtle ring) ===
    ctx.beginPath();
    ctx.arc(cx, cy, radius * (fov / (fov + 0)), 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // === Draw continent outlines ===
    continents.forEach((continent) => {
      ctx.beginPath();
      let started = false;
      continent.forEach(([lat, lng]) => {
        const pos = latLngToXYZ(lat, lng, radius);
        let r = rotateY(pos.x, pos.y, pos.z, rotY);
        r = rotateX(r.x, r.y, r.z, tiltX);
        const p = project(r.x, r.y, r.z, cx, cy, fov);
        if (r.z > -radius * 0.05) {
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          started = false;
        }
      });
      ctx.closePath();
      ctx.fillStyle = "rgba(6, 182, 212, 0.06)";
      ctx.fill();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // === Draw latitude/longitude grid lines ===
    // Longitudes
    for (let lng = -180; lng < 180; lng += 30) {
      ctx.beginPath();
      let started = false;
      for (let lat = -90; lat <= 90; lat += 2) {
        const pos = latLngToXYZ(lat, lng, radius);
        let r = rotateY(pos.x, pos.y, pos.z, rotY);
        r = rotateX(r.x, r.y, r.z, tiltX);
        const p = project(r.x, r.y, r.z, cx, cy, fov);
        if (r.z > -radius * 0.1) {
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          started = false;
        }
      }
      ctx.strokeStyle = "rgba(6, 182, 212, 0.10)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Latitudes
    for (let lat = -60; lat <= 60; lat += 30) {
      ctx.beginPath();
      let started = false;
      for (let lng = -180; lng <= 180; lng += 2) {
        const pos = latLngToXYZ(lat, lng, radius);
        let r = rotateY(pos.x, pos.y, pos.z, rotY);
        r = rotateX(r.x, r.y, r.z, tiltX);
        const p = project(r.x, r.y, r.z, cx, cy, fov);
        if (r.z > -radius * 0.1) {
          if (!started) {
            ctx.moveTo(p.x, p.y);
            started = true;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        } else {
          started = false;
        }
      }
      ctx.strokeStyle = "rgba(6, 182, 212, 0.10)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // === Compute projected city positions ===
    const projected = cities.map((city) => {
      const pos = latLngToXYZ(city.lat, city.lng, radius);
      let r = rotateY(pos.x, pos.y, pos.z, rotY);
      r = rotateX(r.x, r.y, r.z, tiltX);
      const p = project(r.x, r.y, r.z, cx, cy, fov);
      return { ...p, visible: r.z > -radius * 0.15, label: city.label };
    });

    // === Draw connection arcs ===
    const time = Date.now() * 0.001;
    connections.forEach(([i, j], idx) => {
      const a = projected[i];
      const b = projected[j];
      if (!a.visible || !b.visible) return;

      // Bezier arc with height
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const dist = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
      const arcHeight = dist * 0.3;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(midX, midY - arcHeight, b.x, b.y);

      // Animated gradient opacity
      const pulse = 0.15 + 0.15 * Math.sin(time * 1.5 + idx * 0.7);
      const avgScale = (a.scale + b.scale) / 2;

      ctx.strokeStyle = idx % 3 === 0
        ? `rgba(6, 182, 212, ${pulse * avgScale})`
        : idx % 3 === 1
        ? `rgba(139, 92, 246, ${pulse * avgScale})`
        : `rgba(236, 72, 153, ${pulse * avgScale * 0.7})`;
      ctx.lineWidth = 1 * avgScale;
      ctx.stroke();

      // Animated traveling dot
      const dotT = ((time * 0.4 + idx * 0.3) % 1);
      const dotX = (1 - dotT) * (1 - dotT) * a.x + 2 * (1 - dotT) * dotT * midX + dotT * dotT * b.x;
      const dotY = (1 - dotT) * (1 - dotT) * a.y + 2 * (1 - dotT) * dotT * (midY - arcHeight) + dotT * dotT * b.y;

      ctx.beginPath();
      ctx.arc(dotX, dotY, 1.5 * avgScale, 0, Math.PI * 2);
      ctx.fillStyle = idx % 2 === 0 ? "rgba(6, 182, 212, 0.8)" : "rgba(139, 92, 246, 0.8)";
      ctx.fill();
    });

    // === Draw city nodes ===
    projected.forEach((p) => {
      if (!p.visible) return;

      const nodeRadius = 2.5 * p.scale;

      // Outer glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, nodeRadius * 4);
      grad.addColorStop(0, "rgba(6, 182, 212, 0.3)");
      grad.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.beginPath();
      ctx.arc(p.x, p.y, nodeRadius * 4, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Inner dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${0.6 + 0.4 * p.scale})`;
      ctx.fill();

      // White core
      ctx.beginPath();
      ctx.arc(p.x, p.y, nodeRadius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();
    });

    // === Draw subtle outer glow ring ===
    const globeGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.2);
    globeGrad.addColorStop(0, "rgba(6, 182, 212, 0)");
    globeGrad.addColorStop(0.5, "rgba(6, 182, 212, 0.06)");
    globeGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = globeGrad;
    ctx.fill();

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  // Mouse interaction for slight parallax
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
