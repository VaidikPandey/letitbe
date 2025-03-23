"use client";

import { useState } from "react";

export default function TrackingPage() {
  const [userData, setUserData] = useState({
    name: "",
    bloodPressureLow: 0,
    bloodPressureHigh: 0,
    bloodSugar: 0,
    height: 0,
    weight: 0,
    emergency_number: "+918318616613",
    dateOfBirth: "",
    oxygenLevel: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log("Submitted data:", userData);
    alert("Data submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-indigo-900">
          Health Tracking
        </h1>

        <div className="mb-8 overflow-hidden rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-semibold text-indigo-800">
            Current Health Metrics
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-indigo-50 p-4">
              <p className="text-sm text-indigo-600">Name</p>
              <p className="font-medium text-gray-800">
                {userData.name || "Not set"}
              </p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <p className="text-sm text-indigo-600">Blood Pressure</p>
              <p className="font-medium text-gray-800">
                {userData.bloodPressureHigh}/{userData.bloodPressureLow} mmHg
              </p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <p className="text-sm text-indigo-600">Blood Sugar</p>
              <p className="font-medium text-gray-800">
                {userData.bloodSugar} mg/dL
              </p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <p className="text-sm text-indigo-600">Height</p>
              <p className="font-medium text-gray-800">{userData.height} cm</p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <p className="text-sm text-indigo-600">Weight</p>
              <p className="font-medium text-gray-800">{userData.weight} kg</p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <p className="text-sm text-indigo-600">Emergency Contact</p>
              <p className="font-medium text-gray-800">
                {userData.emergency_number}
              </p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <p className="text-sm text-indigo-600">Date of Birth</p>
              <p className="font-medium text-gray-800">
                {userData.dateOfBirth || "Not set"}
              </p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4">
              <p className="text-sm text-indigo-600">Oxygen Level</p>
              <p className="font-medium text-gray-800">
                {userData.oxygenLevel}%
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-xl bg-white p-6 shadow-lg"
        >
          <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-semibold text-indigo-800">
            Update Health Information
          </h2>

          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-indigo-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="mb-1 block text-sm font-medium text-indigo-600"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={userData.dateOfBirth}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="bloodPressureHigh"
                className="mb-1 block text-sm font-medium text-indigo-600"
              >
                Blood Pressure (Systolic)
              </label>
              <input
                type="number"
                id="bloodPressureHigh"
                name="bloodPressureHigh"
                value={userData.bloodPressureHigh}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="bloodPressureLow"
                className="mb-1 block text-sm font-medium text-indigo-600"
              >
                Blood Pressure (Diastolic)
              </label>
              <input
                type="number"
                id="bloodPressureLow"
                name="bloodPressureLow"
                value={userData.bloodPressureLow}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="bloodSugar"
                className="mb-1 block text-sm font-medium text-indigo-600"
              >
                Blood Sugar (mg/dL)
              </label>
              <input
                type="number"
                id="bloodSugar"
                name="bloodSugar"
                value={userData.bloodSugar}
                onChange={handleChange}
                step="0.1"
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="oxygenLevel"
                className="mb-1 block text-sm font-medium text-indigo-600"
              >
                Oxygen Level (%)
              </label>
              <input
                type="number"
                id="oxygenLevel"
                name="oxygenLevel"
                value={userData.oxygenLevel}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="height"
                className="mb-1 block text-sm font-medium text-indigo-600"
              >
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={userData.height}
                onChange={handleChange}
                step="0.1"
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="mb-1 block text-sm font-medium text-indigo-600"
              >
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={userData.weight}
                onChange={handleChange}
                step="0.1"
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="emergency_number"
                className="mb-1 block text-sm font-medium text-indigo-600"
              >
                Emergency Contact Number
              </label>
              <input
                type="tel"
                id="emergency_number"
                name="emergency_number"
                value={userData.emergency_number}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-8 py-3 text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Health Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
