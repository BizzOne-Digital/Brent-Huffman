import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { sendLeadNotificationEmail } from "@/lib/send-lead-notification";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, service } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const lead = await Lead.create({ name, email, phone, message, service });
    await sendLeadNotificationEmail({ name, email, phone, message, service });
    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to submit" }, { status: 500 });
  }
}
