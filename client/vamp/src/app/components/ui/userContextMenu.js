import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

const UserContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative">
      <img
        src="/default-profile.png"
        alt="Profile"
        className="h-10 w-10 rounded-full cursor-pointer"
        onClick={toggleMenu}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <button
            onClick={goToDashboard}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserContextMenu;
