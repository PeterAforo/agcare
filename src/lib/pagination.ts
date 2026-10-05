export const PAGE_SIZE = 12;

export interface PageParams {
  page?: string;
  q?: string;
}

/**
 * Parse search params into pagination state.
 */
export function getPagination(params: PageParams, pageSize = PAGE_SIZE) {
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const q = (params.q || "").trim();
  return {
    page,
    q,
    take: pageSize,
    skip: (page - 1) * pageSize,
  };
}

/**
 * Build a URL preserving current params while overriding some.
 */
export function buildPageUrl(
  base: string,
  params: Record<string, string | undefined>
): string {
  const clean = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== ""
  ) as [string, string][];
  if (clean.length === 0) return base;
  return `${base}?${new URLSearchParams(clean).toString()}`;
}
