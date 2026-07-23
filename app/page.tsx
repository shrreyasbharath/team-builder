"use client";

import { TeamProvider, useTeam } from "@/hooks/useTeamStore";
import FootballPitch from "@/components/FootballPitch";
import FormationSelector from "@/components/FormationSelector";
import SearchFilters from "@/components/SearchFilters";
import PlayerList from "@/components/PlayerList";
import BudgetBar from "@/components/BudgetBar";
import TeamStats from "@/components/TeamStats";
import TransferModal from "@/components/TransferModal";
import ThemeToggle from "@/components/ThemeToggle";

function TeamActions() {
  const { dispatch } = useTeam();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => dispatch({ type: "RESET_TEAM" })}
        className="flex-1 py-2 text-[10px] font-medium rounded-lg border border-border
          hover:bg-secondary transition-colors"
      >
        Reset Team
      </button>
      <button
        onClick={() => dispatch({ type: "RANDOM_TEAM" })}
        className="flex-1 py-2 text-[10px] font-medium rounded-lg border border-border
          hover:bg-secondary transition-colors"
      >
        Random Team
      </button>
      <button
        onClick={() => dispatch({ type: "RANDOM_FORMATION" })}
        className="flex-1 py-2 text-[10px] font-medium rounded-lg border border-border
          hover:bg-secondary transition-colors"
      >
        Random Formation
      </button>
    </div>
  );
}

function Header() {
  return (
    <header className="glass border-b border-border/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Football icon */}
          <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
            <svg
              className="w-4 h-4 text-background"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">
              Dream Team Builder
            </h1>
            <p className="text-[10px] text-muted-foreground">
              Build your ultimate squad
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function MainContent() {
  const { state } = useTeam();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Formation & Budget & Stats */}
        <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
          <FormationSelector />
          <BudgetBar />
          <TeamStats />
          <TeamActions />
        </div>

        {/* Center - Pitch */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="glass rounded-2xl p-4">
            <FootballPitch />
          </div>
        </div>

        {/* Right sidebar - Search & Players */}
        <div className="lg:col-span-1 space-y-4 order-3">
          <SearchFilters />
          <PlayerList />
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <TeamProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <MainContent />
        <TransferModal />
      </div>
    </TeamProvider>
  );
}
