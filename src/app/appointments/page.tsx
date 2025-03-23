"use client";
import data from "../consts/kuchto.json";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Calendar, Check, ClipboardList, Phone, Send, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export default function AppointmentPage() {
  // Cast the result of fetchPredictions to the expected type
  const predictions = data.predictions;
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [shareRecords, setShareRecords] = useState(false);
  const [formData, setFormData] = useState({
    symptoms: "",
    duration: "",
    medications: "",
    additionalInfo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    alert("Information shared successfully!");
    // Reset form
    setFormData({
      symptoms: "",
      duration: "",
      medications: "",
      additionalInfo: "",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <main className="relative min-h-screen bg-[#F9FAFB] pt-16 text-gray-800">
      <Navbar />
      <div className="container relative z-10 mx-auto px-4 py-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-center text-3xl font-bold text-[#3B82F6]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Appointment Information
          </h1>
          <p
            className="mt-2 text-center text-lg text-gray-600"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Find and book your next healthcare appointment
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {predictions.map((prediction, index) => (
            <Dialog.Root key={index}>
              <motion.div
                className="flex cursor-pointer flex-col rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition-all"
                style={{ borderRadius: "12px" }}
                variants={itemVariants}
                whileHover="hover"
                onClick={() => setSelectedPrediction(prediction)}
              >
                <h2
                  className="mb-3 text-xl font-semibold text-[#3B82F6]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {prediction.description}
                </h2>
                <div className="mb-2">
                  <p
                    className="font-medium text-gray-800"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {prediction.structured_formatting.main_text}
                  </p>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    {prediction.structured_formatting.secondary_text}
                  </p>
                </div>

                {prediction.formatted_phone_number && (
                  <a
                    href={`tel:${prediction.formatted_phone_number}`}
                    className="mb-4 flex items-center gap-2 text-[#3B82F6] hover:text-blue-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone size={16} />
                    <span>{prediction.formatted_phone_number}</span>
                  </a>
                )}

                <div className="mt-auto pt-3">
                  <div className="mb-3 flex items-center">
                    <button
                      className="flex items-center gap-2 text-gray-700 hover:text-[#3B82F6]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShareRecords(!shareRecords);
                      }}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-white">
                        {shareRecords && (
                          <Check size={14} className="text-[#3B82F6]" />
                        )}
                      </div>
                      <span className="text-sm">
                        Share your previous records
                      </span>
                    </button>
                  </div>

                  <Link
                    href={`/booking?location=${encodeURIComponent(prediction.description)}&shareRecords=${shareRecords}`}
                    className="w-full"
                  >
                    <motion.button
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Book
                    </motion.button>
                  </Link>
                </div>
              </motion.div>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-all" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      className="text-xl font-semibold text-gray-800"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Share Information with Doctor
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="mb-4 mt-2">
                    <p className="text-sm text-gray-600">
                      {prediction?.description} –{" "}
                      {prediction?.structured_formatting.main_text}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="symptoms"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Symptoms
                      </label>
                      <textarea
                        id="symptoms"
                        name="symptoms"
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                        placeholder="Describe your symptoms..."
                        value={formData.symptoms}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="duration"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Duration
                      </label>
                      <input
                        type="text"
                        id="duration"
                        name="duration"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                        placeholder="How long have you experienced these symptoms?"
                        value={formData.duration}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="medications"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Current Medications
                      </label>
                      <input
                        type="text"
                        id="medications"
                        name="medications"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                        placeholder="List any medications you're taking"
                        value={formData.medications}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="additionalInfo"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Additional Information
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                        placeholder="Any other details you want to share..."
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-3">
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="rounded-full bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      </Dialog.Close>
                      <motion.button
                        type="button"
                        className={`flex items-center gap-2 rounded-full ${
                          formData.isSubmitted ? "bg-green-500" : "bg-[#3B82F6]"
                        } px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600`}
                      >
                        {formData.isSubmitted ? (
                          <>
                            <Check size={16} />
                            Information Shared
                          </>
                        ) : formData.isSubmitting ? (
                          "Processing..."
                        ) : (
                          <>
                            <Send size={16} />
                            Share Information
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
