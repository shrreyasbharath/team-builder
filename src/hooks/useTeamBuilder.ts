"use client";

import { useState, useCallback, useMemo } from "react";
import playersData from "@/data/players.json";
import { getFormation, canPlacePlayer, type PositionSlot } from "@/lib/formations";
import { average, shuffle, getPositionCategory } from "@/lib/utils";

export type Player = (typeof playersData.players)[number];

const TOTAL_BUDGET = 500;

export interface SlotAssignment {
  slotId: string;
  playerId: string;
  transferValue: number;
}

export function useTeamBuilder() {
  const allPlayers = playersData.players;

  const [formation, setFormation] = useState<string>("4-3-3");
  const [assignments, setAssignments] = useState<SlotAssignment[]>([]);
  const [budgetSpent, setBudgetSpent] = useState(0);
  const [formationChangeKey, setFormationChangeKey] = useState(0);

  const currentFormation = useMemo(() => getFormation(formation), [formation]);
  const formationSlots = currentFormation.slots;

  // ── Budget calculations ──
  const remainingBudget = useMemo(
    () => TOTAL_BUDGET - budgetSpent,
    [budgetSpent]
  );

  // ── Get player assigned to a slot ──
  const getPlayerInSlot = useCallback(
    (slotId: string): Player | undefined => {
      const assignment = assignments.find((a) => a.slotId === slotId);
      if (!assignment) return undefined;
      return allPlayers.find((p) => p.id === assignment.playerId);
    },
    [assignments, allPlayers]
  );

  // ── Check if a player is already in the team ──
  const isPlayerInTeam = useCallback(
    (playerId: string): boolean => {
      return assignments.some((a) => a.playerId === playerId);
    },
    [assignments]
  );

  // ── Assign player to slot with transfer value ──
  const assignPlayer = useCallback(
    (slotId: string, playerId: string, transferValue: number): string | null => {
      const player = allPlayers.find((p) => p.id === playerId);
      if (!player) return "Player not found";

      const slot = formationSlots.find((s) => s.id === slotId);
      if (!slot) return "Slot not found";

      // Check if player can be placed in this slot
      const canPlace = canPlacePlayer(player.primaryPosition, slot.allowedPositions);
      if (!canPlace) return `Invalid position: ${player.name} (${player.primaryPosition}) cannot play in ${slot.label} slot`;

      // Check if player is already in team
      if (isPlayerInTeam(playerId)) {
        return `${player.name} is already in your team`;
      }

      // Check budget
      if (transferValue > remainingBudget) {
        return `Insufficient budget! Need ₹${transferValue} Cr but only ₹${remainingBudget} Cr remaining`;
      }

      // Remove existing player from this slot if any
      const existingAssignment = assignments.find((a) => a.slotId === slotId);
      const existingCost = existingAssignment ? existingAssignment.transferValue : 0;

      setAssignments((prev) => [
        ...prev.filter((a) => a.slotId !== slotId),
        { slotId, playerId, transferValue },
      ]);

      setBudgetSpent((prev) => prev - existingCost + transferValue);
      return null; // success
    },
    [allPlayers, formationSlots, isPlayerInTeam, remainingBudget, assignments]
  );

  // ── Remove player from slot ──
  const removePlayer = useCallback(
    (slotId: string) => {
      const assignment = assignments.find((a) => a.slotId === slotId);
      if (assignment) {
        setBudgetSpent((prev) => prev - assignment.transferValue);
        setAssignments((prev) => prev.filter((a) => a.slotId !== slotId));
      }
    },
    [assignments]
  );

  // ── Change formation (clear invalid assignments) ──
  const changeFormation = useCallback(
    (newFormation: string) => {
      setFormation(newFormation);
      const newSlots = getFormation(newFormation).slots;

      // Keep only assignments that are valid in the new formation
      setAssignments((prev) => {
        const validAssignments = prev.filter((a) => {
          const slot = newSlots.find((s) => s.id === a.slotId);
          if (!slot) return false;
          const player = allPlayers.find((p) => p.id === a.playerId);
          if (!player) return false;
          return canPlacePlayer(player.primaryPosition, slot.allowedPositions);
        });
        return validAssignments;
      });
      setFormationChangeKey((k) => k + 1);
    },
    [allPlayers]
  );

  // ── Random team (auto-fill all slots with affordable random valid players) ──
  const generateRandomTeam = useCallback(() => {
    const shuffled = shuffle(allPlayers);
    let remaining = TOTAL_BUDGET;
    const newAssignments: SlotAssignment[] = [];
    const usedPlayerIds = new Set<string>();

    for (const slot of formationSlots) {
      if (newAssignments.length >= 11) break;

      // Find a player who fits this slot and is affordable
      const affordablePlayer = shuffled.find(
        (p) =>
          !usedPlayerIds.has(p.id) &&
          canPlacePlayer(p.primaryPosition, slot.allowedPositions) &&
          p.price <= remaining
      );

      if (affordablePlayer) {
        newAssignments.push({
          slotId: slot.id,
          playerId: affordablePlayer.id,
          transferValue: affordablePlayer.price,
        });
        usedPlayerIds.add(affordablePlayer.id);
        remaining -= affordablePlayer.price;
      }
    }

    setAssignments(newAssignments);
    setBudgetSpent(TOTAL_BUDGET - remaining);
  }, [allPlayers, formationSlots]);

  // ── Random formation ──
  const randomFormation = useCallback(() => {
    const formations = ["4-3-3", "4-4-2", "4-2-3-1", "3-5-2", "3-4-3", "5-3-2"];
    const random = formations[Math.floor(Math.random() * formations.length)];
    changeFormation(random);
  }, [changeFormation]);

  // ── Reset team ──
  const resetTeam = useCallback(() => {
    setAssignments([]);
    setBudgetSpent(0);
  }, []);

  // ── Team statistics ──
  const teamStats = useMemo(() => {
    const assignedPlayers = assignments
      .map((a) => allPlayers.find((p) => p.id === a.playerId))
      .filter((p): p is Player => p !== undefined);

    if (assignedPlayers.length === 0) {
      return {
        averageRating: 0,
        attack: 0,
        midfield: 0,
        defence: 0,
        totalRating: 0,
        playersCount: 0,
      };
    }

    const avgRating = average(assignedPlayers.map((p) => p.rating));
    const totalRating = assignedPlayers.reduce((sum, p) => sum + p.rating, 0);

    // Calculate attack/midfield/defence based on player positions
    const defenders = assignedPlayers.filter(
      (p) => getPositionCategory(p.primaryPosition) === "DEF"
    );
    const midfielders = assignedPlayers.filter(
      (p) => getPositionCategory(p.primaryPosition) === "MID"
    );
    const forwards = assignedPlayers.filter(
      (p) => getPositionCategory(p.primaryPosition) === "FWD"
    );
    const gk = assignedPlayers.find(
      (p) => getPositionCategory(p.primaryPosition) === "GK"
    );

    // Attack = average of forwards' shooting + dribbling
    const attackScore =
      forwards.length > 0
        ? average(forwards.flatMap((f) => [f.shooting, f.dribbling]))
        : 0;

    // Midfield = average of midfielders' passing + dribbling
    const midfieldScore =
      midfielders.length > 0
        ? average(midfielders.flatMap((m) => [m.passing, m.dribbling, m.physical]))
        : 0;

    // Defence = average of defenders' defending + physical + GK rating if present
    const defValues = defenders.flatMap((d) => [d.defending, d.physical]);
    if (gk) {
      defValues.push(gk.defending);
      defValues.push(gk.physical);
    }
    const defenceScore =
      defValues.length > 0 ? average(defValues) : 0;

    return {
      averageRating: avgRating,
      attack: attackScore,
      midfield: midfieldScore,
      defence: defenceScore,
      totalRating,
      playersCount: assignedPlayers.length,
    };
  }, [assignments, allPlayers]);

  return {
    // State
    allPlayers,
    formation,
    formationSlots,
    assignments,
    totalBudget: TOTAL_BUDGET,
    budgetSpent,
    remainingBudget,
    formationChangeKey,

    // Actions
    assignPlayer,
    removePlayer,
    changeFormation,
    generateRandomTeam,
    randomFormation,
    resetTeam,

    // Queries
    getPlayerInSlot,
    isPlayerInTeam,
    teamStats,
  };
}
