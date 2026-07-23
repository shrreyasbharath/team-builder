"use client";

import type { Player } from "@/hooks/useTeamBuilder";
import type { PositionSlot } from "@/lib/formations";
import { getPlayerImageUrl, getPositionLabel, getRatingColor } from "@/lib/utils";

interface PlayerSlotProps {
  slot: PositionSlot;
  player?: Player;
  transferValue?: number;
  isDragOver?: boolean;
  onDrop?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onRemove?: () => void;
}

export default function PlayerSlot({
  slot,
  player,
  isDragOver = false,
  onDrop,
  onDragOver,
  onDragLeave,
  onRemove,
}: PlayerSlotProps) {
  const isEmpty = !player;

  return (
    <div
      className="absolute"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        onDragOver?.(e);
      }}
      onDragLeave={onDragLeave}
    >
      <div
        className={`
          relative flex flex-col items-center transition-all duration-200
          ${isEmpty ? "cursor-pointer" : "cursor-default"}
        `}
      >
        {/* Slot circle or player avatar */}
        <div
          className={`
            relative flex items-center justify-center
            rounded-full transition-all duration-200
            ${
              isEmpty
                ? `w-10 h-10 border-2 border-dashed border-white/[0.15] 
                   bg-white/[0.04] hover:border-white/[0.3] hover:bg-white/[0.08]`
                : "w-11 h-11"
            }
            ${isDragOver ? "!border-white/50 !bg-white/[0.12] scale-110" : ""}
          `}
        >
          {isEmpty ? (
            <span className="text-[9px] font-semibold text-white/[0.3] tracking-wider uppercase">
              {slot.label}
            </span>
          ) : (
            <>
              <img
                src={getPlayerImageUrl(player.name)}
                alt={player.name}
                className="w-full h-full rounded-full object-cover ring-2 ring-white/[0.15]"
              />
              {/* Rating badge */}
              <div
                className={`
                  absolute -bottom-0.5 -right-0.5
                  w-4.5 h-4.5 rounded-full
                  flex items-center justify-center
                  text-[9px] font-bold leading-none
                  bg-black/80 border border-white/[0.12]
                  ${getRatingColor(player.rating)}
                `}
              >
                {player.rating}
              </div>
              {/* Remove button */}
              <button
                className="
                  absolute -top-1 -right-1
                  w-4 h-4 rounded-full
                  bg-red-500/80 hover:bg-red-500
                  flex items-center justify-center
                  text-white text-[9px] font-bold
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-150
                  shadow-lg
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

        {/* Position label below */}
        {isEmpty && (
          <span className="mt-1 text-[8px] tracking-widest uppercase text-white/[0.2] font-medium">
            {slot.label}
          </span>
        )}
      </div>
    </div>
  );
}
