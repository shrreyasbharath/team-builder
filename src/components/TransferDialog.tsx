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
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass rounded-2xl p-8">
          {/* Player info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/[0.06] flex-shrink-0 ring-2 ring-white/[0.06]">
              <img
                src={getPlayerImageUrl(player.name)}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-lg text-white/90 truncate">
                {player.name}
              </div>
              <div className="text-sm text-white/40 mt-0.5">
                {player.primaryPosition} · {player.club} · Rating {player.rating}
              </div>
            </div>
          </div>

          {/* Transfer value input */}
          <div className="mb-6">
            <label className="block text-xs text-white/50 mb-2 font-semibold uppercase tracking-wider">
              Transfer Value (₹ Crore)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold text-lg">₹</span>
              <input
                ref={inputRef}
                type="number"
                value={value}
                onChange={(e) => setValue(Math.max(0, Number(e.target.value)))}
                min={0}
                max={remainingBudget + player.price}
                className={`
                  w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.06] border text-base font-semibold outline-none transition-colors
                  ${isOverBudget ? "border-red-500/50 text-red-400" : "border-white/[0.1] text-white focus:border-white/30"}
                `}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-white/40">Suggested: ₹{player.price} Cr</span>
              <span className={`text-xs ${isOverBudget ? "text-red-400 font-semibold" : "text-white/40"}`}>
                Remaining: ₹{remainingBudget} Cr
              </span>
            </div>
            {isOverBudget && (
              <div className="mt-3 text-xs text-red-400 flex items-center gap-2 bg-red-500/10 rounded-lg px-3 py-2">
                <span>⚠</span>
                <span>Exceeds remaining budget by ₹{value - remainingBudget} Cr</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3.5 rounded-xl text-sm font-semibold bg-white/[0.06] text-white/60 hover:bg-white/[0.1] transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(value)}
              disabled={isOverBudget}
              className={`
                flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-200
                ${isOverBudget ? "bg-white/[0.06] text-white/30 cursor-not-allowed" : "bg-white text-black hover:bg-white/90 hover:scale-[1.02] shadow-xl"}
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
