interface TeamStatsProps {
  averageRating: number;
  attack: number;
  midfield: number;
  defence: number;
  playersCount: number;
}

function StatBar({ label, value, maxValue = 99 }: { label: string; value: number; maxValue?: number }) {
  const pct = Math.min((value / maxValue) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs uppercase tracking-wider text-white/40 font-medium">{label}</span>
        <span className="text-sm font-bold text-white/70">{Math.round(value)}</span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-white/30 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function TeamStats({
  averageRating,
  attack,
  midfield,
  defence,
  playersCount,
}: TeamStatsProps) {
  return (
    <div className="glass rounded-xl p-5">
      <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
        Team Stats
      </h3>

      {playersCount === 0 ? (
        <div className="text-sm text-white/30 text-center py-8">Add players to see team stats</div>
      ) : (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-white/90 tracking-tight">{averageRating}</div>
            <div className="text-xs text-white/40 uppercase tracking-wider mt-1 font-medium">Avg Rating · {playersCount}/11</div>
          </div>
          <StatBar label="Attack" value={attack} />
          <StatBar label="Midfield" value={midfield} />
          <StatBar label="Defence" value={defence} />
        </div>
      )}
    </div>
  );
}
