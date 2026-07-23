"use client";

import { useCallback, type DragEvent } from "react";
import type { Player, TeamSlot } from "@/hooks/useTeamStore";
import { getPositionHex, formatCurrency } from "@/lib/utils";
import { isValidPosition } from "@/lib/formations";

interface PlayerSlotProps {
  slot: TeamSlot;
  slotX: number;
  slotY: number;
  slotPosition: string;
  slotLabel: string;
  onDrop: (slotId: string, player: Player) => void;
  onRemove: (slotId: string) => void;
  playerImageUrl?: string;
}

export default function PlayerSlot({
  slot,
  slotX,
  slotY,
  slotPosition,
  slotLabel,
  onDrop,
  onRemove,
  playerImageUrl,
}: PlayerSlotProps) {
  const posColor = getPositionHex(slotPosition);
  const hasPlayer = slot.player !== null;
  const player = slot.player;

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (hasPlayer) return;
      try {
        const data = e.dataTransfer.getData("application/json");
        const player: Player = JSON.parse(data);
        if (isValidPosition(player.position, player.secondaryPositions, slotPosition)) {
          onDrop(slot.slotId, player);
        }
      } catch {
        /* ignore */
      }
    },
    [hasPlayer, slot.slotId, slotPosition, onDrop]
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove(slot.slotId);
    },
    [slot.slotId, onRemove]
  );

  const initials = player?.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${slotX}%`, top: `${slotY}%` }}
    >
      {hasPlayer && player ? (
        <div className="group relative flex flex-col items-center">
          {/* Player circle */}
          <div
            className="relative w-16 h-16 rounded-full flex items-center justify-center
              bg-card/90 backdrop-blur-sm border-2 cursor-pointer
              transition-all duration-200 hover:scale-105
              shadow-lg shadow-black/20"
            style={{ borderColor: posColor }}
          >
            {playerImageUrl ? (
              <img
                src={playerImageUrl}
                alt={player.name}
                className="w-12 h-12 rounded-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="text-[10px] font-bold text-center leading-tight">
                {initials}
              </div>
            )}

            {/* Rating badge */}
            <div
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center
                text-[10px] font-bold border-2"
              style={{
                backgroundColor: posColor,
                borderColor: "var(--card)",
                color: "#000",
              }}
            >
              {player.rating}
            </div>

            {/* Remove button */}
            <button
              onClick={handleRemove}
              className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-destructive
                flex items-center justify-center opacity-0 group-hover:opacity-100
                transition-opacity text-destructive-foreground text-xs font-bold"
            >
              ×
            </button>
          </div>

          {/* Player name */}
          <div className="mt-1 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm">
            <div className="text-[10px] font-semibold text-white truncate max-w-[80px] text-center">
              {player.name}
            </div>
            <div className="text-[8px] text-white/70 text-center">
              {formatCurrency(slot.transferValue)}
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="relative w-16 h-16 rounded-full flex flex-col items-center justify-center
            border-2 border-dashed cursor-pointer
            transition-all duration-200
            bg-black/30 backdrop-blur-sm hover:bg-black/40 hover:border-solid"
          style={{ borderColor: `${posColor}66` }}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: posColor }}
          >
            {slotLabel}
          </span>
          <span className="text-[8px] text-white/50 mt-0.5">Drop</span>
        </div>
      )}
    </div>
  );
}
