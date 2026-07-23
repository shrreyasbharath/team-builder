"use client";

import { useRef, useCallback, type DragEvent } from "react";
import type { Player } from "@/hooks/useTeamStore";
import { getPositionColor, getPositionHex } from "@/lib/utils";

interface PlayerCardProps {
  player: Player;
  imageUrl?: string;
  onDragStart?: (player: Player) => void;
  onClick?: (player: Player) => void;
  selected?: boolean;
  compact?: boolean;
}

export default function PlayerCard({
  player,
  imageUrl,
  onDragStart,
  onClick,
  selected = false,
  compact = false,
}: PlayerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData(
        "application/json",
        JSON.stringify(player)
      );
      e.dataTransfer.effectAllowed = "copy";
      onDragStart?.(player);
    },
    [player, onDragStart]
  );

  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const posColor = getPositionHex(player.position);

  if (compact) {
    return (
      <div
        ref={cardRef}
        draggable
        onDragStart={handleDragStart}
        onClick={() => onClick?.(player)}
        className={`
          group relative flex items-center gap-2 p-2 rounded-lg cursor-grab
          active:cursor-grabbing select-none
          bg-card border transition-all duration-200
          ${
            selected
              ? "border-ring shadow-lg shadow-white/5"
              : "border-border hover:border-ring/50 hover:bg-card-hover"
          }
        `}
      >
        {/* Player image */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-secondary">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={player.name}
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] font-semibold text-muted-foreground">
              {initials}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate">{player.name}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="text-[10px] font-bold px-1 py-0.5 rounded"
              style={{ color: posColor, borderColor: posColor }}
            >
              {player.position}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {player.club}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div className="text-sm font-bold tabular-nums">{player.rating}</div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick?.(player)}
      className={`
        group relative overflow-hidden rounded-xl cursor-grab
        active:cursor-grabbing select-none
        bg-card border transition-all duration-300
        ${
          selected
            ? "border-ring shadow-lg shadow-white/5"
            : "border-border hover:border-ring/50 hover:shadow-lg hover:-translate-y-0.5"
        }
      `}
    >
      {/* Top gradient bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: posColor }}
      />

      <div className="p-3">
        {/* Player image */}
        <div className="relative w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden bg-secondary">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={player.name}
              className="w-full h-full object-cover"
              draggable={false}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-muted-foreground">
              {initials}
            </div>
          )}
        </div>

        {/* Name & Rating */}
        <div className="text-center">
          <div className="text-xs font-semibold truncate">{player.name}</div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded border"
              style={{ color: posColor, borderColor: posColor }}
            >
              {player.position}
            </span>
            <span className="text-base font-bold tabular-nums">
              {player.rating}
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-1 mt-2 pt-2 border-t border-border/50">
          {[
            { label: "PAC", value: player.pace },
            { label: "SHO", value: player.shooting },
            { label: "PAS", value: player.passing },
            { label: "DRI", value: player.dribbling },
            { label: "DEF", value: player.defending },
            { label: "PHY", value: player.physical },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[9px] text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-[11px] font-bold tabular-nums">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Country & Club */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50 text-[9px] text-muted-foreground">
          <span>{player.country}</span>
          <span className="truncate ml-1">{player.club}</span>
        </div>
      </div>
    </div>
  );
}
