"use client";

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

    // Search by name, country, club
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.club.toLowerCase().includes(q)
      );
    }

    // Position filter
    if (positionFilter !== "All") {
      result = result.filter(
        (p) =>
          p.primaryPosition === positionFilter ||
          p.secondaryPositions.includes(positionFilter)
      );
    }

    // Rating filter
    if (ratingFilter > 0) {
      result = result.filter((p) => p.rating >= ratingFilter);
    }

    // Sort by rating descending
    result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [allPlayers, search, positionFilter, ratingFilter]);

  // Report filtered players
  useMemo(() => {
    onFilteredPlayers(filtered);
  }, [filtered, onFilteredPlayers]);

  return (
    <div className="space-y-2.5">
      {/* Search bar */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by name, country, club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full pl-9 pr-3 py-2.5 rounded-lg
            bg-white/[0.06] border border-white/[0.06]
            text-sm text-white/80 placeholder-white/30
            outline-none focus:border-white/[0.15]
            transition-colors
          "
        />
      </div>

      {/* Quick filters */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`
            px-2.5 py-1.5 rounded-md text-[10px] font-medium
            transition-colors uppercase tracking-wider
            ${
              showFilters
                ? "bg-white/10 text-white/80"
                : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08]"
            }
          `}
        >
          Filters
        </button>

        {/* Rating quick select */}
        <div className="flex gap-1">
          {[0, 80, 85, 90].map((r) => (
            <button
              key={r}
              onClick={() => setRatingFilter(ratingFilter === r ? 0 : r)}
              className={`
                px-2 py-1 rounded-md text-[10px] font-medium
                transition-colors
                ${
                  ratingFilter === r
                    ? "bg-white/10 text-white/80"
                    : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08]"
                }
              `}
            >
              {r === 0 ? "All" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="animate-fadeIn">
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setPositionFilter("All")}
              className={`
                px-2 py-1 rounded-md text-[10px] font-medium
                transition-colors
                ${
                  positionFilter === "All"
                    ? "bg-white/10 text-white/80"
                    : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08]"
                }
              `}
            >
              All
            </button>
            {POSITIONS.map((pos) => (
              <button
                key={pos}
                onClick={() => setPositionFilter(pos)}
                className={`
                  px-2 py-1 rounded-md text-[10px] font-medium
                  transition-colors
                  ${
                    positionFilter === pos
                      ? "bg-white/10 text-white/80"
                      : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08]"
                  }
                `}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="text-[10px] text-white/30 font-medium px-0.5">
        {filtered.length} players found
      </div>
    </div>
  );
}

// Wrapper to expose inner component
export { PlayerSearchInner };
