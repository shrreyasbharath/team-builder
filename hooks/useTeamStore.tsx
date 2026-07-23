"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { FormationSlot } from "@/lib/formations";
import { FORMATIONS, isValidPosition } from "@/lib/formations";
import { calculateValue } from "@/lib/utils";
import playersData from "@/data/players.json";

export interface Player {
  id: number;
  name: string;
  country: string;
  club: string;
  position: string;
  secondaryPositions: string[];
  rating: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  imageUrl?: string;
}

export interface TeamSlot {
  slotId: string;
  player: Player | null;
  transferValue: number;
}

export interface TeamStats {
  averageRating: number;
  attack: number;
  midfield: number;
  defence: number;
  totalTeamRating: number;
}

interface TeamState {
  formation: string;
  slots: TeamSlot[];
  budget: number;
  totalSpent: number;
  selectedPlayer: Player | null;
  selectedSlot: string | null;
  showTransferModal: boolean;
  transferPlayer: Player | null;
  transferSlotId: string | null;
  searchQuery: string;
  positionFilter: string;
  countryFilter: string;
  clubFilter: string;
  minRating: number;
  maxRating: number;
}

type TeamAction =
  | { type: "SET_FORMATION"; formation: string }
  | { type: "ADD_PLAYER"; slotId: string; player: Player; value: number }
  | { type: "REMOVE_PLAYER"; slotId: string }
  | { type: "OPEN_TRANSFER_MODAL"; player: Player; slotId: string }
  | { type: "CLOSE_TRANSFER_MODAL" }
  | { type: "SET_SELECTED_PLAYER"; player: Player | null }
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_POSITION_FILTER"; position: string }
  | { type: "SET_COUNTRY_FILTER"; country: string }
  | { type: "SET_CLUB_FILTER"; club: string }
  | { type: "SET_MIN_RATING"; rating: number }
  | { type: "SET_MAX_RATING"; rating: number }
  | { type: "RESET_TEAM" }
  | { type: "RANDOM_TEAM" }
  | { type: "RANDOM_FORMATION" }
  | { type: "SET_PLAYER_IMAGE"; playerId: number; imageUrl: string };

function createInitialSlots(formation: string): TeamSlot[] {
  const formationConfig = FORMATIONS[formation];
  if (!formationConfig) return [];
  return formationConfig.slots.map((slot) => ({
    slotId: slot.id,
    player: null,
    transferValue: 0,
  }));
}

function calculateStats(slots: TeamSlot[]): TeamStats {
  const players = slots
    .filter((s) => s.player !== null)
    .map((s) => s.player!);

  if (players.length === 0) {
    return {
      averageRating: 0,
      attack: 0,
      midfield: 0,
      defence: 0,
      totalTeamRating: 0,
    };
  }

  const avgRating =
    players.reduce((sum, p) => sum + p.rating, 0) / players.length;

  // Group by position type
  const defPlayers = players.filter((p) =>
    ["GK", "LB", "RB", "CB", "LWB", "RWB"].includes(p.position)
  );
  const midPlayers = players.filter((p) =>
    ["CDM", "CM", "CAM", "LM", "RM"].includes(p.position)
  );
  const fwdPlayers = players.filter((p) =>
    ["LW", "RW", "ST", "CF"].includes(p.position)
  );

  const attack =
    fwdPlayers.length > 0
      ? Math.round(
          fwdPlayers.reduce((sum, p) => sum + (p.rating + p.shooting + p.pace + p.dribbling) / 4, 0) /
            fwdPlayers.length
        )
      : 0;

  const midfield =
    midPlayers.length > 0
      ? Math.round(
          midPlayers.reduce((sum, p) => sum + (p.rating + p.passing + p.dribbling + p.physical) / 4, 0) /
            midPlayers.length
        )
      : 0;

  const defence =
    defPlayers.length > 0
      ? Math.round(
          defPlayers.reduce(
            (sum, p) =>
              sum +
              (p.position === "GK"
                ? (p.rating + p.defending + p.physical) / 3
                : (p.rating + p.defending + p.physical + p.pace) / 4),
            0
          ) / defPlayers.length
        )
      : 0;

  const totalTeamRating = Math.round(avgRating * players.length);

  return {
    averageRating: Math.round(avgRating * 10) / 10,
    attack,
    midfield,
    defence,
    totalTeamRating,
  };
}

