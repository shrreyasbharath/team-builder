"use client";

import { useState } from "react";
import { useTeam } from "@/hooks/useTeamStore";
import { formatCurrency, calculateValue } from "@/lib/utils";
import { getPositionHex } from "@/lib/utils";

export default function TransferModal() {
  const { state, dispatch } = useTeam();
  const { transferPlayer, transferSlotId, budget, showTransferModal } = state;

  const suggestedValue = transferPlayer ? calculateValue(transferPlayer.rating) : 0;
  const [value, setValue] = useState(suggestedValue.toString());

  if (!showTransferModal || !transferPlayer || !transferSlotId) return null;

  const numValue = Number(value);
  const isOverBudget = numValue > budget + state.totalSpent; // total budget check
  const isValid = numValue > 0 && !isOverBudget;

  const handleConfirm = () => {
    if (!isValid) return;
    dispatch({
      type: "ADD_PLAYER",
      slotId: transferSlotId,
      player: transferPlayer,
      value: numValue,
    });
    setValue(suggestedValue.toString());
  };

  const handleClose = () => {
    dispatch({ type: "CLOSE_TRANSFER_MODAL" });
    setValue(suggestedValue.toString());
  };

  const initials = transferPlayer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const posColor = getPositionHex(transferPlayer.position);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass rounded-2xl p-6 w-full max-w-sm space-y-5 animate-in">
        {/* Player preview */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 text-sm font-bold flex-shrink-0"
            style={{ borderColor: posColor, color: posColor }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">
              {transferPlayer.name}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded border"
                style={{ color: posColor, borderColor: posColor }}
              >
                {transferPlayer.position}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {transferPlayer.club}
              </span>
              <span className="text-[10px] font-bold ml-auto">
                {transferPlayer.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-4 space-y-3">
          {/* Input */}
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">
              Transfer Value
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value in Crore"
                className="w-full pl-8 pr-3 py-2.5 text-sm rounded-xl bg-card border border-input
                  focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                autoFocus
                min={1}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                Cr
              </span>
            </div>
            <div className="text-[10px] text-muted-foreground">
              Suggested: {formatCurrency(suggestedValue)}
            </div>
          </div>

          {/* Budget info */}
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Remaining Budget</span>
            <span
              className={`font-semibold ${
                isOverBudget ? "text-red-400" : "text-green-400"
              }`}
            >
              {formatCurrency(budget)}
            </span>
          </div>

          {isOverBudget && (
            <div className="text-[10px] text-red-400 bg-red-400/10 rounded-lg px-2 py-1">
              Insufficient budget! This player costs more than you can afford.
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleClose}
              className="flex-1 py-2 text-xs font-medium rounded-xl border border-border
                hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isValid}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all
                ${
                  isValid
                    ? "bg-foreground text-background hover:opacity-90"
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                }`}
            >
              Sign Player
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
