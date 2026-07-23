"use client";

import { useTeam } from "@/hooks/useTeamStore";
import { getFormationList, type FormationSlot } from "@/lib/formations";
import { FORMATIONS } from "@/lib/formations";

function FormationMiniPitch({ slots }: { slots: FormationSlot[] }) {
  const grouped = slots.reduce<Record<number, FormationSlot[]>>((acc, s) => {
    if (!acc[s.row]) acc[s.row] = [];
    acc[s.row].push(s);
    return acc;
  }, {});

  return (
    <div className="w-14 h-20 relative bg-[#0d2818]/80 rounded overflow-hidden">
      {/* Mini pitch lines */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-1">
        {Object.entries(grouped)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([, rowSlots]) => (
            <div key={rowSlots[0]?.id} className="flex items-center justify-center gap-1 w-full">
              {rowSlots.map((s) => (
                <div
                  key={s.id}
                  className="w-1.5 h-1.5 rounded-full bg-white/70"
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default function FormationSelector() {
  const { state, dispatch } = useTeam();
  const formations = getFormationList();

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Formation
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {formations.map((f) => {
          const isActive = state.formation === f;
          const config = FORMATIONS[f];
          return (
            <button
              key={f}
              onClick={() =>
                dispatch({ type: "SET_FORMATION", formation: f })
              }
              className={`
                flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-200
                min-w-[80px] flex-shrink-0
                ${
                  isActive
                    ? "bg-card border-ring shadow-lg shadow-white/5"
                    : "bg-card/50 border-border hover:border-ring/50 hover:bg-card-hover"
                }
              `}
            >
              <FormationMiniPitch slots={config.slots} />
              <span
                className={`text-xs font-semibold ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {f}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