function teamReducer(state: TeamState, action: TeamAction): TeamState {
  switch (action.type) {
    case "SET_FORMATION": {
      const newSlots = createInitialSlots(action.formation);
      return {
        ...state,
        formation: action.formation,
        slots: newSlots,
        totalSpent: 0,
        budget: 500,
      };
    }

    case "ADD_PLAYER": {
      const newSlots = state.slots.map((slot) =>
        slot.slotId === action.slotId
          ? { ...slot, player: action.player, transferValue: action.value }
          : slot
      );
      // Remove any other slot with same player
      const filteredSlots = newSlots.map((slot) =>
        slot.player?.id === action.player.id && slot.slotId !== action.slotId
          ? { ...slot, player: null, transferValue: 0 }
          : slot
      );
      const newSpent = filteredSlots.reduce(
        (sum, slot) => sum + slot.transferValue,
        0
      );
      return {
        ...state,
        slots: filteredSlots,
        totalSpent: newSpent,
        budget: 500 - newSpent,
        showTransferModal: false,
        transferPlayer: null,
        transferSlotId: null,
      };
    }

    case "REMOVE_PLAYER": {
      const newSlots = state.slots.map((slot) =>
        slot.slotId === action.slotId
          ? { ...slot, player: null, transferValue: 0 }
          : slot
      );
      const newSpent = newSlots.reduce(
        (sum, slot) => sum + slot.transferValue,
        0
      );
      return {
        ...state,
        slots: newSlots,
        totalSpent: newSpent,
        budget: 500 - newSpent,
      };
    }

    case "OPEN_TRANSFER_MODAL":
      return {
        ...state,
        showTransferModal: true,
        transferPlayer: action.player,
        transferSlotId: action.slotId,
      };

    case "CLOSE_TRANSFER_MODAL":
      return {
        ...state,
        showTransferModal: false,
        transferPlayer: null,
        transferSlotId: null,
      };

    case "SET_SELECTED_PLAYER":
      return { ...state, selectedPlayer: action.player };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query };

    case "SET_POSITION_FILTER":
      return { ...state, positionFilter: action.position };

    case "SET_COUNTRY_FILTER":
      return { ...state, countryFilter: action.country };

    case "SET_CLUB_FILTER":
      return { ...state, clubFilter: action.club };

    case "SET_MIN_RATING":
      return { ...state, minRating: action.rating };

    case "SET_MAX_RATING":
      return { ...state, maxRating: action.rating };

    case "RESET_TEAM": {
      const newSlots = createInitialSlots(state.formation);
      return {
        ...state,
        slots: newSlots,
        budget: 500,
        totalSpent: 0,
        showTransferModal: false,
        transferPlayer: null,
        transferSlotId: null,
      };
    }

    case "RANDOM_TEAM": {
      const formationConfig = FORMATIONS[state.formation];
      if (!formationConfig) return state;

      const available = [...playersData];
      const newSlots = formationConfig.slots.map((slot) => {
        // Find a valid player not already used
        const idx = available.findIndex((p) =>
          isValidPosition(p.position, p.secondaryPositions, slot.position)
        );
        if (idx === -1) return { slotId: slot.id, player: null, transferValue: 0 };
        const [player] = available.splice(idx, 1);
        const value = calculateValue(player.rating);
        return { slotId: slot.id, player, transferValue: value };
      });

      const newSpent = newSlots.reduce(
        (sum, slot) => sum + slot.transferValue,
        0
      );
      return {
        ...state,
        slots: newSlots,
        totalSpent: newSpent,
        budget: 500 - newSpent,
        showTransferModal: false,
        transferPlayer: null,
        transferSlotId: null,
      };
    }

    case "RANDOM_FORMATION": {
      const formations = Object.keys(FORMATIONS);
      const randomFormation =
        formations[Math.floor(Math.random() * formations.length)];
      const newSlots = createInitialSlots(randomFormation);
      return {
        ...state,
        formation: randomFormation,
        slots: newSlots,
        budget: 500,
        totalSpent: 0,
        showTransferModal: false,
        transferPlayer: null,
        transferSlotId: null,
      };
    }

    case "SET_PLAYER_IMAGE": {
      return state;
    }

    default:
      return state;
  }
}

const initialState: TeamState = {
  formation: "4-3-3",
  slots: createInitialSlots("4-3-3"),
  budget: 500,
  totalSpent: 0,
  selectedPlayer: null,
  selectedSlot: null,
  showTransferModal: false,
  transferPlayer: null,
  transferSlotId: null,
  searchQuery: "",
  positionFilter: "",
  countryFilter: "",
  clubFilter: "",
  minRating: 0,
  maxRating: 99,
};

interface TeamContextType {
  state: TeamState;
  stats: TeamStats;
  dispatch: React.Dispatch<TeamAction>;
}

const TeamContext = createContext<TeamContextType | null>(null);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(teamReducer, initialState);

  const stats = useMemo(() => calculateStats(state.slots), [state.slots]);

  const value = useMemo(() => ({ state, stats, dispatch }), [state, stats]);

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
}

export function useTeam() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeam must be used within TeamProvider");
  return ctx;
}
