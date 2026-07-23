import { useState, useMemo } from "react";
import type { Player } from "@/hooks/useTeamBuilder";

interface PlayerSearchProps {
  allPlayers: Player[];
  onFilteredPlayers: (players: Player[]) => void;
}

const POSITIONS = ["GK", "CB", "LB", "RB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "ST", "CF"];

export default function PlayerSearchInner({
  allPlayers,
  onFilteredPlayers,
}: PlayerSearchProps) {
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = allPlayers;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.club.toLowerCase().includes(q)
      );
    }

    if (positionFilter !== "All") {
      result = result.filter(
        (p) =>
          p.primaryPosition === positionFilter ||
          p.secondaryPositions.includes(positionFilter)
      );
    }

    if (ratingFilter > 0) {
      result = result.filter((p) => p.rating >= ratingFilter);
    }

    result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [allPlayers, search, positionFilter, ratingFilter]);

  useMemo(() => {
    onFilteredPlayers(filtered);
  }, [filtered, onFilteredPlayers]);

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by name, country, club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.06] text-sm text-white/80 placeholder-white/30 outline-none focus:border-white/[0.15] transition-all duration-200"
        />
      </div>

      {/* Quick filters */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 uppercase tracking-wider
            ${showFilters ? "bg-white/10 text-white/80" : "bg-white/[0.06] text-white/40 hover:bg-white/[0.1]"}
          `}
        >
          Filters
        </button>
        <div className="flex gap-2">
          {[0, 80, 85, 90].map((r) => (
            <button
              key={r}
              onClick={() => setRatingFilter(ratingFilter === r ? 0 : r)}
              className={`
                px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                ${ratingFilter === r ? "bg-white/10 text-white/80" : "bg-white/[0.06] text-white/40 hover:bg-white/[0.1]"}
              `}
            >
              {r === 0 ? "All" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Position filter panel */}
      {showFilters && (
        <div className="animate-fadeIn">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPositionFilter("All")}
              className={`
                px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                ${positionFilter === "All" ? "bg-white/10 text-white/80" : "bg-white/[0.06] text-white/40 hover:bg-white/[0.1]"}
              `}
            >
              All
            </button>
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                onClick={() => setPositionFilter(pos)}
                className={`
                  px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                  ${positionFilter === pos ? "bg-white/10 text-white/80" : "bg-white/[0.06] text-white/40 hover:bg-white/[0.1]"}
                `}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-xs text-white/30 font-medium px-1">
        {filtered.length} players found
      </div>
    </div>
  );
}

export { PlayerSearchInner };
