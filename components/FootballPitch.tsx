"use client";

import { useCallback } from "react";
import { useTeam } from "@/hooks/useTeamStore";
import { FORMATIONS } from "@/lib/formations";
import type { Player } from "@/hooks/useTeamStore";
import PlayerSlot from "./PlayerSlot";
import { loadImageCacheFromStorage } from "@/lib/thesportsdb";

// Load cache on module init
loadImageCacheFromStorage();

export default function FootballPitch() {
  const { state, dispatch } = useTeam();
  const formationConfig = FORMATIONS[state.formation];

  if (!formationConfig) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
        Select a formation
      </div>
    );
  }

  const handleDrop = useCallback(
    (slotId: string, player: Player) => {
      dispatch({ type: "OPEN_TRANSFER_MODAL", player, slotId });
    },
    [dispatch]
  );

  const handleRemove = useCallback(
    (slotId: string) => {
      dispatch({ type: "REMOVE_PLAYER", slotId });
    },
    [dispatch]
  );

  const slotMap = new Map(state.slots.map((s) => [s.slotId, s]));

  return (
    <div className="relative w-full aspect-[3/4] max-h-[700px] mx-auto rounded-2xl overflow-hidden">
      {/* Pitch background */}
      <div className="absolute inset-0 bg-[#0d2818]">
        {/* Pitch pattern overlay */}
        <div className="absolute inset-0 pitch-pattern" />

        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-pitch-line" />

        {/* Center line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-pitch-line" />

        {/* Center spot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pitch-line" />

        {/* Penalty areas */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[65%] h-[22%] border border-pitch-line rounded-sm" />
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[65%] h-[22%] border border-pitch-line rounded-sm" />

        {/* Goal areas */}
        <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[32%] h-[8%] border border-pitch-line rounded-sm" />
        <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[32%] h-[8%] border border-pitch-line rounded-sm" />

        {/* Top arc */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-20 h-10 border-2 border-pitch-line rounded-b-full border-t-0" />

        {/* Bottom arc */}
        <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-20 h-10 border-2 border-pitch-line rounded-t-full border-b-0" />

        {/* Corner arcs */}
        {[
          "top-0 left-0",
          "top-0 right-0",
          "bottom-0 left-0",
          "bottom-0 right-0",
        ].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-6 h-6 border border-pitch-line rounded-full`}
            style={
              pos.includes("top-0 left-0")
                ? { clipPath: "inset(0 50% 50% 0)" }
                : pos.includes("top-0 right-0")
                  ? { clipPath: "inset(0 0 50% 50%)" }
                  : pos.includes("bottom-0 left-0")
                    ? { clipPath: "inset(50% 50% 0 0)" }
                    : { clipPath: "inset(50% 0 0 50%)" }
            }
          />
        ))}
      </div>

      {/* Player slots */}
      {formationConfig.slots.map((slot) => {
        const teamSlot = slotMap.get(slot.id) || {
          slotId: slot.id,
          player: null,
          transferValue: 0,
        };
        return (
          <PlayerSlot
            key={slot.id}
            slot={teamSlot}
            slotX={slot.x}
            slotY={slot.y}
            slotPosition={slot.position}
            slotLabel={slot.label}
            onDrop={handleDrop}
            onRemove={handleRemove}
          />
        );
      })}
    </div>
  );
}
