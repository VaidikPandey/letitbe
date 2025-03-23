import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { latitude, longitude } = await req.json();

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "Latitude and Longitude are required." },
        { status: 400 },
      );
    }

    // Replace with actual Ola Krutrim API URL & key
    const API_KEY = process.env.KRUTRIM_API_KEY; // Store in `.env.local`
    const location = `${latitude}%2C${longitude}`;
    const API_URL = `https://api.olamaps.io/places/v1/nearbysearch/advanced?location=${location}&types=doctor&radius=10000&withCentroid=false&rankBy=popular&api_key=${API_KEY}`;

    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

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
