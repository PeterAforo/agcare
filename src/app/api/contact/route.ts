import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Always log the submission to the database first
    const record = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // Forward to the PHPMailer endpoint (best-effort — the message is already
    // safely stored in the database even if mail delivery fails).
    const mailerUrl = process.env.MAILER_URL;
    let emailed = false;
    if (mailerUrl) {
      try {
        const res = await fetch(mailerUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
          cache: "no-store",
        });
        // PHP may return HTTP 200 with an error body (display_errors), so
        // verify the JSON payload rather than trusting the status alone.
        const json = (await res.json().catch(() => null)) as
          | { success?: boolean; error?: string }
          | null;
        emailed = res.ok && json?.success === true;
        if (!emailed) {
          console.error("Mailer failed:", res.status, json?.error || "unexpected response");
        }
      } catch (err) {
        console.error("Mailer request failed:", err);
      }
    } else {
      console.warn("MAILER_URL not set — contact message logged but email not sent.");
    }

    return NextResponse.json({ success: true, id: record.id, emailed });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
