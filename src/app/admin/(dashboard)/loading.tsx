export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded-lg" style={{ backgroundColor: "#e9ecef" }} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="h-10 w-10 rounded-lg mb-3" style={{ backgroundColor: "#f1f3f5" }} />
            <div className="h-4 w-16 rounded" style={{ backgroundColor: "#f1f3f5" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
