"use client";
import { sdk } from "@farcaster/frame-sdk";

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
    author: {
        username: string;
    };
}

export default function CastCard({ cast }: { cast: Cast }) {
    const handleOpenCast = async () => {
        const url = `https://farcaster.xyz/${cast.author.username}/${cast.hash.slice(0, 10)}`;
        console.log(url);
        await sdk.actions.openUrl(url);
    };
    return (
        <div
            onClick={handleOpenCast}
            className="border rounded-lg p-4 shadow-md" >
            <p className="mb-2 text-[14px] cursor-pointer">{cast.text}</p>

            {/* render images (up to 2 side by side) */}
            {cast.embeds.images.length > 0 && (
                <div className="flex gap-2 mb-2">
                    {cast.embeds.images.slice(0, 2).map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Cast embed ${idx + 1}`}
                            className={`rounded-md object-cover ${cast.embeds.images.length === 1
                                    ? "w-full h-auto"
                                    : "w-1/2 h-auto"
                                }`}
                        />
                    ))}
                </div>
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
