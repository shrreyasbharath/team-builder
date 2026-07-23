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
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest">
          Formation
        </h3>
        <button
          onClick={onRandom}
          className="text-xs font-medium text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
        >
          Random
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {formations.map((f) => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={`
              py-3 rounded-xl text-sm font-bold tracking-wide
              transition-all duration-200
              ${
                currentFormation === f.id
                  ? "bg-white text-black shadow-xl shadow-white/10 scale-[1.02]"
                  : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/80 hover:scale-[1.02]"
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
