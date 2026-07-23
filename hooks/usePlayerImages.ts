"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { fetchPlayerImage } from "@/lib/thesportsdb";

interface PlayerImageState {
  [playerId: number]: string;
}

export function usePlayerImages() {
  const [images, setImages] = useState<PlayerImageState>({});
  const queueRef = useRef<{ id: number; name: string; signal: AbortSignal }[]>(
    []
  );
  const processingRef = useRef(false);

  const requestImage = useCallback((playerId: number, playerName: string) => {
    setImages((prev) => {
      if (prev[playerId]) return prev;
      return prev;
    });

    const controller = new AbortController();
    queueRef.current.push({
      id: playerId,
      name: playerName,
      signal: controller.signal,
    });

    if (!processingRef.current) {
      processQueue();
    }
  }, []);

  async function processQueue() {
    processingRef.current = true;
    while (queueRef.current.length > 0) {
      const batch = queueRef.current.splice(0, 3); // Process 3 at a time
      const promises = batch.map((item) =>
        fetchPlayerImage(item.name, item.signal).then((url) => ({
          id: item.id,
          url,
        }))
      );

      const results = await Promise.all(promises);
      const newImages: PlayerImageState = {};
      for (const r of results) {
        if (r.url) newImages[r.id] = r.url;
      }

      if (Object.keys(newImages).length > 0) {
        setImages((prev) => ({ ...prev, ...newImages }));
      }

      // Wait between batches to respect rate limits
      if (queueRef.current.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
    processingRef.current = false;
  }

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("sportsdb_cache") || "{}"
      );
      // We can't map names to IDs here, so just restore on demand
    } catch {
      /* ignore */
    }
  }, []);

  return { images, requestImage };
}
