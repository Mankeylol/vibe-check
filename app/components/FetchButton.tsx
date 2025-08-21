"use client";

export default function FetchButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (<>
  <div className="flex justify-center">
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {loading ? "Loading..." : "Fetch Casts"}
    </button>
    </div>
    </>
  );
}
