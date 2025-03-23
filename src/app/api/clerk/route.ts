import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Load SIGNING_SECRET from environment variables
const SIGNING_SECRET = process.env.SIGNING_SECRET;
if (!SIGNING_SECRET) {
  throw new Error(
    "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env",
  );
}

// Define schema for validating Clerk's webhook payload
const ClerkUserWebhookSchema = z.object({
  data: z.object({
    id: z.string(),
    first_name: z.string().nullable(),
    last_name: z.string().nullable(),
    username: z.string().nullable(),
    profile_image_url: z.string().url(),
  }),
  type: z.string(),
});

export async function POST(req: Request) {
  try {
    // Initialize Svix Webhook instance
    const wh = new Webhook(SIGNING_SECRET!);

    // Get Svix headers
    const headerPayload = await headers();
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    // Validate presence of headers
    if (!svixId || !svixTimestamp || !svixSignature) {
      return new Response("Error: Missing Svix headers", { status: 400 });
    }

    // Read request body
    const payload = await req.text(); // Get raw body for signature verification

    // Verify and parse webhook event
    const evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;

    // Validate data using Zod
    const parsedData = ClerkUserWebhookSchema.parse(evt);

    // Extract user details
    const { id, first_name, last_name, username, profile_image_url } =
      parsedData.data;
    const eventType = parsedData.type;

    console.log(`Received webhook: ${eventType} for user ${id}`);

    // Check if user exists in DB
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.userId, id))
      .execute();

    if (existingUser.length === 0) {
      // Insert new user
      await db
        .insert(users)
        .values({
          userId: id,
          username:
            username ??
            `${first_name ?? ""} ${last_name ?? ""}`.trim() ??
            "Unknown",
          profileImageUrl: profile_image_url,
        })
        .execute();
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return new Response("Error: Webhook verification failed", { status: 400 });
  }
}
