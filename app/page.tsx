"use client";

import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import CastCard from "./components/CastCard";
import FetchButton from "./components/FetchButton";

interface Cast {
  hash: string;
  threadHash: string;
  text: string;
  embeds: { images: string[] };
  likes: number;
  recasts: number;
  replies: number;
  totalInteractions: number;
}

export default function App() {
  const [mostInteractedCast, setMostInteractedCast] = useState<Cast | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sdk.actions.ready();
    sdk.back.enableWebNavigation();
  }, []);

  async function fetchCasts() {
    setLoading(true);
    try {
      const user = (await sdk.context).user.fid;
      const response = await fetch(`/api/casts?fid=${encodeURIComponent(user)}`);
      if (!response.ok) throw new Error("Failed to fetch casts");
      const data = await response.json();

      const casts: Cast[] = data.result.casts.map((cast: any) => {
        const likes = cast.reactions?.count || 0;
        const recasts = cast.recasts?.count || 0;
        const replies = cast.replies?.count || 0;
        const totalInteractions = likes + recasts + replies;

        let images: string[] = [];
        if (Array.isArray(cast.embeds?.images)) {
          images = cast.embeds.images.map((img: any) => img.url);
        }

        return { ...cast, likes, recasts, replies, totalInteractions, embeds: { images } };
      });

      const mostInteracted = casts.reduce((max, cast) =>
        cast.totalInteractions > max.totalInteractions ? cast : max,
        casts[0]
      );

      setMostInteractedCast(mostInteracted);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      {!mostInteractedCast ? (
        <FetchButton onClick={fetchCasts} loading={loading} />
      ) : (
        <>
          <p className="text-lg font-semibold mb-2">Most Interacted Cast</p>
          <CastCard cast={mostInteractedCast} />
        </>
      )}
    </div>
  );
}
