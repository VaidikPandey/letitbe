"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  CalendarDays,
  Medal,
  Pill,
  Stethoscope,
  Gift,
  Trophy,
  Clock,
  Home,
  User,
  Bell,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// Custom components instead of using external libraries
const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className || ""}`}
  >
    {children}
  </div>
);

const CardHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={`p-4 ${className || ""}`}>{children}</div>;

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <h3 className={`text-lg font-medium ${className || ""}`}>{children}</h3>;

const CardContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={`p-4 ${className || ""}`}>{children}</div>;

const Badge = ({
  variant,
  className,
  children,
}: {
  variant?: "default" | "outline";
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variant === "outline" ? "border border-gray-300" : ""} ${className || ""} `}
  >
    {children}
  </span>
);

const Button = ({
  className,
  disabled,
  children,
}: {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    className={`rounded-md px-4 py-2 font-medium text-white ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"} ${className || ""} `}
    disabled={disabled}
  >
    {children}
  </button>
);

export default function RewardsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const rewards = [
    {
      duration: "1 Month",
      title: "Free Checkup",
      description:
        "Claim a comprehensive health checkup at any of our partner clinics.",
      icon: <Stethoscope className="h-8 w-8 text-[#3B82F6]" />,
      status: "Unlocked",
    },
    {
      duration: "2 Months",
      title: "Free Medicines",
      description:
        "Get a month's supply of your prescribed medications at no cost.",
      icon: <Pill className="h-8 w-8 text-green-500" />,
      status: "Unlocked",
    },
    {
      duration: "3 Months",
      title: "Wellness Package",
      description:
        "Access to premium wellness services including nutrition consultation.",
      icon: <Gift className="h-8 w-8 text-purple-500" />,
      status: "Locked",
    },
    {
      duration: "6 Months",
      title: "Health Insurance Discount",
      description:
        "15% discount on annual health insurance premiums with our partners.",
      icon: <Medal className="h-8 w-8 text-yellow-500" />,
      status: "Locked",
    },
    {
      duration: "1 Year",
      title: "Premium Membership",
      description:
        "Exclusive access to premium features and priority appointments.",
      icon: <Trophy className="h-8 w-8 text-amber-500" />,
      status: "Locked",
    },
    {
      duration: "2 Years",
      title: "Ultimate Reward Package",
      description:
        "Comprehensive health package including specialized consultations and treatments.",
      icon: <Trophy className="h-8 w-8 text-red-500" />,
      status: "Locked",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-[#F9FAFB] pt-16 text-gray-800">
      <Navbar />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto max-w-5xl px-4 py-12">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="mb-2 text-3xl font-bold text-[#3B82F6]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Your Streak Rewards
          </h1>
          <p
            className="text-gray-600"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Maintain your streak to unlock exclusive health benefits
          </p>

          <motion.div
            className="mt-6 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="flex items-center gap-3 rounded-lg bg-white px-6 py-4 shadow-sm"
              style={{ borderRadius: "12px" }}
            >
              <CalendarDays className="h-6 w-6 text-[#3B82F6]" />
              <span
                className="font-medium text-gray-700"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Current Streak:{" "}
              </span>
              <Badge variant="default" className="bg-[#3B82F6] text-white">
                45 days
              </Badge>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {rewards.map((reward, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className="h-full overflow-hidden transition-shadow hover:shadow-md"
                style={{ borderRadius: "12px" }}
              >
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-2">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-blue-200 font-semibold text-[#3B82F6]"
                    >
                      <Clock className="mr-1 h-3 w-3" /> {reward.duration}
                    </Badge>
                    <Badge
                      variant={
                        reward.status === "Unlocked" ? "default" : "outline"
                      }
                      className={
                        reward.status === "Unlocked"
                          ? "bg-green-500 text-white"
                          : "text-gray-500"
                      }
                    >
                      {reward.status}
                    </Badge>
                  </div>
                  <CardTitle
                    className="mt-3 flex items-center gap-3"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <div className="rounded-full bg-blue-50 p-2">
                      {reward.icon}
                    </div>
                    <span className="font-bold text-gray-800">
                      {reward.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p
                    className="mb-6 text-gray-600"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {reward.description}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full rounded-full ${
                        reward.status === "Unlocked"
                          ? "bg-[#3B82F6] shadow-sm hover:bg-blue-600"
                          : "bg-gray-300"
                      }`}
                      disabled={reward.status !== "Unlocked"}
                    >
                      {reward.status === "Unlocked"
                        ? "Claim Reward"
                        : "Keep Streak Going!"}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 rounded-lg border border-gray-100 bg-white p-8 text-center shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ borderRadius: "12px" }}
        >
          <h2
            className="mb-3 text-2xl font-semibold text-[#3B82F6]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            How Rewards Work
          </h2>
          <p
            className="mx-auto max-w-2xl text-gray-600"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Maintain your medication consistency to build your streak. As your
            streak grows, you'll unlock greater rewards to support your health
            journey. Our rewards program is designed to encourage regular
            medication adherence.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="mt-6 rounded-full bg-[#3B82F6] shadow-sm hover:bg-blue-600">
              View All Rewards
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
