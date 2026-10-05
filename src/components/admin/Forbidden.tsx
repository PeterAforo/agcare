import { ShieldAlert } from "lucide-react";

export default function Forbidden({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <ShieldAlert className="w-12 h-12 mb-4" style={{ color: "#f58ca6" }} />
      <h1 className="text-xl font-bold mb-2" style={{ color: "#343877" }}>Access Denied</h1>
      <p className="text-sm max-w-md" style={{ color: "#9e9e9e" }}>
        {message || "You do not have permission to access this page. Contact an administrator if you believe this is an error."}
      </p>
    </div>
  );
}
