"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addHospitalToFirestore } from "../firebase/register"; // Import Firestore function
import { bloodgroups } from "../config/bloodGroups";

const RegisterHospital = () => {
  const [hospitalData, setHospitalData] = useState({
    name: "",
    email: "",
    phone: "",
    blood_inventory: {},
    location: null,
  });

  const [bloodInventoryFields, setBloodInventoryFields] = useState([
    { bloodGroup: "", value: "" },
  ]);
  const router = useRouter();

  const handleBloodInventoryChange = (index, field, value) => {
    const newFields = [...bloodInventoryFields];
    newFields[index][field] = value;
    setBloodInventoryFields(newFields);
  };

  const handleAddMoreBloodGroup = () => {
    setBloodInventoryFields([
      ...bloodInventoryFields,
      { bloodGroup: "", value: "" },
    ]);
  };

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setHospitalData({
          ...hospitalData,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the blood inventory from dynamic inputs
    const blood_inventory = {};
    bloodInventoryFields.forEach(({ bloodGroup, value }) => {
      if (bloodGroup && value) blood_inventory[bloodGroup] = value;
    });

    const finalData = { ...hospitalData, blood_inventory };

    try {
      await addHospitalToFirestore(finalData);
      alert("Registration successful!");
      router.push("/feed"); // Redirect on successful registration
    } catch (error) {
      console.error(error);
      alert("Error registering hospital");
    }
  };

  return (
    <div className="bg-teal-50 p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-600 mb-6">
        Register Hospital
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-teal-600">Hospital Name</label>
          <input
            type="text"
            className="w-full p-2 border border-teal-300 rounded"
            value={hospitalData.name}
            onChange={(e) =>
              setHospitalData({ ...hospitalData, name: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-teal-600">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-teal-300 rounded"
            value={hospitalData.email}
            onChange={(e) =>
              setHospitalData({ ...hospitalData, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-teal-600">Phone</label>
          <input
            type="text"
            className="w-full p-2 border border-teal-300 rounded"
            value={hospitalData.phone}
            onChange={(e) =>
              setHospitalData({ ...hospitalData, phone: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-teal-600">Blood Inventory</label>
          {bloodInventoryFields.map((field, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <select
                className="w-1/2 p-2 border border-teal-300 rounded"
                value={field.bloodGroup}
                onChange={(e) =>
                  handleBloodInventoryChange(
                    index,
                    "bloodGroup",
                    e.target.value
                  )
                }
                required
              >
                <option value="">Select Blood Group</option>
                {bloodgroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              <input
                type="number"
                className="w-1/2 p-2 border border-teal-300 rounded"
                value={field.value}
                onChange={(e) =>
                  handleBloodInventoryChange(index, "value", e.target.value)
                }
                placeholder="Quantity"
                required
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-teal-500 text-white p-2 rounded mt-2"
            onClick={handleAddMoreBloodGroup}
          >
            Add More Blood Group
          </button>
        </div>

        <div>
          <label className="block text-teal-600">Location</label>
          <button
            type="button"
            className="bg-teal-500 text-white p-2 rounded"
            onClick={handleLocationAccess}
          >
            Allow Location Access
          </button>
        </div>
        {hospitalData.location && (
          <span className="mt-2 text-teal-700">
            Location: {hospitalData.location.latitude}°,
            {hospitalData.location.longitude}°
          </span>
        )}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-3 rounded"
        >
          Register Hospital
        </button>
      </form>
    </div>
  );
};

export default RegisterHospital;
