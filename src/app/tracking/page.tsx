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
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] pt-16 text-gray-800">
      <Navbar />
      <div className="container flex max-w-2xl flex-col items-center justify-center gap-8 px-4 py-12">
        <div className="mb-4">
          <h1
            className="text-center text-5xl font-bold text-[#3B82F6]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            GraMed
          </h1>
          <p
            className="mt-2 text-center text-lg text-gray-600"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Rural Health Tracking
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                className="flex flex-col rounded-lg border border-gray-100 bg-[#FF4C4C] p-5 shadow-sm transition-shadow hover:shadow-md"
                style={{ borderRadius: "12px" }}
              >
                <h3
                  className="mb-2 text-xl font-semibold text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  SOS
                </h3>
                <div
                  className="text-sm text-white"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Emergency Assistance
                </div>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-all" />
              <Dialog.Content className="animate-in fade-in zoom-in-95 fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title
                  className="mb-4 border-b pb-3 text-xl font-semibold text-gray-800"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Emergency Assistance
                </Dialog.Title>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-b-blue-500 border-l-transparent border-r-transparent border-t-blue-500"></div>
                    <p className="font-medium text-blue-500">
                      Processing your request...
                    </p>
                  </div>
                ) : responseMessage ? (
                  <div
                    className={`rounded-lg p-4 ${responseMessage.includes("successfully") ? "bg-green-50" : "bg-red-50"} mb-4`}
                  >
                    <p
                      className={`text-center font-medium ${
                        responseMessage.includes("successfully")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {responseMessage}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <Dialog.Close asChild>
                        <button className="rounded-full bg-gray-100 px-5 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200">
                          Close
                        </button>
                      </Dialog.Close>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <p
                      className="mb-2 text-gray-600"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      Do you need immediate emergency assistance?
                    </p>

                    <a
                      href="tel:+8471073818"
                      className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-3 font-medium text-white transition-colors hover:bg-green-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      Call Emergency
                    </a>

                    <button
                      className="rounded-full bg-blue-500 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-600"
                      onClick={handleSOS}
                    >
                      Send SOS Alert
                    </button>

                    <Dialog.Close asChild>
                      <button className="rounded-full bg-gray-100 px-5 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200">
                        Cancel
                      </button>
                    </Dialog.Close>
                  </div>
                )}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <Link
            className="flex flex-col rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            href="/appointments"
            style={{ borderRadius: "12px" }}
          >
            <h3
              className="mb-2 text-xl font-semibold text-[#3B82F6]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Appointments
            </h3>
            <div
              className="text-sm text-gray-600"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Schedule your appointments
            </div>
          </Link>

          <Link
            className="flex flex-col rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            href="/tracking"
            style={{ borderRadius: "12px" }}
          >
            <h3
              className="mb-2 text-xl font-semibold text-[#3B82F6]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Log Health Details
            </h3>
            <div
              className="text-sm text-gray-600"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Log your health data manually
            </div>
          </Link>

          <Link
            className="flex flex-col rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            href="/ai-bot"
            style={{ borderRadius: "12px" }}
          >
            <h3
              className="mb-2 text-xl font-semibold text-[#3B82F6]"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Talk to AI Bot
            </h3>
            <div
              className="text-sm text-gray-600"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Get assistance from our AI bot
            </div>
          </Link>
        </div>

        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
          <h3
            className="mb-2 text-xl font-semibold text-[#3B82F6]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            About GraMed
          </h3>
          <p
            className="text-gray-600"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            GraMed is a comprehensive rural health tracking application designed
            to help individuals in rural areas monitor and manage their health
            effectively. Our app provides features such as emergency assistance,
            appointment scheduling, health data logging, and AI-based assistance
            to ensure that users receive timely and accurate health information.
          </p>
        </div>
      </div>
    </main>
  );
}
