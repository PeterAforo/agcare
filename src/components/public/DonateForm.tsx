"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const AMOUNTS = [10, 25, 50, 100, 250, 500];
const CAUSES = [
  "General Fund",
  "Health & Medical Outreach",
  "Education & Child Development",
  "Women's Empowerment",
  "Community Development",
  "Emergency Relief",
];

export default function DonateForm() {
  const params = useSearchParams();
  const causeParam = params.get("cause");
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    cause: causeParam && CAUSES.includes(causeParam) ? causeParam : "General Fund",
    message: "",
  }));
  const [amount, setAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const finalAmount = customAmount ? parseFloat(customAmount) : parseFloat(amount);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!(finalAmount > 0)) {
      setStatus("error");
      setErrorMsg("Please enter a valid amount.");
      return;
    }
    setStatus("processing");
    setErrorMsg("");
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: finalAmount }),
      });
      const data = await res.json();
      if (res.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setStatus("error");
      setErrorMsg(data.error || "Could not start payment. Please try again.");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-30";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-3" style={{ color: "#343877" }}>
          Choose Amount (GHS)
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => { setAmount(String(a)); setCustomAmount(""); }}
              className="px-3 py-2.5 rounded-lg border text-sm font-bold transition-colors"
              style={{
                borderColor: !customAmount && amount === String(a) ? "#2ec774" : "#dee2e6",
                backgroundColor: !customAmount && amount === String(a) ? "#2ec774" : "white",
                color: !customAmount && amount === String(a) ? "white" : "#555",
              }}
            >
              ₵{a}
            </button>
          ))}
        </div>
        <input
          type="number"
          min="1"
          step="0.01"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Or enter a custom amount"
          className={inputClass}
          style={{ borderColor: "#dee2e6", color: "#333" }}
        />
      </div>

      <div>
        <label htmlFor="cause" className="block text-sm font-semibold mb-2" style={{ color: "#343877" }}>
          Designate To
        </label>
        <select
          id="cause"
          value={form.cause}
          onChange={(e) => setForm((f) => ({ ...f, cause: e.target.value }))}
          className={inputClass}
          style={{ borderColor: "#dee2e6", color: "#333" }}
        >
          {CAUSES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="dname" className="block text-sm font-semibold mb-2" style={{ color: "#343877" }}>
            Full Name
          </label>
          <input
            id="dname"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your full name"
            className={inputClass}
            style={{ borderColor: "#dee2e6", color: "#333" }}
          />
        </div>
        <div>
          <label htmlFor="demail" className="block text-sm font-semibold mb-2" style={{ color: "#343877" }}>
            Email
          </label>
          <input
            id="demail"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className={inputClass}
            style={{ borderColor: "#dee2e6", color: "#333" }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="dphone" className="block text-sm font-semibold mb-2" style={{ color: "#343877" }}>
          Phone (optional)
        </label>
        <input
          id="dphone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="+233 XX XXX XXXX"
          className={inputClass}
          style={{ borderColor: "#dee2e6", color: "#333" }}
        />
      </div>

      <button
        type="submit"
        disabled={status === "processing"}
        className="w-full px-8 py-4 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        style={{ backgroundColor: "#2ec774" }}
      >
        {status === "processing" ? "Redirecting to secure payment…" : `Donate ${finalAmount > 0 ? `₵${finalAmount}` : ""} Now`}
      </button>

      {status === "error" && (
        <p className="text-sm font-medium text-center" style={{ color: "#f58ca6" }}>
          {errorMsg}
        </p>
      )}
      <p className="text-xs text-center" style={{ color: "#9e9e9e" }}>
        Secure payment powered by PaySwitch Teller. You will be redirected to complete your donation.
      </p>
    </form>
  );
}
