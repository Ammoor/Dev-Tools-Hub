export function randomHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
  return `#${hex}`;
}

export function hexToRgb(hex) {
  hex = hex.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

export function rgbToHsl({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; 
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
      default:
        h = 0;
    }
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function luminanceChannel(c) {
  c /= 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function getContrastRatio(foregroundHex, backgroundHex) {
  const fg = hexToRgb(foregroundHex);
  const bg = hexToRgb(backgroundHex);

  const L1 =
    0.2126 * luminanceChannel(fg.r) +
    0.7152 * luminanceChannel(fg.g) +
    0.0722 * luminanceChannel(fg.b);
  const L2 =
    0.2126 * luminanceChannel(bg.r) +
    0.7152 * luminanceChannel(bg.g) +
    0.0722 * luminanceChannel(bg.b);

  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100; 
}

export function bestTextColor(backgroundHex) {
  const whiteContrast = getContrastRatio("#ffffff", backgroundHex);
  const blackContrast = getContrastRatio("#000000", backgroundHex);
  return whiteContrast >= blackContrast ? "#ffffff" : "#000000";
}
