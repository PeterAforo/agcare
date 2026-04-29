import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#292943" }}
    >
      <div className="text-center max-w-lg">
        <h1
          className="font-bold mb-2"
          style={{ fontSize: 120, color: "#efc940", lineHeight: 1 }}
        >
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="mb-8" style={{ color: "#a9a9ab" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: "#2ec774" }}
          >
            Go Home
          </Link>
          <Link
            href="/contacts"
            className="inline-block px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
            style={{
              border: "2px solid #efc940",
              color: "#efc940",
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
