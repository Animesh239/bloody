"use client";

import { useState, useEffect } from "react";
import Modal from "../components/ui/Modal";
import { useRouter } from "next/navigation";

export default function EligibilityForm() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    sex: "male",
    hemoglobin: "",
    systolic: "",
    diastolic: "",
    pulse: "",
    generalHealth: "yes",
    medicalHistory: "no",
    medications: "no",
    travelHistory: "no",
    tattoosPiercings: "no",
    pregnancy: "no",
    recentDonation: "no",
    recentIllness: "no",
    lifestyle: "no",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isEligible, setIsEligible] = useState(null);
  const [reasons, setReasons] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkEligibility = () => {
    const reasons = [];
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const hemoglobin = parseFloat(formData.hemoglobin);
    const systolic = parseInt(formData.systolic);
    const diastolic = parseInt(formData.diastolic);
    const pulse = parseInt(formData.pulse);

    if (!(age >= 17 && age <= 65)) {
      if (age === 16) {
        reasons.push("Parental consent required for donors aged 16.");
      } else {
        reasons.push("Age must be between 17 and 65.");
      }
    }

    if (weight < 50) {
      reasons.push("Weight must be at least 50 kg (110 lbs).");
    }

    if (
      (formData.sex === "male" && hemoglobin < 13.0) ||
      (formData.sex === "female" && hemoglobin < 12.5)
    ) {
      reasons.push("Hemoglobin levels are below the minimum required.");
    }

    if (
      !(systolic >= 90 && systolic <= 140 && diastolic >= 60 && diastolic <= 90)
    ) {
      reasons.push("Blood pressure is outside the acceptable range.");
    }

    if (!(pulse >= 50 && pulse <= 100)) {
      reasons.push("Pulse rate is outside the acceptable range.");
    }

    if (formData.generalHealth !== "yes") {
      reasons.push("Donor should be in good general health.");
    }

    if (formData.medicalHistory !== "no") {
      reasons.push(
        "Certain medical conditions disqualify you from donating blood."
      );
    }

    if (formData.medications !== "no") {
      reasons.push("Certain medications disqualify you from donating blood.");
    }

    if (formData.travelHistory !== "no") {
      reasons.push(
        "Recent travel may temporarily defer you from donating blood."
      );
    }

    if (formData.tattoosPiercings !== "no") {
      reasons.push("Must wait at least 12 months after a tattoo or piercing.");
    }

    if (formData.sex === "female" && formData.pregnancy !== "no") {
      reasons.push("Pregnant women are not eligible to donate blood.");
    }

    if (formData.recentDonation !== "no") {
      reasons.push("Must wait at least 8 weeks between whole blood donations.");
    }

    if (formData.recentIllness !== "no") {
      reasons.push(
        "Recent illnesses may temporarily defer you from donating blood."
      );
    }

    if (formData.lifestyle !== "no") {
      reasons.push(
        "High-risk behaviors may disqualify you from donating blood."
      );
    }

    setIsEligible(reasons.length === 0);
    setReasons(reasons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkEligibility();
  };

  const goToNextPage = () => {
    setCurrentPage(2);
  };

  const goToPreviousPage = () => {
    setCurrentPage(1);
  };
  useEffect(() => {
    if (isEligible) {
      // Redirect to /loginregister after a short delay
      const timer = setTimeout(() => {
        router.push("/loginregister");
      }, 3000); // Adjust the delay as needed

      // Cleanup timeout if component unmounts
      return () => clearTimeout(timer);
    }
  }, [isEligible, router]);

  return (
    <div className="min-h-screen bg-green-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-tortoise mb-4">
          Blood Donor Eligibility Check
        </h1>
        <form onSubmit={handleSubmit}>
          {currentPage === 1 && (
            <>
              {/* Page 1 Fields */}
              <div className="mb-4">
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sex</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Hemoglobin (g/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  name="hemoglobin"
                  value={formData.hemoglobin}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Blood Pressure (Systolic/Diastolic)
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    name="systolic"
                    value={formData.systolic}
                    onChange={handleChange}
                    placeholder="Systolic"
                    className="mt-1 p-2 w-1/2 border border-tortoise rounded"
                    required
                  />
                  <input
                    type="number"
                    name="diastolic"
                    value={formData.diastolic}
                    onChange={handleChange}
                    placeholder="Diastolic"
                    className="mt-1 p-2 w-1/2 border border-tortoise rounded"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Pulse Rate (beats per minute)
                </label>
                <input
                  type="number"
                  name="pulse"
                  value={formData.pulse}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                  required
                />
              </div>
              <button
                type="button"
                onClick={goToNextPage}
                className="w-full bg-tortoise text-red-500 p-2 rounded hover:bg-tortoise-dark"
              >
                Next
              </button>
            </>
          )}
          {currentPage === 2 && (
            <>
              {/* Page 2 Fields */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Are you in good general health?
                </label>
                <select
                  name="generalHealth"
                  value={formData.generalHealth}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Do you have any significant medical history?
                </label>
                <select
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Are you currently taking any medications?
                </label>
                <select
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Have you traveled to a high-risk area recently?
                </label>
                <select
                  name="travelHistory"
                  value={formData.travelHistory}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Have you gotten a tattoo or piercing in the last 12 months?
                </label>
                <select
                  name="tattoosPiercings"
                  value={formData.tattoosPiercings}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              {formData.sex === "female" && (
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Are you currently pregnant?
                  </label>
                  <select
                    name="pregnancy"
                    value={formData.pregnancy}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full border border-tortoise rounded"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Have you donated blood in the last 8 weeks?
                </label>
                <select
                  name="recentDonation"
                  value={formData.recentDonation}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Have you had any recent illnesses or infections?
                </label>
                <select
                  name="recentIllness"
                  value={formData.recentIllness}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Do you engage in any high-risk behaviors?
                </label>
                <select
                  name="lifestyle"
                  value={formData.lifestyle}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-tortoise rounded"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={goToPreviousPage}
                  className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                >
                  Previous
                </button>
                <button
                  type="submit"
                  className="bg-tortoise text-red-300 p-2 rounded hover:bg-tortoise-dark"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
        {isEligible !== null && (
          <Modal
            title={isEligible ? "Eligible to Donate" : "Not Eligible to Donate"}
            message={
              isEligible
                ? "Congratulations! You are eligible to donate blood. Redirecting to registration..."
                : `Unfortunately, you are not eligible to donate blood. ${reasons.join(
                    " "
                  )}`
            }
            onClose={() => setIsEligible(null)}
          />
        )}
      </div>
    </div>
  );
}
