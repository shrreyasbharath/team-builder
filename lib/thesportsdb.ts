/** TheSportsDB API utility for fetching player images */

const SPORTSDB_BASE = "https://www.thesportsdb.com/api/v1/json/123";

interface SportsDBPlayer {
  idPlayer: string;
  strPlayer: string;
  strCutout: string | null;
  strThumb: string | null;
  strRender: string | null;
}

const imageCache = new Map<string, string>();

export function getCachedImage(name: string): string | null {
  return imageCache.get(name) ?? null;
}

export async function fetchPlayerImage(
  name: string,
  signal?: AbortSignal
): Promise<string | null> {
  // Check cache first
  const cached = imageCache.get(name);
  if (cached) return cached;

  try {
    const searchName = name.replace(/\s+/g, "_");
    const res = await fetch(
      `${SPORTSDB_BASE}/searchplayers.php?p=${searchName}`,
      { signal }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const players: SportsDBPlayer[] = data?.player;

    if (!players || players.length === 0) return null;

    // Find exact name match
    const match = players.find(
      (p) => p.strPlayer?.toLowerCase() === name.toLowerCase()
    );

    const player = match || players[0];
    const imgUrl = player.strCutout || player.strThumb || player.strRender;

    if (imgUrl) {
      imageCache.set(name, imgUrl);
      // Persist to localStorage
      try {
        const stored = JSON.parse(
          localStorage.getItem("sportsdb_cache") || "{}"
        );
        stored[name] = imgUrl;
        localStorage.setItem("sportsdb_cache", JSON.stringify(stored));
      } catch {
        /* ignore */
      }
      return imgUrl;
    }

    return null;
  } catch {
    return null;
  }
}

export function loadImageCacheFromStorage(): void {
  try {
    const stored = JSON.parse(
      localStorage.getItem("sportsdb_cache") || "{}"
    );
    for (const [name, url] of Object.entries(stored)) {
      imageCache.set(name, url as string);
    }
  } catch {
    /* ignore */
  }
}
