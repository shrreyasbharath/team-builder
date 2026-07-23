"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import { useTeamBuilder, type Player } from "@/hooks/useTeamBuilder";
import { canPlacePlayer } from "@/lib/formations";
import { getPositionCategory } from "@/lib/utils";

import Pitch from "@/components/Pitch";
import PlayerCard from "@/components/PlayerCard";
import { PlayerSearchInner } from "@/components/PlayerSearch";
import FormationSelector from "@/components/FormationSelector";
import TeamStats from "@/components/TeamStats";
import BudgetDisplay from "@/components/BudgetDisplay";
import TransferDialog from "@/components/TransferDialog";

export default function BuilderPage() {
  const {
    allPlayers,
    formation,
    formationSlots,
    assignments,
    totalBudget,
    budgetSpent,
    remainingBudget,
    assignPlayer,
    removePlayer,
    changeFormation,
    generateRandomTeam,
    randomFormation,
    resetTeam,
    getPlayerInSlot,
    isPlayerInTeam,
    teamStats,
  } = useTeamBuilder();

  // ── Search & filtered players ──
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(allPlayers);

  // ── Drag state ──
  const [dragOverSlotId, setDragOverSlotId] = useState<string | null>(null);
  const [draggingPlayerId, setDraggingPlayerId] = useState<string | null>(null);
  const draggedPlayerRef = useRef<string | null>(null);

  // ── Transfer dialog ──
  const [pendingTransfer, setPendingTransfer] = useState<{
    slotId: string;
    playerId: string;
    player: Player;
  } | null>(null);

  // ── Notification ──
  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);
  const notificationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = useCallback(
    (message: string, type: "error" | "success") => {
      setNotification({ message, type });
      if (notificationTimer.current) clearTimeout(notificationTimer.current);
      notificationTimer.current = setTimeout(() => setNotification(null), 3000);
    },
    []
  );

  // ── Handle drag start on player card ──
  const handleDragStart = useCallback(
    (e: React.DragEvent, playerId: string) => {
      e.dataTransfer.setData("text/plain", playerId);
      e.dataTransfer.effectAllowed = "move";
      setDraggingPlayerId(playerId);
    },
    []
  );

  // ── Handle drop on a slot ──
  const handleSlotDrop = useCallback(
    (slotId: string) => {
      setDragOverSlotId(null);
      setDraggingPlayerId(null);

      const playerId = draggedPlayerRef.current;
      if (!playerId) return;

      const player = allPlayers.find((p) => p.id === playerId);
      if (!player) return;

      const slot = formationSlots.find((s) => s.id === slotId);
      if (!slot) return;

      // Check if position is valid
      const canPlace = canPlacePlayer(player.primaryPosition, slot.allowedPositions);
      if (!canPlace) {
        showNotification(
          `${player.name} (${player.primaryPosition}) can't play in ${slot.label} position`,
          "error"
        );
        return;
      }

      // Check if already in team
      if (isPlayerInTeam(playerId)) {
        showNotification(`${player.name} is already in your team`, "error");
        return;
      }

      // Open transfer dialog
      setPendingTransfer({ slotId, playerId, player });
    },
    [allPlayers, formationSlots, isPlayerInTeam, showNotification]
  );

  // ── Handle transfer confirm ──
  const handleTransferConfirm = useCallback(
    (value: number) => {
      if (!pendingTransfer) return;
      const { slotId, playerId, player } = pendingTransfer;

      const error = assignPlayer(slotId, playerId, value);
      if (error) {
        showNotification(error, "error");
      } else {
        showNotification(
          `Signed ${player.name} for ₹${value} Cr`,
          "success"
        );
      }
      setPendingTransfer(null);
    },
    [pendingTransfer, assignPlayer, showNotification]
  );

  // ── Handle global drop events on the pitch area ──
  const handlePitchDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handlePitchGlobalDrop = useCallback((e: React.DragEvent) => {
    const playerId = e.dataTransfer.getData("text/plain");
    if (playerId) {
      draggedPlayerRef.current = playerId;
    }
    setDragOverSlotId(null);
    setDraggingPlayerId(null);
  }, []);

  // Compute which players are in team for quick lookup
  const teamPlayerIds = useMemo(
    () => new Set(assignments.map((a) => a.playerId)),
    [assignments]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ── Notification ── */}
      {notification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div
            className={`
              px-4 py-2.5 rounded-lg text-xs font-medium shadow-xl
              backdrop-blur-xl border
              ${
                notification.type === "error"
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-green-500/10 border-green-500/20 text-green-400"
              }
            `}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* ── Transfer Dialog ── */}
      {pendingTransfer && (
        <TransferDialog
          player={pendingTransfer.player}
          remainingBudget={remainingBudget}
          onConfirm={handleTransferConfirm}
          onCancel={() => setPendingTransfer(null)}
        />
      )}

      {/* ── Header ── */}
      <header className="glass sticky top-0 z-30 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="font-semibold text-sm text-white/70">Dream Team Builder</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={generateRandomTeam}
              className="
                px-3 py-1.5 rounded-lg text-[10px] font-medium
                bg-white/[0.06] text-white/50
                hover:bg-white/[0.1] hover:text-white/70
                transition-colors uppercase tracking-wider
              "
            >
              Random Team
            </button>
            <button
              onClick={resetTeam}
              className="
                px-3 py-1.5 rounded-lg text-[10px] font-medium
                bg-white/[0.06] text-white/50
                hover:bg-white/[0.1] hover:text-white/70
                transition-colors uppercase tracking-wider
              "
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* ── Left: Pitch & Controls ── */}
          <div className="space-y-4">
            {/* Formation selector */}
            <FormationSelector
              currentFormation={formation}
              onSelect={changeFormation}
              onRandom={randomFormation}
            />

            {/* Pitch */}
            <div
              onDragOver={handlePitchDragOver}
              onDrop={handlePitchGlobalDrop}
              onDragLeave={() => setDragOverSlotId(null)}
            >
              <Pitch
                slots={formationSlots}
                assignments={assignments}
                getPlayerInSlot={getPlayerInSlot}
                onSlotDrop={handleSlotDrop}
                onSlotDragOver={(slotId) => setDragOverSlotId(slotId)}
                onSlotDragLeave={() => setDragOverSlotId(null)}
                onRemovePlayer={removePlayer}
                dragOverSlotId={dragOverSlotId}
              />
            </div>
          </div>

          {/* ── Right: Side Panel ── */}
          <div className="space-y-4">
            {/* Budget */}
            <BudgetDisplay
              total={totalBudget}
              spent={budgetSpent}
              remaining={remainingBudget}
            />

            {/* Team Stats */}
            <TeamStats
              averageRating={teamStats.averageRating}
              attack={teamStats.attack}
              midfield={teamStats.midfield}
              defence={teamStats.defence}
              playersCount={teamStats.playersCount}
            />

            {/* Player Search */}
            <div className="glass rounded-xl p-4">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
                Players
              </h3>
              <PlayerSearchInner
                allPlayers={allPlayers}
                onFilteredPlayers={setFilteredPlayers}
              />
            </div>

            {/* Player List */}
            <div className="max-h-[450px] overflow-y-auto space-y-1 pr-0.5 custom-scrollbar">
              {filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  draggable={!teamPlayerIds.has(player.id)}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", player.id);
                    e.dataTransfer.effectAllowed = "move";
                    draggedPlayerRef.current = player.id;
                    setDraggingPlayerId(player.id);
                  }}
                >
                  <PlayerCard
                    player={player}
                    isInTeam={teamPlayerIds.has(player.id)}
                  />
                </div>
              ))}
              {filteredPlayers.length === 0 && (
                <div className="text-center py-8 text-xs text-white/30">
                  No players found
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
