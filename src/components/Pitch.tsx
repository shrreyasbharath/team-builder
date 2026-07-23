"use client";

import type { PositionSlot } from "@/lib/formations";
import type { Player, SlotAssignment } from "@/hooks/useTeamBuilder";
import PlayerSlot from "./PlayerSlot";

interface PitchProps {
  slots: PositionSlot[];
  assignments: SlotAssignment[];
  getPlayerInSlot: (slotId: string) => Player | undefined;
  onSlotDrop?: (slotId: string) => void;
  onSlotDragOver?: (slotId: string) => void;
  onSlotDragLeave?: (slotId: string) => void;
  onRemovePlayer: (slotId: string) => void;
  dragOverSlotId?: string | null;
}

export default function Pitch({
  slots,
  assignments,
  getPlayerInSlot,
  onSlotDrop,
  onSlotDragOver,
  onSlotDragLeave,
  onRemovePlayer,
  dragOverSlotId,
}: PitchProps) {
  return (
    <div className="relative w-full aspect-[3/4] max-h-[700px] mx-auto">
      {/* Pitch background */}
      <div className="absolute inset-0 pitch-bg rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl">
        {/* Pitch markings */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Outer border */}
          <rect
            x="4"
            y="3"
            width="92"
            height="94"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.3"
          />

          {/* Center circle */}
          <circle
            cx="50"
            cy="50"
            r="12"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.3"
          />

          {/* Center line */}
          <line
            x1="4"
            y1="50"
            x2="96"
            y2="50"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.3"
          />

          {/* Center dot */}
          <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.06)" />

          {/* Penalty area top */}
          <rect
            x="25"
            y="3"
            width="50"
            height="18"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.3"
          />

          {/* Penalty area bottom */}
          <rect
            x="25"
            y="79"
            width="50"
            height="18"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.3"
          />

          {/* Goal area top */}
          <rect
            x="35"
            y="3"
            width="30"
            height="8"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.3"
          />

          {/* Goal area bottom */}
          <rect
            x="35"
            y="89"
            width="30"
            height="8"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.3"
          />

          {/* Goals */}
          <rect x="42" y="0" width="16" height="3" fill="rgba(255,255,255,0.04)" rx="0.3" />
          <rect x="42" y="97" width="16" height="3" fill="rgba(255,255,255,0.04)" rx="0.3" />

          {/* Penalty dots */}
          <circle cx="50" cy="13" r="0.6" fill="rgba(255,255,255,0.06)" />
          <circle cx="50" cy="87" r="0.6" fill="rgba(255,255,255,0.06)" />
        </svg>

        {/* Number of players placed */}
        <div className="absolute top-3 left-3">
          <div className="text-[10px] text-white/20 font-medium">
            {assignments.length}/11
          </div>
        </div>

        {/* Pitch label */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <div className="text-[8px] text-white/[0.07] uppercase tracking-[0.3em] font-medium">
            Dream Team
          </div>
        </div>
      </div>

      {/* Player slots */}
      {slots.map((slot) => {
        const player = getPlayerInSlot(slot.id);
        const assignment = assignments.find((a) => a.slotId === slot.id);
        const isDragOver = dragOverSlotId === slot.id;

        return (
          <PlayerSlot
            key={slot.id}
            slot={slot}
            player={player}
            transferValue={assignment?.transferValue}
            isDragOver={isDragOver}
            onDrop={() => onSlotDrop?.(slot.id)}
            onDragOver={() => onSlotDragOver?.(slot.id)}
            onDragLeave={() => onSlotDragLeave?.(slot.id)}
            onRemove={() => onRemovePlayer(slot.id)}
          />
        );
      })}
    </div>
  );
}
