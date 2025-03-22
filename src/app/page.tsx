import Link from "next/link";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] pt-16 text-gray-800">
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
              href="/tracking"
              style={{ borderRadius: "12px" }}
            >
              <h3
                className="mb-2 text-xl font-semibold text-[#3B82F6]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Track Vitals
              </h3>
              <div
                className="text-sm text-gray-600"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Log health data manually or by voice
              </div>
            </Link>

            <Link
              className="flex flex-col rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              href="/community"
              style={{ borderRadius: "12px" }}
            >
              <h3
                className="mb-2 text-xl font-semibold text-[#3B82F6]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Community Health
              </h3>
              <div
                className="text-sm text-gray-600"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Village health trends and insights
              </div>
            </Link>

            <Link
              className="flex flex-col rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              href="/rewards"
              style={{ borderRadius: "12px" }}
            >
              <h3
                className="mb-2 text-xl font-semibold text-[#3B82F6]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Rewards
              </h3>
              <div
                className="text-sm text-gray-600"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Incentives for regular check-ups
              </div>
            </Link>

            <Link
              className="flex flex-col rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              href="/offline"
              style={{ borderRadius: "12px" }}
            >
              <h3
                className="mb-2 text-xl font-semibold text-[#3B82F6]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Works Offline
              </h3>
              <div
                className="text-sm text-gray-600"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Use without internet connection
              </div>
            </Link>
          </div>

          <button
            className="mt-6 rounded-lg bg-[#3B82F6] px-8 py-3 font-medium text-white transition-colors hover:bg-[#2563EB]"
            style={{
              fontFamily: "Roboto, sans-serif",
              borderRadius: "12px",
              height: "48px",
            }}
          >
            Start Now
          </button>
        </div>
      </main>
    </>
  );
}
