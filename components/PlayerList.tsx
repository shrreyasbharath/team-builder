"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useTeam } from "@/hooks/useTeamStore";
import type { Player } from "@/hooks/useTeamStore";
import PlayerCard from "./PlayerCard";
import playersData from "@/data/players.json";
import { usePlayerImages } from "@/hooks/usePlayerImages";

export default function PlayerList() {
  const { state, dispatch } = useTeam();
  const { images, requestImage } = usePlayerImages();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  // Filter players
  const filteredPlayers = useMemo(() => {
    return playersData.filter((player) => {
      const matchesSearch =
        !state.searchQuery ||
        player.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        player.club.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        player.country.toLowerCase().includes(state.searchQuery.toLowerCase());

      const matchesPosition =
        !state.positionFilter || player.position === state.positionFilter;

      const matchesCountry =
        !state.countryFilter || player.country === state.countryFilter;

      const matchesClub =
        !state.clubFilter || player.club === state.clubFilter;

      const matchesRating =
        player.rating >= state.minRating && player.rating <= state.maxRating;

      return (
        matchesSearch &&
        matchesPosition &&
        matchesCountry &&
        matchesClub &&
        matchesRating
      );
    });
  }, [
    state.searchQuery,
    state.positionFilter,
    state.countryFilter,
    state.clubFilter,
    state.minRating,
    state.maxRating,
  ]);

  const handleDragStart = useCallback(
    (player: Player) => {
      setSelectedPlayerId(player.id);
    },
    []
  );

  const handleClick = useCallback(
    (player: Player) => {
      setSelectedPlayerId(player.id === selectedPlayerId ? null : player.id);
    },
    [selectedPlayerId]
  );

  // Request images for visible players
  useEffect(() => {
    const visible = filteredPlayers.slice(0, 20);
    for (const p of visible) {
      if (!images[p.id]) {
        requestImage(p.id, p.name);
      }
    }
  }, [filteredPlayers, images, requestImage]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Players
        </div>
        <div className="text-[10px] text-muted-foreground">
          {filteredPlayers.length} found
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[600px] overflow-y-auto pr-1">
        {filteredPlayers.slice(0, 100).map((player) => (
          <PlayerCard
            key={player.id}
            player={player as Player}
            imageUrl={images[player.id]}
            onDragStart={handleDragStart}
            onClick={handleClick}
            selected={selectedPlayerId === player.id}
          />
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-xs">
          No players match your filters
        </div>
      )}
    </div>
  );
}
