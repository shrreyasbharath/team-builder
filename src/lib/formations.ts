/**
 * Formation Definitions
 *
 * Each formation defines positions as percentages of pitch width and height.
 * x: 0-100 (left to right)
 * y: 0-100 (top to bottom — top is attacking end)
 */

export type PositionType = "GK" | "DEF" | "MID" | "FWD";
export type SlotId = string;

export interface PositionSlot {
  id: SlotId;
  label: string;
  x: number;
  y: number;
  type: PositionType;
  allowedPositions: string[];
}

export interface Formation {
  name: string;
  label: string;
  slots: PositionSlot[];
}

export const formations: Record<string, Formation> = {
  "4-3-3": {
    name: "4-3-3",
    label: "4-3-3",
    slots: [
      { id: "gk", label: "GK", x: 50, y: 92, type: "GK", allowedPositions: ["GK"] },
      { id: "lb", label: "LB", x: 12, y: 74, type: "DEF", allowedPositions: ["LB", "LWB", "LM", "CB"] },
      { id: "cb1", label: "CB", x: 35, y: 78, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "cb2", label: "CB", x: 65, y: 78, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "rb", label: "RB", x: 88, y: 74, type: "DEF", allowedPositions: ["RB", "RWB", "RM", "CB"] },
      { id: "cm1", label: "CM", x: 20, y: 48, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "cm2", label: "CM", x: 50, y: 50, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "cm3", label: "CM", x: 80, y: 48, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "lw", label: "LW", x: 15, y: 22, type: "FWD", allowedPositions: ["LW", "LM", "LF", "ST", "RW"] },
      { id: "st", label: "ST", x: 50, y: 14, type: "FWD", allowedPositions: ["ST", "CF", "CAM"] },
      { id: "rw", label: "RW", x: 85, y: 22, type: "FWD", allowedPositions: ["RW", "RM", "RF", "ST", "LW"] },
    ],
  },
  "4-4-2": {
    name: "4-4-2",
    label: "4-4-2",
    slots: [
      { id: "gk", label: "GK", x: 50, y: 92, type: "GK", allowedPositions: ["GK"] },
      { id: "lb", label: "LB", x: 12, y: 74, type: "DEF", allowedPositions: ["LB", "LWB", "LM", "CB"] },
      { id: "cb1", label: "CB", x: 35, y: 78, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "cb2", label: "CB", x: 65, y: 78, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "rb", label: "RB", x: 88, y: 74, type: "DEF", allowedPositions: ["RB", "RWB", "RM", "CB"] },
      { id: "lm", label: "LM", x: 12, y: 46, type: "MID", allowedPositions: ["LM", "LW", "CM", "RM"] },
      { id: "cm1", label: "CM", x: 35, y: 48, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "cm2", label: "CM", x: 65, y: 48, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "rm", label: "RM", x: 88, y: 46, type: "MID", allowedPositions: ["RM", "RW", "CM", "LM"] },
      { id: "st1", label: "ST", x: 35, y: 16, type: "FWD", allowedPositions: ["ST", "CF", "CAM"] },
      { id: "st2", label: "ST", x: 65, y: 16, type: "FWD", allowedPositions: ["ST", "CF", "CAM"] },
    ],
  },
  "4-2-3-1": {
    name: "4-2-3-1",
    label: "4-2-3-1",
    slots: [
      { id: "gk", label: "GK", x: 50, y: 92, type: "GK", allowedPositions: ["GK"] },
      { id: "lb", label: "LB", x: 12, y: 74, type: "DEF", allowedPositions: ["LB", "LWB", "LM", "CB"] },
      { id: "cb1", label: "CB", x: 35, y: 78, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "cb2", label: "CB", x: 65, y: 78, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "rb", label: "RB", x: 88, y: 74, type: "DEF", allowedPositions: ["RB", "RWB", "RM", "CB"] },
      { id: "cdm1", label: "CDM", x: 30, y: 52, type: "MID", allowedPositions: ["CDM", "CM", "CB"] },
      { id: "cdm2", label: "CDM", x: 70, y: 52, type: "MID", allowedPositions: ["CDM", "CM", "CB"] },
      { id: "lw", label: "LW", x: 12, y: 32, type: "FWD", allowedPositions: ["LW", "LM", "LF", "CAM"] },
      { id: "cam", label: "CAM", x: 50, y: 34, type: "MID", allowedPositions: ["CAM", "CM", "CF"] },
      { id: "rw", label: "RW", x: 88, y: 32, type: "FWD", allowedPositions: ["RW", "RM", "RF", "CAM"] },
      { id: "st", label: "ST", x: 50, y: 14, type: "FWD", allowedPositions: ["ST", "CF", "CAM"] },
    ],
  },
  "3-5-2": {
    name: "3-5-2",
    label: "3-5-2",
    slots: [
      { id: "gk", label: "GK", x: 50, y: 92, type: "GK", allowedPositions: ["GK"] },
      { id: "cb1", label: "CB", x: 50, y: 80, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "cb2", label: "CB", x: 22, y: 76, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "cb3", label: "CB", x: 78, y: 76, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "lm", label: "LM", x: 8, y: 50, type: "MID", allowedPositions: ["LM", "LW", "LB", "LWB", "CM"] },
      { id: "cm1", label: "CM", x: 30, y: 48, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "cm2", label: "CM", x: 50, y: 50, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "cm3", label: "CM", x: 70, y: 48, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "rm", label: "RM", x: 92, y: 50, type: "MID", allowedPositions: ["RM", "RW", "RB", "RWB", "CM"] },
      { id: "st1", label: "ST", x: 35, y: 16, type: "FWD", allowedPositions: ["ST", "CF", "CAM"] },
      { id: "st2", label: "ST", x: 65, y: 16, type: "FWD", allowedPositions: ["ST", "CF", "CAM"] },
    ],
  },
  "3-4-3": {
    name: "3-4-3",
    label: "3-4-3",
    slots: [
      { id: "gk", label: "GK", x: 50, y: 92, type: "GK", allowedPositions: ["GK"] },
      { id: "cb1", label: "CB", x: 50, y: 80, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "cb2", label: "CB", x: 22, y: 76, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "cb3", label: "CB", x: 78, y: 76, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "lm", label: "LM", x: 10, y: 50, type: "MID", allowedPositions: ["LM", "LW", "LB", "LWB", "CM"] },
      { id: "cm1", label: "CM", x: 35, y: 50, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "cm2", label: "CM", x: 65, y: 50, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "rm", label: "RM", x: 90, y: 50, type: "MID", allowedPositions: ["RM", "RW", "RB", "RWB", "CM"] },
      { id: "lw", label: "LW", x: 15, y: 22, type: "FWD", allowedPositions: ["LW", "LM", "LF", "ST"] },
      { id: "st", label: "ST", x: 50, y: 14, type: "FWD", allowedPositions: ["ST", "CF", "CAM"] },
      { id: "rw", label: "RW", x: 85, y: 22, type: "FWD", allowedPositions: ["RW", "RM", "RF", "ST"] },
    ],
  },
  "5-3-2": {
    name: "5-3-2",
    label: "5-3-2",
    slots: [
      { id: "gk", label: "GK", x: 50, y: 92, type: "GK", allowedPositions: ["GK"] },
      { id: "lb", label: "LWB", x: 8, y: 68, type: "DEF", allowedPositions: ["LB", "LWB", "LM", "CB"] },
      { id: "cb1", label: "CB", x: 50, y: 80, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "cb2", label: "CB", x: 24, y: 76, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "cb3", label: "CB", x: 76, y: 76, type: "DEF", allowedPositions: ["CB", "CDM"] },
      { id: "rb", label: "RWB", x: 92, y: 68, type: "DEF", allowedPositions: ["RB", "RWB", "RM", "CB"] },
      { id: "cm1", label: "CM", x: 25, y: 48, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "cm2", label: "CM", x: 50, y: 50, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "cm3", label: "CM", x: 75, y: 48, type: "MID", allowedPositions: ["CM", "CDM", "CAM"] },
      { id: "st1", label: "ST", x: 35, y: 16, type: "FWD", allowedPositions: ["ST", "CF", "CAM"] },
      { id: "st2", label: "ST", x: 65, y: 16, type: "FWD", allowedPositions: ["ST", "CF", "CAM"] },
    ],
  },
};

export const formationNames = Object.keys(formations);

export function getFormation(name: string): Formation {
  return formations[name] || formations["4-3-3"];
}

/** Check if a player can be placed in a given slot */
export function canPlacePlayer(
  playerPosition: string,
  allowedPositions: string[]
): boolean {
  return allowedPositions.includes(playerPosition);
}
