import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    // Replace with actual Ola Krutrim API URL & key
    const API_KEY = process.env.KRUTRIM_API_KEY; // Store in `.env.local`

    const API_URL = `https://api.olamaps.io/places/v1/nearbysearch/advanced?location=27.615566%2C77.588481&types=doctor&radius=10000&withCentroid=false&rankBy=popular`;

    const response = await fetch(
      "https://api.olamaps.io/places/v1/nearbysearch/advanced?location=27.615566%2C77.588481&types=doctor&radius=10000&withCentroid=false&rankBy=popular&api_key=CxU8IZxE29dZSlRkQFUxri71YRqeltTsZotfvRdy",
      {
        method: "POST",
      },
    );
    console.log(response);

    const hospitals = response.data.predictions.map((hospital: any) => ({
      name: hospital.structured_formatting.main_text,
      address: hospital.structured_formatting.secondary_text,
      phone: hospital.formatted_phone_number || "N/A",
    }));

    return NextResponse.json({ hospitals });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return NextResponse.json(
      { error: "Failed to fetch hospitals" },
      { status: 500 },
    );
  }
}
