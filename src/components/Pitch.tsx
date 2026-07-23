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
  validTargetSlotIds?: Set<string>;
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
  validTargetSlotIds,
}: PitchProps) {
  return (
    <div className="relative w-full aspect-[3/4] sm:aspect-[2/3] md:aspect-[3/4] max-h-[750px] mx-auto">
      {/* Pitch background */}
      <div className="absolute inset-0 pitch-bg rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl">
        {/* Pitch markings - brighter and more visible */}
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
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.35"
          />

          {/* Center circle */}
          <circle
            cx="50"
            cy="50"
            r="14"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.35"
          />

          {/* Center line */}
          <line
            x1="4"
            y1="50"
            x2="96"
            y2="50"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.35"
          />

          {/* Center dot */}
          <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.08)" />

          {/* Penalty area top */}
          <rect
            x="22"
            y="3"
            width="56"
            height="20"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.35"
          />

          {/* Penalty area bottom */}
          <rect
            x="22"
            y="77"
            width="56"
            height="20"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.35"
          />

          {/* Goal area top */}
          <rect
            x="33"
            y="3"
            width="34"
            height="8"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.35"
          />

          {/* Goal area bottom */}
          <rect
            x="33"
            y="89"
            width="34"
            height="8"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.35"
          />

          {/* Goals */}
          <rect x="44" y="0" width="12" height="3" fill="rgba(255,255,255,0.05)" rx="0.3" />
          <rect x="44" y="97" width="12" height="3" fill="rgba(255,255,255,0.05)" rx="0.3" />

          {/* Penalty arcs */}
          <path
            d="M 30 13 A 20 20 0 0 1 70 13"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.35"
          />
          <path
            d="M 30 87 A 20 20 0 0 0 70 87"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.35"
          />

          {/* Penalty dots */}
          <circle cx="50" cy="13" r="0.6" fill="rgba(255,255,255,0.08)" />
          <circle cx="50" cy="87" r="0.6" fill="rgba(255,255,255,0.08)" />
        </svg>

        {/* Pitch label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[9px] text-white/[0.03] uppercase tracking-[0.5em] font-bold select-none">
            DREAM TEAM
          </div>
        </div>

        {/* Players count */}
        <div className="absolute top-3 left-3">
          <div className="text-[9px] text-white/[0.15] font-medium tabular-nums">
            {assignments.length}/11
          </div>
        </div>
      </div>

      {/* Player slots */}
      {slots.map((slot) => {
        const player = getPlayerInSlot(slot.id);
        const assignment = assignments.find((a) => a.slotId === slot.id);
        const isDragOver = dragOverSlotId === slot.id;
        const isValidTarget = validTargetSlotIds?.has(slot.id) ?? false;

        return (
          <PlayerSlot
            key={slot.id}
            slot={slot}
            player={player}
            transferValue={assignment?.transferValue}
            isDragOver={isDragOver}
            isValidTarget={isValidTarget}
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
