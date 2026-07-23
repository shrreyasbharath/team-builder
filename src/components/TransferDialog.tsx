"use client";

import { useState, useEffect, useRef } from "react";
import type { Player } from "@/hooks/useTeamBuilder";
import { getPlayerImageUrl } from "@/lib/utils";

interface TransferDialogProps {
  player: Player;
  remainingBudget: number;
  onConfirm: (value: number) => void;
  onCancel: () => void;
}

export default function TransferDialog({
  player,
  remainingBudget,
  onConfirm,
  onCancel,
}: TransferDialogProps) {
  const [value, setValue] = useState(player.price);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const isOverBudget = value > remainingBudget;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass rounded-xl p-6">
          {/* Player info */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/[0.06] flex-shrink-0">
              <img
                src={getPlayerImageUrl(player.name)}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-semibold text-sm text-white/90">
                {player.name}
              </div>
              <div className="text-xs text-white/40">
                {player.primaryPosition} · {player.club} · Rating {player.rating}
              </div>
            </div>
          </div>

          {/* Transfer value input */}
          <div className="mb-4">
            <label className="block text-xs text-white/50 mb-1.5 font-medium uppercase tracking-wider">
              Transfer Value (₹ Crore)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-semibold text-sm">
                ₹
              </span>
              <input
                ref={inputRef}
                type="number"
                value={value}
                onChange={(e) => setValue(Math.max(0, Number(e.target.value)))}
                min={0}
                max={remainingBudget + player.price}
                className={`
                  w-full pl-8 pr-3 py-2.5 rounded-lg
                  bg-white/[0.06] border text-sm
                  outline-none transition-colors
                  ${
                    isOverBudget
                      ? "border-red-500/50 text-red-400"
                      : "border-white/[0.1] text-white focus:border-white/30"
                  }
                `}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[11px] text-white/40">
                Suggested: ₹{player.price} Cr
              </span>
              <span
                className={`text-[11px] ${
                  isOverBudget ? "text-red-400" : "text-white/40"
                }`}
              >
                Remaining: ₹{remainingBudget} Cr
              </span>
            </div>
            {isOverBudget && (
              <div className="mt-2 text-[11px] text-red-400 flex items-center gap-1">
                <span>⚠</span>
                <span>Exceeds remaining budget by ₹{value - remainingBudget} Cr</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="
                flex-1 py-2.5 rounded-lg text-sm font-medium
                bg-white/[0.06] text-white/60
                hover:bg-white/[0.1] transition-colors
              "
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(value)}
              disabled={isOverBudget}
              className={`
                flex-1 py-2.5 rounded-lg text-sm font-semibold
                transition-all duration-200
                ${
                  isOverBudget
                    ? "bg-white/[0.06] text-white/30 cursor-not-allowed"
                    : "bg-white text-black hover:bg-white/90"
                }
              `}
            >
              Sign Player
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
