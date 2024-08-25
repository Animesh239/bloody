"use client";
import React, { useState } from "react";
import { registerUser } from "../firebase/register";
import { bloodgroups } from "../config/bloodGroups";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { BackgroundBeams } from "../components/ui/background-beams"; // Adjust the import path accordingly

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

const UserForm = () => {
  const [userData, setUserData] = useState({
    bloodGroup: "",
    email: "",
    location: null,
    name: "",
    phone: "",
    type: "user",
    uid: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserData((prevState) => ({
            ...prevState,
            location: { latitude, longitude }, // Store as an object
          }));
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(userData);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error during registration: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-[#1f5e5a] text-black dark:bg-gray-900">
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center">
        <div className="relative mx-auto w-full max-w-md border border-neutral-700 bg-[#adf7e9] p-8 shadow-input md:rounded-xl">
          <BottomGradient />
          <h3 className="relative z-10 bg-gradient-to-b from-neutral-700 to-neutral-900 bg-clip-text text-center font-sans text-lg  font-bold text-transparent md:text-3xl">
            Register User
          </h3>
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
            Start Donating!
          </p>

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="my-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter Name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="my-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="my-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter Phone Number"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="my-4">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <select
                id="bloodGroup"
                value={userData.bloodGroup}
                onChange={(e) =>
                  setUserData({ ...userData, bloodGroup: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                {bloodgroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </LabelInputContainer>

            <LabelInputContainer className="my-4">
              <Label>Location</Label>
              <button
                type="button"
                onClick={handleLocation}
                className="w-full py-3 px-4 bg-teal-500  text-white rounded-lg shadow-lg"
              >
                Allow Location Access
              </button>
              {userData.location && (
                <p className="mt-2 text-teal-700">
                  Location: {userData.location.latitude}°,
                  {userData.location.longitude}°
                </p>
              )}
            </LabelInputContainer>

            <button
              type="submit"
              disabled={loading}
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-lg"
            >
              {loading ? "Registering..." : "Register"}
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default UserForm;
