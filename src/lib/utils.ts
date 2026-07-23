/** Format a number in Crores */
export function formatCrore(value: number): string {
  return `₹${value.toFixed(0)} Cr`;
}

/** Get flag emoji from country code */
export function getFlagEmoji(countryCode?: string): string {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/** Map position to color class */
export const positionColors: Record<string, string> = {
  GK: "pos-gk",
  CB: "pos-def",
  LB: "pos-def",
  RB: "pos-def",
  LWB: "pos-def",
  RWB: "pos-def",
  CDM: "pos-mid",
  CM: "pos-mid",
  CAM: "pos-mid",
  LM: "pos-mid",
  RM: "pos-mid",
  LW: "pos-fwd",
  RW: "pos-fwd",
  ST: "pos-fwd",
  CF: "pos-fwd",
  LF: "pos-fwd",
  RF: "pos-fwd",
};

/** Get rating color class */
export function getRatingColor(rating: number): string {
  if (rating >= 90) return "rating-elite";
  if (rating >= 85) return "rating-great";
  if (rating >= 80) return "rating-good";
  return "rating-average";
}

/** Calculate average of an array */
export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

/** Get player avatar URL */
export function getPlayerImageUrl(name: string): string {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&background=1a1a2e&color=e0e0e0&size=128&bold=true&format=svg`;
}

/** Shuffle array (Fisher-Yates) */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** cn utility for combining classes */
export function cn(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Get position display label */
export function getPositionLabel(pos: string): string {
  const labels: Record<string, string> = {
    GK: "GKP",
    CB: "CB",
    LB: "LB",
    RB: "RB",
    LWB: "LWB",
    RWB: "RWB",
    CDM: "CDM",
    CM: "CM",
    CAM: "CAM",
    LM: "LM",
    RM: "RM",
    LW: "LW",
    RW: "RW",
    ST: "ST",
    CF: "CF",
    LF: "LF",
    RF: "RF",
  };
  return labels[pos] || pos;
}

/** Get position category for slot matching */
export function getPositionCategory(pos: string): string {
  if (pos === "GK") return "GK";
  if (["CB", "LB", "RB", "LWB", "RWB"].includes(pos)) return "DEF";
  if (["CDM", "CM", "CAM", "LM", "RM"].includes(pos)) return "MID";
  if (["LW", "RW", "ST", "CF", "LF", "RF"].includes(pos)) return "FWD";
  return "MID";
}
