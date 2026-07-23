"use client";

import type { Player } from "@/hooks/useTeamBuilder";
import type { PositionSlot } from "@/lib/formations";
import { getPlayerImageUrl, getRatingColor, getPositionLabel, formatCrore } from "@/lib/utils";

interface PlayerSlotProps {
  slot: PositionSlot;
  player?: Player;
  transferValue?: number;
  isDragOver?: boolean;
  isValidTarget?: boolean;
  onDrop?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onRemove?: () => void;
}

export default function PlayerSlot({
  slot,
  player,
  transferValue,
  isDragOver = false,
  isValidTarget = false,
  onDrop,
  onDragOver,
  onDragLeave,
  onRemove,
}: PlayerSlotProps) {
  const isEmpty = !player;

  return (
    <div
      className="absolute group"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDrop?.(e);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
        onDragOver?.(e);
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        onDragLeave?.(e);
      }}
    >
      <div className="flex flex-col items-center gap-1">
        {/* Slot / Avatar container */}
        <div
          className={`
            relative flex items-center justify-center
            rounded-full transition-all duration-200 ease-out
            ${isEmpty ? "w-11 h-11" : "w-12 h-12"}
            ${
              isEmpty
                ? `border-2 border-dashed 
                   ${
                     isValidTarget
                       ? "border-green-500/40 bg-green-500/10 scale-110"
                       : isDragOver
                       ? "border-white/40 bg-white/[0.1] scale-110"
                       : "border-white/[0.12] bg-white/[0.03]"
                   }`
                : ""
            }
            ${isDragOver && !isEmpty ? "ring-2 ring-red-500/40" : ""}
            ${!isEmpty ? "shadow-lg" : ""}
          `}
        >
          {isEmpty ? (
            <>
              <span className={`
                text-[10px] font-semibold tracking-widest uppercase
                ${isValidTarget ? "text-green-400/60" : "text-white/[0.25]"}
              `}>
                {slot.label}
              </span>
              {/* Glow effect on valid target */}
              {isValidTarget && (
                <div className="absolute inset-0 rounded-full bg-green-500/5 animate-pulse" />
              )}
            </>
          ) : (
            <>
              <img
                src={getPlayerImageUrl(player.name)}
                alt={player.name}
                className="w-full h-full rounded-full object-cover ring-2 ring-white/[0.15]"
                draggable={false}
              />
              {/* Rating badge */}
              <div
                className={`
                  absolute -bottom-0.5 -right-0.5
                  w-[18px] h-[18px] rounded-full
                  flex items-center justify-center
                  text-[9px] font-bold leading-none
                  bg-black/80 border border-white/[0.15]
                  shadow-lg
                  ${getRatingColor(player.rating)}
                `}
              >
                {player.rating}
              </div>
              {/* Remove button */}
              <button
                className="
                  absolute -top-1 -right-1
                  w-[15px] h-[15px] rounded-full
                  bg-red-500/90 hover:bg-red-500
                  flex items-center justify-center
                  text-white text-[9px] font-bold
                  opacity-0 group-hover:opacity-100
                  transition-all duration-150
                  shadow-lg hover:scale-110
                "
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.();
                }}
                title="Remove player"
              >
                ×
              </button>
            </>
          )}
        </div>

        {/* Player name / Position label */}
        {isEmpty ? (
          <span className={`
            text-[8px] tracking-widest uppercase font-medium
            ${isValidTarget ? "text-green-400/40" : "text-white/[0.15]"}
          `}>
            {slot.label}
          </span>
        ) : (
          <div className="text-center">
            <div className="text-[9px] font-medium text-white/80 leading-tight max-w-[80px] truncate drop-shadow-lg">
              {player.name}
            </div>
            {transferValue !== undefined && transferValue > 0 && (
              <div className="text-[7px] text-white/40 leading-tight">
                {formatCrore(transferValue)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
