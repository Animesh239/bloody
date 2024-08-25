"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { bloodgroups } from "../config/bloodGroups";
import { registerLab } from "../firebase/register";
import { GeoPoint } from "firebase/firestore";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { BackgroundBeams } from "../components/ui/background-beams";

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

const LabRegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodInventory, setBloodInventory] = useState([
    { bloodType: "", quantity: "" },
  ]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const addBloodInventory = () => {
    setBloodInventory([...bloodInventory, { bloodType: "", quantity: "" }]);
  };

  const handleInventoryChange = (index, field, value) => {
    const updatedInventory = [...bloodInventory];
    updatedInventory[index][field] = value;
    setBloodInventory(updatedInventory);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const labData = {
      name,
      email,
      phone,
      location: new GeoPoint(location.lat, location.lng),
      blood_inventory: bloodInventory.reduce((acc, item) => {
        acc[item.bloodType] = item.quantity;
        return acc;
      }, {}),
    };

    try {
      await registerLab(labData);
      alert("Lab registered successfully!");
      router.push("/feed"); // Adjust as needed
    } catch (error) {
      console.error("Error registering lab:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-[#1f5e5a] text-black dark:bg-gray-900">
      {/* Background Beams */}

      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center">
        <div className="relative mx-auto my-2 w-full max-w-md border border-purple-200 bg-[#adf7e9] p-8 shadow-input md:rounded-xl">
          <BottomGradient />
          <h3 className="relative z-10 bg-gradient-to-b from-neutral-700 to-neutral-900 bg-clip-text text-center font-sans text-lg  font-bold text-transparent md:text-3xl">
            Register Blood Lab
          </h3>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
            Enter the lab details below
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="my-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter Lab Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="my-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="my-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="my-4 flex flex-col items-center">
              <Label>Blood Inventory</Label>
              {bloodInventory.map((item, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <select
                    className="w-1/2 p-2 border border-teal-400 rounded"
                    value={item.bloodType}
                    onChange={(e) =>
                      handleInventoryChange(index, "bloodType", e.target.value)
                    }
                    required
                  >
                    <option value="">Select Blood Type</option>
                    {bloodgroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    className="w-1/2 p-2 border border-teal-400 rounded"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInventoryChange(index, "quantity", e.target.value)
                    }
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addBloodInventory}
                className="bg-teal-700 p-2 my-1 w-[30%]"
              >
                Add More
              </button>
            </LabelInputContainer>

            <div className="mb-4">
              <button
                type="button"
                onClick={handleLocation}
                className="bg-teal-500 text-white py-2 px-4 rounded"
              >
                Allow Location
              </button>
              {location && (
                <div className="mt-2 text-teal-600">
                  Location: {location.lat.toFixed(2)}, {location.lng.toFixed(2)}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            >
              {loading ? "Registering..." : "Register Lab"}
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default LabRegistrationForm;
