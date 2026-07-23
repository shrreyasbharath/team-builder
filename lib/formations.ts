export interface FormationSlot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  position: string;
  label: string;
  row: number;
}

export interface Formation {
  name: string;
  slots: FormationSlot[];
}

export const FORMATIONS: Record<string, Formation> = {
  "4-3-3": {
    name: "4-3-3",
    slots: [
      { id: "gk", x: 50, y: 88, position: "GK", label: "GK", row: 0 },
      { id: "lb", x: 18, y: 72, position: "LB", label: "LB", row: 1 },
      { id: "cb1", x: 38, y: 74, position: "CB", label: "CB", row: 1 },
      { id: "cb2", x: 62, y: 74, position: "CB", label: "CB", row: 1 },
      { id: "rb", x: 82, y: 72, position: "RB", label: "RB", row: 1 },
      { id: "cm1", x: 28, y: 52, position: "CM", label: "CM", row: 2 },
      { id: "cm2", x: 50, y: 54, position: "CM", label: "CM", row: 2 },
      { id: "cm3", x: 72, y: 52, position: "CM", label: "CM", row: 2 },
      { id: "lw", x: 18, y: 28, position: "LW", label: "LW", row: 3 },
      { id: "st", x: 50, y: 18, position: "ST", label: "ST", row: 3 },
      { id: "rw", x: 82, y: 28, position: "RW", label: "RW", row: 3 },
    ],
  },
  "4-4-2": {
    name: "4-4-2",
    slots: [
      { id: "gk", x: 50, y: 88, position: "GK", label: "GK", row: 0 },
      { id: "lb", x: 18, y: 74, position: "LB", label: "LB", row: 1 },
      { id: "cb1", x: 38, y: 76, position: "CB", label: "CB", row: 1 },
      { id: "cb2", x: 62, y: 76, position: "CB", label: "CB", row: 1 },
      { id: "rb", x: 82, y: 74, position: "RB", label: "RB", row: 1 },
      { id: "lm", x: 15, y: 50, position: "LM", label: "LM", row: 2 },
      { id: "cm1", x: 38, y: 52, position: "CM", label: "CM", row: 2 },
      { id: "cm2", x: 62, y: 52, position: "CM", label: "CM", row: 2 },
      { id: "rm", x: 85, y: 50, position: "RM", label: "RM", row: 2 },
      { id: "st1", x: 38, y: 22, position: "ST", label: "ST", row: 3 },
      { id: "st2", x: 62, y: 22, position: "ST", label: "ST", row: 3 },
    ],
  },
  "4-2-3-1": {
    name: "4-2-3-1",
    slots: [
      { id: "gk", x: 50, y: 88, position: "GK", label: "GK", row: 0 },
      { id: "lb", x: 18, y: 74, position: "LB", label: "LB", row: 1 },
      { id: "cb1", x: 38, y: 76, position: "CB", label: "CB", row: 1 },
      { id: "cb2", x: 62, y: 76, position: "CB", label: "CB", row: 1 },
      { id: "rb", x: 82, y: 74, position: "RB", label: "RB", row: 1 },
      { id: "cdm1", x: 38, y: 54, position: "CDM", label: "CDM", row: 2 },
      { id: "cdm2", x: 62, y: 54, position: "CDM", label: "CDM", row: 2 },
      { id: "lw", x: 15, y: 34, position: "LW", label: "LW", row: 3 },
      { id: "cam", x: 50, y: 36, position: "CAM", label: "CAM", row: 3 },
      { id: "rw", x: 85, y: 34, position: "RW", label: "RW", row: 3 },
      { id: "st", x: 50, y: 16, position: "ST", label: "ST", row: 4 },
    ],
  },
  "3-5-2": {
    name: "3-5-2",
    slots: [
      { id: "gk", x: 50, y: 88, position: "GK", label: "GK", row: 0 },
      { id: "cb1", x: 26, y: 74, position: "CB", label: "CB", row: 1 },
      { id: "cb2", x: 50, y: 76, position: "CB", label: "CB", row: 1 },
      { id: "cb3", x: 74, y: 74, position: "CB", label: "CB", row: 1 },
      { id: "lwb", x: 10, y: 52, position: "LWB", label: "LWB", row: 2 },
      { id: "cm1", x: 30, y: 52, position: "CM", label: "CM", row: 2 },
      { id: "cm2", x: 50, y: 54, position: "CM", label: "CM", row: 2 },
      { id: "cm3", x: 70, y: 52, position: "CM", label: "CM", row: 2 },
      { id: "rwb", x: 90, y: 52, position: "RWB", label: "RWB", row: 2 },
      { id: "st1", x: 38, y: 22, position: "ST", label: "ST", row: 3 },
      { id: "st2", x: 62, y: 22, position: "ST", label: "ST", row: 3 },
    ],
  },
  "3-4-3": {
    name: "3-4-3",
    slots: [
      { id: "gk", x: 50, y: 88, position: "GK", label: "GK", row: 0 },
      { id: "cb1", x: 26, y: 74, position: "CB", label: "CB", row: 1 },
      { id: "cb2", x: 50, y: 76, position: "CB", label: "CB", row: 1 },
      { id: "cb3", x: 74, y: 74, position: "CB", label: "CB", row: 1 },
      { id: "lm", x: 15, y: 50, position: "LM", label: "LM", row: 2 },
      { id: "cm1", x: 40, y: 52, position: "CM", label: "CM", row: 2 },
      { id: "cm2", x: 60, y: 52, position: "CM", label: "CM", row: 2 },
      { id: "rm", x: 85, y: 50, position: "RM", label: "RM", row: 2 },
      { id: "lw", x: 18, y: 24, position: "LW", label: "LW", row: 3 },
      { id: "st", x: 50, y: 18, position: "ST", label: "ST", row: 3 },
      { id: "rw", x: 82, y: 24, position: "RW", label: "RW", row: 3 },
    ],
  },
  "5-3-2": {
    name: "5-3-2",
    slots: [
      { id: "gk", x: 50, y: 88, position: "GK", label: "GK", row: 0 },
      { id: "lwb", x: 10, y: 70, position: "LWB", label: "LWB", row: 1 },
      { id: "cb1", x: 28, y: 74, position: "CB", label: "CB", row: 1 },
      { id: "cb2", x: 50, y: 76, position: "CB", label: "CB", row: 1 },
      { id: "cb3", x: 72, y: 74, position: "CB", label: "CB", row: 1 },
      { id: "rwb", x: 90, y: 70, position: "RWB", label: "RWB", row: 1 },
      { id: "cm1", x: 30, y: 50, position: "CM", label: "CM", row: 2 },
      { id: "cm2", x: 50, y: 52, position: "CM", label: "CM", row: 2 },
      { id: "cm3", x: 70, y: 50, position: "CM", label: "CM", row: 2 },
      { id: "st1", x: 38, y: 22, position: "ST", label: "ST", row: 3 },
      { id: "st2", x: 62, y: 22, position: "ST", label: "ST", row: 3 },
    ],
  },
};

export function isValidPosition(
  playerPosition: string,
  secondaryPositions: string[],
  slotPosition: string
): boolean {
  if (playerPosition === slotPosition) return true;
  if (secondaryPositions.includes(slotPosition)) return true;

  // Allow flexibility for similar positions
  const defGroup = ["LB", "RB", "CB", "LWB", "RWB"];
  const midGroup = ["CDM", "CM", "CAM", "LM", "RM"];
  const fwdGroup = ["LW", "RW", "ST", "CF"];

  if (defGroup.includes(playerPosition) && defGroup.includes(slotPosition)) return true;
  if (midGroup.includes(playerPosition) && midGroup.includes(slotPosition)) return true;
  if (fwdGroup.includes(playerPosition) && fwdGroup.includes(slotPosition)) return true;

  return false;
}

export function getFormationList(): string[] {
  return Object.keys(FORMATIONS);
}
