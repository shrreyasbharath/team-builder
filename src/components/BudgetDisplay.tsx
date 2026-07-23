interface BudgetDisplayProps {
  total: number;
  spent: number;
  remaining: number;
}

export default function BudgetDisplay({
  total,
  spent,
  remaining,
}: BudgetDisplayProps) {
  const spentPercent = (spent / total) * 100;
  const isNegative = remaining < 0;

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
        Budget
      </h3>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="space-y-1">
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Total</div>
          <div className="text-lg font-bold text-white/80">₹{total} Cr</div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Spent</div>
          <div className="text-lg font-bold text-white/60">₹{spent} Cr</div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Remaining</div>
          <div className={`text-lg font-bold ${isNegative ? "text-red-400" : remaining < 100 ? "text-yellow-400" : "text-white/80"}`}>
            ₹{remaining} Cr
          </div>
        </div>
      </div>

      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            spent > total ? "bg-red-500" : spent > total * 0.8 ? "bg-yellow-500" : "bg-white/40"
          }`}
          style={{ width: `${Math.min(spentPercent, 100)}%` }}
        />
      </div>
    </div>
  );
}
