"use client";

import { useTeam } from "@/hooks/useTeamStore";
import playersData from "@/data/players.json";

export default function SearchFilters() {
  const { state, dispatch } = useTeam();

  // Extract unique values for dropdowns
  const countries = [...new Set(playersData.map((p) => p.country))].sort();
  const clubs = [...new Set(playersData.map((p) => p.club))].sort();
  const positions = [...new Set(playersData.map((p) => p.position))].sort();

  return (
    <div className="space-y-3">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Search & Filters
      </div>

      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search players..."
          value={state.searchQuery}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH_QUERY", query: e.target.value })
          }
          className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-card border border-input
            focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring
            placeholder:text-muted-foreground/50 transition-colors"
        />
      </div>

      {/* Filter row */}
      <div className="grid grid-cols-2 gap-2">
        {/* Position */}
        <select
          value={state.positionFilter}
          onChange={(e) =>
            dispatch({ type: "SET_POSITION_FILTER", position: e.target.value })
          }
          className="text-xs px-2 py-1.5 rounded-lg bg-card border border-input
            focus:outline-none focus:border-ring
            text-muted-foreground"
        >
          <option value="">All Positions</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

        {/* Rating range */}
        <div className="flex items-center gap-1">
          <input
            type="number"
            placeholder="Min"
            value={state.minRating || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_MIN_RATING",
                rating: Number(e.target.value) || 0,
              })
            }
            className="w-full text-xs px-2 py-1.5 rounded-lg bg-card border border-input
              focus:outline-none focus:border-ring
              placeholder:text-muted-foreground/50"
            min={0}
            max={99}
          />
          <span className="text-xs text-muted-foreground">-</span>
          <input
            type="number"
            placeholder="Max"
            value={state.maxRating === 99 ? "" : state.maxRating}
            onChange={(e) =>
              dispatch({
                type: "SET_MAX_RATING",
                rating: Number(e.target.value) || 99,
              })
            }
            className="w-full text-xs px-2 py-1.5 rounded-lg bg-card border border-input
              focus:outline-none focus:border-ring
              placeholder:text-muted-foreground/50"
            min={0}
            max={99}
          />
        </div>
      </div>

      {/* Country */}
      <select
        value={state.countryFilter}
        onChange={(e) =>
          dispatch({ type: "SET_COUNTRY_FILTER", country: e.target.value })
        }
        className="w-full text-xs px-2 py-1.5 rounded-lg bg-card border border-input
          focus:outline-none focus:border-ring
          text-muted-foreground"
      >
        <option value="">All Countries</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Club */}
      <select
        value={state.clubFilter}
        onChange={(e) =>
          dispatch({ type: "SET_CLUB_FILTER", club: e.target.value })
        }
        className="w-full text-xs px-2 py-1.5 rounded-lg bg-card border border-input
          focus:outline-none focus:border-ring
          text-muted-foreground"
      >
        <option value="">All Clubs</option>
        {clubs.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
