"use client";

export default function FetchButton({
    onClick,
    loading,
}: {
    onClick: () => void;
    loading: boolean;
}) {
    return (<>
        <div className="flex justify-center items-center flex-col" >
            <h1 className="text-lg font-bold mb-[100px]">Check your most engaged cast</h1>
            <div>
                <button
                    onClick={onClick}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Fetch Casts"}
                </button>
            </div>
        </div>
    </>
    );
}
