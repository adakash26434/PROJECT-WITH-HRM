/**
 * Utilities for converting between the HSL-string format used in CSS variables
 * (e.g. "240 5.9% 10%") and hex color strings used by <input type="color">.
 */

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h / 360 + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h / 360) * 255),
    Math.round(hue2rgb(p, q, h / 360 - 1 / 3) * 255),
  ];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function toHex(v: number): string {
  return v.toString(16).padStart(2, "0");
}

export function hslStringToHex(hslStr: string): string {
  const parts = hslStr.trim().split(/\s+/);
  const h = parseFloat(parts[0] ?? "0");
  const s = parseFloat(parts[1] ?? "0");
  const l = parseFloat(parts[2] ?? "0");
  if (isNaN(h) || isNaN(s) || isNaN(l)) return "#000000";
  const [r, g, b] = hslToRgb(h, s, l);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToHslString(hex: string): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  if (isNaN(num)) return "0 0% 0%";
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const [h, s, l] = rgbToHsl(r, g, b);
  const fmt = (n: number) => parseFloat(n.toFixed(1));
  return `${Math.round(h)} ${fmt(s)}% ${fmt(l)}%`;
}

/** Read the current computed value of a CSS variable from :root */
export function readCssVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

/** Apply a CSS variable override directly to :root */
export function applyCssVar(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}

/** Remove an inline override so the stylesheet default takes over again */
export function removeCssVar(name: string) {
  document.documentElement.style.removeProperty(name);
}
