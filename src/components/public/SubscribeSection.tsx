"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-[60px]" style={{ backgroundColor: "#343877" }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Title — col-lg-4 */}
          <h2
            className="text-[32px] lg:text-[50px] font-bold mb-[30px] lg:mb-0 lg:w-4/12"
            style={{ color: "#fff" }}
          >
            Subscribe.
          </h2>

          {/* Form — col-lg-8 */}
          <form
            onSubmit={handleSubmit}
            className="lg:w-8/12 flex flex-col sm:flex-row sm:items-end sm:justify-between sm:pb-[10px] gap-[30px] sm:gap-0"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your E-mail"
              required
              className="bg-transparent border-0 border-b-2 rounded-none w-full max-w-[470px] py-[7px] mr-[30px] text-white placeholder:text-white/50 focus:outline-none transition-colors"
              style={{ borderBottomColor: "#4d4b84" }}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="text-white text-[14px] font-bold uppercase border-2 border-accent-yellow bg-transparent px-[55px] py-[13px] rounded-full hover:bg-accent-yellow hover:text-[#333] transition-all disabled:opacity-50 shrink-0"
            >
              {status === "loading" ? "..." : "Submit"}
            </button>
          </form>
        </motion.div>
        {status === "success" && (
          <p className="text-secondary text-sm mt-3 lg:ml-[33.333%]">Thank you for subscribing!</p>
        )}
        {status === "error" && (
          <p className="text-accent-red text-sm mt-3 lg:ml-[33.333%]">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
