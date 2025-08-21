"use client";

interface Cast {
  hash: string;
  threadHash: string;
  text: string;
  embeds: {
    images: string[];
  };
  likes: number;
  recasts: number;
  replies: number;
  totalInteractions: number;
}

export default function CastCard({ cast }: { cast: Cast }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <p className="mb-2 text-[14px]">{cast.text}</p>

      {/* render all images if any */}
      {cast.embeds.images.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-2">
          {cast.embeds.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Cast embed ${idx + 1}`}
              className="rounded-md max-w-full w-40 h-auto object-cover"
            />
          ))}
        </div>
      ) : (
        <div />
      )}

      <div className="text-sm text-gray-600">
        <p>Likes: {cast.likes}</p>
        <p>Recasts: {cast.recasts}</p>
        <p>Replies: {cast.replies}</p>
        <p>Total Interactions: {cast.totalInteractions}</p>
      </div>
    </div>
  );
}
