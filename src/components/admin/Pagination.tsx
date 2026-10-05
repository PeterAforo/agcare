import Link from "next/link";
import { buildPageUrl } from "@/lib/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  total: number;
  pageSize: number;
  /** Base path, e.g. /admin/blog */
  base: string;
  /** Extra params to preserve (e.g. q) */
  params?: Record<string, string | undefined>;
}

export default function Pagination({ page, total, pageSize, base, params = {} }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  function url(p: number) {
    return buildPageUrl(base, { ...params, page: String(p) });
  }

  // Compact page list: first, last, current ±2
  const pages: (number | "…")[] = [];
  const window = 2;
  const added = new Set<number>();
  const push = (n: number) => {
    if (n >= 1 && n <= totalPages && !added.has(n)) {
      added.add(n);
      pages.push(n);
    }
  };
  push(1);
  for (let i = page - window; i <= page + window; i++) push(i);
  push(totalPages);
  pages.sort((a, b) => (a === "…" || b === "…" ? 0 : (a as number) - (b as number)));

  const withEllipsis: (number | "…")[] = [];
  let prev = 0;
  for (const p of pages as number[]) {
    if (p - prev > 1) withEllipsis.push("…");
    withEllipsis.push(p);
    prev = p;
  }

  const btnClass =
    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold border transition-colors hover:bg-gray-100";

  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-xs" style={{ color: "#9e9e9e" }}>
        Page {page} of {totalPages} · {total} total
      </p>
      <div className="flex items-center gap-1">
        {page > 1 ? (
          <Link href={url(page - 1)} className={btnClass} style={{ borderColor: "#dee2e6", color: "#343877" }}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        ) : (
          <span className={`${btnClass} opacity-40`} style={{ borderColor: "#dee2e6", color: "#9e9e9e" }}>
            <ChevronLeft className="w-4 h-4" />
          </span>
        )}
        {withEllipsis.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className="px-1 text-xs" style={{ color: "#9e9e9e" }}>…</span>
          ) : (
            <Link
              key={p}
              href={url(p)}
              className={btnClass}
              style={{
                borderColor: p === page ? "#2ec774" : "#dee2e6",
                backgroundColor: p === page ? "#2ec774" : "white",
                color: p === page ? "white" : "#343877",
              }}
            >
              {p}
            </Link>
          )
        )}
        {page < totalPages ? (
          <Link href={url(page + 1)} className={btnClass} style={{ borderColor: "#dee2e6", color: "#343877" }}>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <span className={`${btnClass} opacity-40`} style={{ borderColor: "#dee2e6", color: "#9e9e9e" }}>
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </div>
  );
}
