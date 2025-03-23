"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <span
                className="text-xl font-bold text-[#3B82F6]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                GraMed
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link
                href="/tracking"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#3B82F6]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Track Health
              </Link>
              <Link
                href="/rewards"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#3B82F6]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Rewards
              </Link>
              <Link
                href="/profile"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#3B82F6]"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Profile
              </Link>
              <LanguageSelector />
            </div>
          </div>

          {/* Auth buttons - desktop */}
          <div className="hidden space-x-2 sm:ml-6 sm:flex sm:items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="rounded-lg border border-[#3B82F6] px-4 py-2 text-sm font-medium text-[#3B82F6] transition-colors hover:bg-[#3B82F6] hover:text-white"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/tracking"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#3B82F6]"
              style={{ fontFamily: "Roboto, sans-serif" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Track Health
            </Link>
            <Link
              href="/rewards"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#3B82F6]"
              style={{ fontFamily: "Roboto, sans-serif" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Rewards
            </Link>
            <Link
              href="/profile"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#3B82F6]"
              style={{ fontFamily: "Roboto, sans-serif" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/clerk-auth"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-[#3B82F6]"
              style={{ fontFamily: "Roboto, sans-serif" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Clerk Auth
            </Link>

            {/* Auth buttons - mobile */}
            <div className="mt-4 flex flex-col space-y-2 border-t border-gray-200 pt-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    className="w-full rounded-md border border-[#3B82F6] bg-white px-3 py-2 text-center text-base font-medium text-[#3B82F6] hover:bg-gray-50"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
