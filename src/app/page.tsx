import Link from "next/link";
import Navbar from "../components/Navbar";

export default function HomePage() {
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
          <Link
            className="flex flex-col rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            href="/sos"
            style={{ borderRadius: "12px", backgroundColor: "#FF4C4C" }}
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
          </Link>

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
