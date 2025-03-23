/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const handleSOS = async () => {
    if (confirm("Send SOS call to emergency contact?")) {
      const contacts = ["+918318616613"]; // Hardcoded for speed; fetch from DB later
      try {
        const response = await fetch("/api/sos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: "test-user", contacts }),
        });
        const result = await response.json();
        if (result.success) {
          alert("SOS call initiated!");
        } else {
          alert("Failed to send SOS call. Please try again.");
        }
      } catch (error) {
        alert("Error sending SOS call.");
      }
    }
  };

  const handleSOSClick = async () => {
    setIsLoading(true);
    setResponseMessage("");
    try {
      const response = await fetch(
        "https://api.olamaps.io/places/v1/nearbysearch/advanced?location=27.615566%2C77.588481&types=doctor&radius=10000&withCentroid=false&rankBy=popular&api_key=CxU8IZxE29dZSlRkQFUxri71YRqeltTsZotfvRdy",
        {
          method: "POST",
        },
      );
      const data = await response.json();
      if (response.ok) {
        setResponseMessage(`Sent to "${data.location}" successfully`);
      } else {
        setResponseMessage("Failed to send SOS request");
      }
    } catch (error) {
      setResponseMessage("An error occurred while sending the request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F9FAFB] pt-16 text-gray-800"></main>
  );
}
