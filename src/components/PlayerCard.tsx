import type { Player } from "@/hooks/useTeamBuilder";
import {
  getFlagEmoji,
  getRatingColor,
  getPositionLabel,
  getPlayerImageUrl,
} from "@/lib/utils";

interface PlayerCardProps {
  player: Player;
  isSelected?: boolean;
  isInTeam?: boolean;
  isDraggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onClick?: () => void;
}

export default function PlayerCard({
  player,
  isSelected = false,
  isInTeam = false,
  isDraggable = true,
  onDragStart,
  onClick,
}: PlayerCardProps) {
  const ratingColor = getRatingColor(player.rating);

  return (
    <div
      className={`
        group relative flex items-center cursor-pointer select-none p-4 gap-4
        transition-all duration-200 ease-out rounded-xl border
        ${isSelected
          ? "ring-1 ring-white/30 bg-white/[0.08]"
          : "border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]"
        }
        ${isInTeam ? "opacity-40 pointer-events-none" : ""}
      `}
      draggable={isDraggable && !isInTeam}
      onDragStart={(e) => {
        if (isDraggable && !isInTeam) {
          e.dataTransfer.setData("text/plain", player.id);
          e.dataTransfer.effectAllowed = "move";
          onDragStart?.(e);
        }
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.();
      }}
    >
      {/* Player Image */}
      <div className="relative flex-shrink-0">
        <div className="overflow-hidden rounded-full w-12 h-12 bg-white/[0.06]">
          <img
            src={getPlayerImageUrl(player.name)}
            alt={player.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full bg-black/70 border border-white/10 text-[11px] font-bold leading-none w-5.5 h-5.5 ${ratingColor}`}>
          {player.rating}
        </div>
      </div>

      {/* Player Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold truncate text-sm text-white/90">
            {player.name}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs text-white/50">
          <span className="font-semibold text-white/70">
            {getPositionLabel(player.primaryPosition)}
          </span>
          <span className="text-white/30">·</span>
          <span className="text-base leading-none">{getFlagEmoji(player.countryCode)}</span>
          <span className="truncate">{player.club}</span>
        </div>
      </div>

      {/* In team indicator */}
      {isInTeam && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
          <span className="text-xs text-white/60 font-semibold tracking-wider uppercase">In Team</span>
        </div>
      )}
    </div>
  );
}
