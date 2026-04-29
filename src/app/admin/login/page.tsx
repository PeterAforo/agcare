"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#292943" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo_white.png"
            alt="AGREDS"
            width={180}
            height={55}
            className="mx-auto h-12 w-auto mb-4"
            priority
          />
          <p className="text-sm" style={{ color: "#a9a9ab" }}>
            Content Management System
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl p-8 shadow-2xl">
          <h1
            className="text-xl font-bold mb-6 text-center"
            style={{ color: "#343877" }}
          >
            Sign In
          </h1>

          {error && (
            <div
              className="mb-4 p-3 rounded-lg text-sm text-center"
              style={{ backgroundColor: "#f58ca615", color: "#f58ca6" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
                style={{ color: "#343877" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@agredsghana.org"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-colors"
                style={{ borderColor: "#dee2e6", color: "#333" }}
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2"
                style={{ color: "#343877" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-opacity-30 transition-colors"
                style={{ borderColor: "#dee2e6", color: "#333" }}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              style={{ backgroundColor: "#343877" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "#65656b" }}
        >
          &copy; {new Date().getFullYear()} AGREDS. All rights reserved.
        </p>
      </div>
    </div>
  );
}
