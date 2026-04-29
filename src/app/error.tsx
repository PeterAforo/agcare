"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#292943" }}
    >
      <div className="text-center max-w-lg">
        <h1
          className="font-bold mb-2"
          style={{ fontSize: 80, color: "#f58ca6", lineHeight: 1 }}
        >
          Oops!
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong
        </h2>
        <p className="mb-8" style={{ color: "#a9a9ab" }}>
          An unexpected error occurred. Please try again or contact us if the
          problem persists.
        </p>
        <button
          onClick={reset}
          className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#2ec774" }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
