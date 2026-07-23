"use client";

import type { Player } from "@/hooks/useTeamBuilder";
import {
  getFlagEmoji,
  getRatingColor,
  getPositionLabel,
  getPlayerImageUrl,
} from "@/lib/utils";

interface PlayerCardProps {
  player: Player;
  isSelected?: boolean;
  isInTeam?: boolean;
  isDraggable?: boolean;
  compact?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onClick?: () => void;
}

export default function PlayerCard({
  player,
  isSelected = false,
  isInTeam = false,
  isDraggable = true,
  compact = false,
  onDragStart,
  onClick,
}: PlayerCardProps) {
  const ratingColor = getRatingColor(player.rating);

  return (
    <div
      className={`
        group relative flex cursor-pointer select-none
        transition-all duration-200 ease-out
        ${
          isSelected
            ? "ring-1 ring-white/30 bg-white/[0.08]"
            : "hover:bg-white/[0.04]"
        }
        ${isInTeam ? "opacity-40 pointer-events-none" : ""}
        ${compact ? "p-2.5 gap-2.5" : "p-3 gap-3"}
        rounded-lg border border-white/[0.06]
      `}
      draggable={isDraggable && !isInTeam}
      onDragStart={(e) => {
        if (isDraggable && !isInTeam) {
          e.dataTransfer.setData("text/plain", player.id);
          e.dataTransfer.effectAllowed = "move";
          onDragStart?.(e);
        }
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      {/* Player Image */}
      <div className="relative flex-shrink-0">
        <div className={`
          overflow-hidden rounded-full
          ${compact ? "w-8 h-8" : "w-10 h-10"}
          bg-white/[0.06]
        `}>
          <img
            src={getPlayerImageUrl(player.name)}
            alt={player.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {/* Rating badge */}
        <div className={`
          absolute -bottom-1 -right-1
          flex items-center justify-center
          rounded-full bg-black/70 border border-white/10
          text-[10px] font-bold leading-none
          ${ratingColor}
          ${compact ? "w-4 h-4 text-[8px]" : "w-5 h-5"}
        `}>
          {player.rating}
        </div>
      </div>

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className={`
            font-medium truncate
            ${compact ? "text-xs" : "text-sm"}
            text-white/90
          `}>
            {player.name}
          </span>
        </div>
        <div className={`
          flex items-center gap-1.5 mt-0.5
          text-white/50
          ${compact ? "text-[10px]" : "text-xs"}
        `}>
          <span className="font-medium text-white/70">
            {getPositionLabel(player.primaryPosition)}
          </span>
          <span>·</span>
          <span>{getFlagEmoji(player.countryCode)}</span>
          <span className="truncate">{player.club}</span>
        </div>
      </div>

      {/* In team indicator */}
      {isInTeam && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
          <span className="text-[10px] text-white/60 font-medium">IN TEAM</span>
        </div>
      )}
    </div>
  );
}
