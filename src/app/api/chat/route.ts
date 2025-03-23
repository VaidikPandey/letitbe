import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to fetch hospitals (Replace this with Ola Krutrim API)
async function fetchHospitals() {
  try {
    // Make a GET request to our Ola Krutrim API route
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

    // Parse the response from our Ola route

    return hospitals || [];
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    // Fallback data in case of error
    return [
      {
        name: "City Hospital (Fallback)",
        address: "Main Road, Delhi",
        phone: "1234567890",
      },
      {
        name: "Sunshine Clinic (Fallback)",
        address: "Near Bus Stand, Mumbai",
        phone: "9876543210",
      },
    ];
  }
}

// Store chat history in-memory (can use DB in production)
const chatHistory: { role: "user" | "assistant"; content: string }[] = [];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Add user message to chat history
    chatHistory.push({ role: "user", content: message });

    // Detect user intent (hospital search or general chat)
    const classification = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "Classify intent: Reply with 'hospital' if user asks for nearby hospitals, otherwise reply 'general'.",
        },
        { role: "user", content: message },
      ],
    });

    const intent = classification.choices[0].message.content
      .trim()
      .toLowerCase();

    if (intent === "hospital") {
      const hospitals = await fetchHospitals();
      const hospitalMessage = hospitals
        .map((h) => `${h.name}, ${h.address}, 📞 ${h.phone}`)
        .join("\n");

      // Save API-generated response
      chatHistory.push({
        role: "assistant",
        content: `Nearby hospitals:\n${hospitalMessage}`,
      });

      return NextResponse.json({ type: "api_fetch", message: hospitalMessage });
    }

    // Continue normal chat
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful chatbot assisting users with health queries and general questions.",
        },
        ...chatHistory,
      ],
    });

    const botReply = chatResponse.choices[0].message.content;

    // Add assistant's reply to chat history
    chatHistory.push({ role: "assistant", content: botReply });

    return NextResponse.json({ type: "chat", message: botReply });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
