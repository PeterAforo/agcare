import { Search } from "lucide-react";

interface Props {
  /** Current query */
  q?: string;
  /** Form action (current page path) */
  action: string;
  placeholder?: string;
}

/**
 * Server-rendered search box — submits via GET, preserving progressive enhancement.
 */
export default function SearchInput({ q = "", action, placeholder = "Search…" }: Props) {
  return (
    <form action={action} method="get" className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "#9e9e9e" }} />
      <input
        type="search"
        name="q"
        defaultValue={q}
        placeholder={placeholder}
        className="w-64 pl-9 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30"
        style={{ borderColor: "#dee2e6" }}
      />
    </form>
  );
}
