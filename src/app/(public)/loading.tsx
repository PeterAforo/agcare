export default function PublicLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-3 border-t-transparent animate-spin"
          style={{ borderColor: "#343877", borderTopColor: "transparent" }}
        />
        <p className="text-sm" style={{ color: "#9e9e9e" }}>
          Loading...
        </p>
      </div>
    </div>
  );
}
