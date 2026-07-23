import { useState, useCallback, useRef, useMemo } from "react";
import { Link } from "react-router";
import { useTeamBuilder, type Player } from "@/hooks/useTeamBuilder";
import { canPlacePlayer } from "@/lib/formations";

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

  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(allPlayers);
  const [dragOverSlotId, setDragOverSlotId] = useState<string | null>(null);
  const [draggedPlayer, setDraggedPlayer] = useState<Player | null>(null);
  const [pendingTransfer, setPendingTransfer] = useState<{
    slotId: string;
    playerId: string;
    player: Player;
  } | null>(null);

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

  const validTargetSlotIds = useMemo<Set<string>>(() => {
    if (!draggedPlayer) return new Set();
    const valid = new Set<string>();
    for (const slot of formationSlots) {
      if (canPlacePlayer(draggedPlayer.primaryPosition, slot.allowedPositions)) {
        valid.add(slot.id);
      }
    }
    return valid;
  }, [draggedPlayer, formationSlots]);

  const handlePlayerDragStart = useCallback(
    (e: React.DragEvent, player: Player) => {
      e.dataTransfer.setData("text/plain", player.id);
      e.dataTransfer.effectAllowed = "move";
      setDraggedPlayer(player);
    },
    []
  );

  const handleSlotDrop = useCallback(
    (slotId: string) => {
      setDragOverSlotId(null);
      const player = draggedPlayer;
      if (!player) return;

      const slot = formationSlots.find((s) => s.id === slotId);
      if (!slot) return;

      const canPlace = canPlacePlayer(player.primaryPosition, slot.allowedPositions);
      if (!canPlace) {
        showNotification(`${player.name} (${player.primaryPosition}) can't play in ${slot.label} position`, "error");
        setDraggedPlayer(null);
        return;
      }
      if (isPlayerInTeam(player.id)) {
        showNotification(`${player.name} is already in your team`, "error");
        setDraggedPlayer(null);
        return;
      }
      setPendingTransfer({ slotId, playerId: player.id, player });
    },
    [draggedPlayer, formationSlots, isPlayerInTeam, showNotification]
  );

  const handleTransferConfirm = useCallback(
    (value: number) => {
      if (!pendingTransfer) return;
      const { slotId, playerId, player } = pendingTransfer;
      const error = assignPlayer(slotId, playerId, value);
      if (error) {
        showNotification(error, "error");
      } else {
        showNotification(`Signed ${player.name} for ₹${value} Cr`, "success");
      }
      setPendingTransfer(null);
      setDraggedPlayer(null);
    },
    [pendingTransfer, assignPlayer, showNotification]
  );

  const handleDragEnd = useCallback(() => {
    setDragOverSlotId(null);
    setDraggedPlayer(null);
  }, []);

  const teamPlayerIds = useMemo(
    () => new Set(assignments.map((a) => a.playerId)),
    [assignments]
  );

  return (
    <div className="min-h-screen bg-background" onDragEnd={handleDragEnd}>
      {/* Notification */}
      {notification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div
            className={`px-6 py-3 rounded-xl text-sm font-medium shadow-2xl backdrop-blur-xl border ${
              notification.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-green-500/10 border-green-500/20 text-green-400"
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* Transfer Dialog */}
      {pendingTransfer && (
        <TransferDialog
          player={pendingTransfer.player}
          remainingBudget={remainingBudget}
          onConfirm={handleTransferConfirm}
          onCancel={() => { setPendingTransfer(null); setDraggedPlayer(null); }}
        />
      )}

      {/* Header */}
      <header className="glass sticky top-0 z-30 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="font-semibold text-base text-white/80">Dream Team Builder</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => { generateRandomTeam(); showNotification("Random team generated!", "success"); }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 text-white/60 hover:bg-white/15 hover:text-white/80 transition-all duration-200 uppercase tracking-wider"
            >
              Random Team
            </button>
            <button
              onClick={() => { resetTeam(); showNotification("Team reset", "success"); }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 text-white/60 hover:bg-white/15 hover:text-white/80 transition-all duration-200 uppercase tracking-wider"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: Pitch & Controls */}
          <div className="space-y-6">
            <FormationSelector currentFormation={formation} onSelect={changeFormation} onRandom={randomFormation} />
            <Pitch
              slots={formationSlots}
              assignments={assignments}
              getPlayerInSlot={getPlayerInSlot}
              onSlotDrop={handleSlotDrop}
              onSlotDragOver={(slotId) => setDragOverSlotId(slotId)}
              onSlotDragLeave={() => setDragOverSlotId(null)}
              onRemovePlayer={removePlayer}
              dragOverSlotId={dragOverSlotId}
              validTargetSlotIds={validTargetSlotIds}
            />
          </div>

          {/* Right: Side Panel */}
          <div className="space-y-5">
            <BudgetDisplay total={totalBudget} spent={budgetSpent} remaining={remainingBudget} />
            <TeamStats
              averageRating={teamStats.averageRating}
              attack={teamStats.attack}
              midfield={teamStats.midfield}
              defence={teamStats.defence}
              playersCount={teamStats.playersCount}
            />

            <div className="glass rounded-xl p-5">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Players</h3>
              <PlayerSearchInner allPlayers={allPlayers} onFilteredPlayers={setFilteredPlayers} />
            </div>

            <div className="max-h-[540px] overflow-y-auto space-y-1.5 pr-1" onDragEnd={handleDragEnd}>
              {filteredPlayers.map((player) => (
                <div
                  key={player.id}
                  draggable={!teamPlayerIds.has(player.id)}
                  onDragStart={(e) => handlePlayerDragStart(e, player)}
                >
                  <PlayerCard player={player} isInTeam={teamPlayerIds.has(player.id)} isDraggable={!teamPlayerIds.has(player.id)} />
                </div>
              ))}
              {filteredPlayers.length === 0 && (
                <div className="text-center py-12 text-sm text-white/30">No players found</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
