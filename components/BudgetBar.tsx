"use client";

import { useTeam } from "@/hooks/useTeamStore";
import { formatCurrency } from "@/lib/utils";

export default function BudgetBar() {
  const { state } = useTeam();
  const totalBudget = 500;
  const spentPercent = (state.totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Budget
      </div>

      <div className="glass rounded-xl p-3 space-y-3">
        {/* Total budget */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Total Budget</span>
          <span className="text-sm font-bold">{formatCurrency(totalBudget)}</span>
        </div>

        {/* Spent */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Money Spent</span>
          <span className="text-xs font-semibold text-muted-foreground">
            {formatCurrency(state.totalSpent)}
          </span>
        </div>

        {/* Remaining */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Remaining</span>
          <span
            className={`text-sm font-bold ${
              state.budget < 0
                ? "text-red-400"
                : state.budget < 100
                  ? "text-yellow-400"
                  : "text-green-400"
            }`}
          >
            {formatCurrency(Math.max(0, state.budget))}
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
              spentPercent > 80
                ? "bg-red-500"
                : spentPercent > 60
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
            style={{ width: `${Math.min(spentPercent, 100)}%` }}
          />
        </div>

        {/* Player count */}
        <div className="text-[10px] text-muted-foreground text-center">
          {state.slots.filter((s) => s.player !== null).length} / 11 players signed
        </div>
      </div>
    </div>
  );
}
