/** General utility functions */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)} Cr`;
}

/** Get the color class for a position */
export function getPositionColor(position: string): string {
  switch (position) {
    case "GK":
      return "pos-gk";
    case "LB":
    case "RB":
    case "CB":
    case "LWB":
    case "RWB":
      return "pos-def";
    case "CDM":
    case "CM":
    case "CAM":
    case "LM":
    case "RM":
      return "pos-mid";
    case "LW":
    case "RW":
    case "ST":
    case "CF":
      return "pos-fwd";
    default:
      return "";
  }
}

export function getPositionHex(position: string): string {
  const colors: Record<string, string> = {
    GK: "#f59e0b",
    LB: "#3b82f6",
    RB: "#3b82f6",
    CB: "#3b82f6",
    LWB: "#3b82f6",
    RWB: "#3b82f6",
    CDM: "#22c55e",
    CM: "#22c55e",
    CAM: "#22c55e",
    LM: "#22c55e",
    RM: "#22c55e",
    LW: "#ef4444",
    RW: "#ef4444",
    ST: "#ef4444",
    CF: "#ef4444",
  };
  return colors[position] || "#6b7280";
}

export function calculateValue(rating: number): number {
  // Player value based on rating (in Crore)
  if (rating >= 90) return 60 + Math.floor(Math.random() * 30);
  if (rating >= 85) return 30 + Math.floor(Math.random() * 25);
  if (rating >= 80) return 15 + Math.floor(Math.random() * 15);
  if (rating >= 75) return 8 + Math.floor(Math.random() * 8);
  return 3 + Math.floor(Math.random() * 6);
}
