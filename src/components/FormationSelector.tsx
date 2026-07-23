"use client";

interface FormationSelectorProps {
  currentFormation: string;
  onSelect: (formation: string) => void;
  onRandom: () => void;
}

const formations = [
  { id: "4-3-3", label: "4-3-3" },
  { id: "4-4-2", label: "4-4-2" },
  { id: "4-2-3-1", label: "4-2-3-1" },
  { id: "3-5-2", label: "3-5-2" },
  { id: "3-4-3", label: "3-4-3" },
  { id: "5-3-2", label: "5-3-2" },
];

export default function FormationSelector({
  currentFormation,
  onSelect,
  onRandom,
}: FormationSelectorProps) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
          Formation
        </h3>
        <button
          onClick={onRandom}
          className="
            text-[10px] font-medium text-white/30
            hover:text-white/60 transition-colors
            uppercase tracking-wider
          "
        >
          Random
        </button>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {formations.map((f) => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={`
              py-2 rounded-lg text-sm font-semibold
              transition-all duration-150
              ${
                currentFormation === f.id
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/[0.06] text-white/60 hover:bg-white/[0.1] hover:text-white/80"
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
