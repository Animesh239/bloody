"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { loginUser, loginWithGoogle } from "../firebase/register"; // Import Google sign-in
import Link from "next/link";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { BackgroundBeams } from "../components/ui/background-beams";
import Types from "./types";

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

const RegisterForm = () => {
  const [stype, setStype] = useState("");

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = formData;

    const response = await loginUser(email, password);
    if (response.success) {
      setSuccessMessage("User registered successfully!");
      setError(null);
      router.push("/register"); // Redirect after successful registration
    } else {
      setError(response.error);
      setSuccessMessage("");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const response = await loginWithGoogle();
    if (response.success) {
      setSuccessMessage("Signed in with Google successfully!");
      setError(null);
      router.push("/register"); // Redirect after successful registration
    } else {
      setError(response.error);
      setSuccessMessage("");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex h-screen w-full flex-col  bg-[#1f5e5a] text-black dark:bg-gray-900">
      <div className="relative z-10 flex h-screen w-full flex-col items-center justify-center">
        <div className="relative mx-auto w-full max-w-md border border-neutral-700 bg-[#adf7e9] p-8 shadow-input md:rounded-xl">
          <BottomGradient />
          <h3 className="relative z-10 bg-gradient-to-b from-neutral-700 to-neutral-900 bg-clip-text text-center font-sans text-lg font-bold text-transparent md:text-3xl">
            Create Your Account or Login
          </h3>
          Join as:
          <Types selected={stype} onClick={setStype} />
          <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
            Fill in your details.
          </p>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-4 text-center">{successMessage}</p>
          )}
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="my-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="relative my-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>

            <button
              type="submit"
              disabled={loading}
              className="group/btn relative block h-10 w-full rounded-md bg-teal-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            >
              {loading ? "Registering..." : "Register"}
              <BottomGradient />
            </button>
          </form>
          {/* Google Sign-In Button */}
          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="group/btn relative block h-10 w-full rounded-md bg-red-400 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <div className="flex flex-row justify-center">
                  <span className="mx-2">
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                      alt="Google Logo"
                      className="w-6 h-6"
                    />
                  </span>
                  <span>Sign in/ Sign up with Google</span>
                </div>
              )}
              <BottomGradient />
            </button>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default RegisterForm;
