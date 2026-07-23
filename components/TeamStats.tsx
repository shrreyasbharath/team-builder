"use client";

import { useTeam } from "@/hooks/useTeamStore";

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
}

function StatBar({ label, value, max = 100 }: StatBarProps) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xs font-bold tabular-nums">{Math.round(value)}</span>
      </div>
      <div className="h-1 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-foreground transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function TeamStats() {
  const { stats, state } = useTeam();
  const filledSlots = state.slots.filter((s) => s.player !== null).length;

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Team Statistics
      </div>

      {filledSlots === 0 ? (
        <div className="glass rounded-xl p-6 text-center">
          <div className="text-xs text-muted-foreground">
            Build your team to see statistics
          </div>
          <div className="text-[10px] text-muted-foreground/50 mt-1">
            Drag players from the panel below
          </div>
        </div>
      ) : (
        <div className="glass rounded-xl p-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/50">
            <div className="text-xs text-muted-foreground">Average Rating</div>
            <div className="text-2xl font-bold tabular-nums">
              {stats.averageRating}
              <span className="text-xs text-muted-foreground font-normal">
                /99
              </span>
            </div>
          </div>

          <StatBar label="Attack" value={stats.attack} />
          <StatBar label="Midfield" value={stats.midfield} />
          <StatBar label="Defence" value={stats.defence} />

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-[10px] text-muted-foreground">
              Team Rating
            </span>
            <span className="text-xs font-bold tabular-nums">
              {stats.totalTeamRating}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
