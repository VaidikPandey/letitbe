/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import twilio from "twilio";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export async function POST(request: Request) {
  const { userId, contacts } = await request.json();

  try {
    // Fetch user (optional, for validation)
    // const user = await db.select().from(users).where({ id: userId }).get();
    //if (!user)
    //return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Make SOS call
    for (const contact of contacts) {
      await client.calls.create({
        url: "https://handler.twilio.com/twiml/your_twiml_bin_id", // Replace with your TwiML Bin URL
        to: contact,
        from: process.env.TWILIO_PHONE_NUMBER!,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SOS call failed:", error);
    return NextResponse.json(
      { error: "Failed to send SOS call" },
      { status: 500 },
    );
  }
}
