"use client";

import React, { useState } from "react";
import ProfileHeader from "../components/ui/ProfileHeader";
import Timeline from "../components/ui/Timeline";
import KarmaCard from "../components/ui/KarmaCard";
import ModalDialog from "../components/ui/ModalDialog";

const ProfilePage = () => {
  const user = {
    profilePic: "https://via.placeholder.com/120",
    name: "John Doe",
    age: 32,
    location: "New York, USA",
    bloodGroup: "O+",
    donationCount: 5,
  };

  const donations = [
    { hospital: "City Hospital", date: "Jan 10, 2023" },
    { hospital: "Red Cross Clinic", date: "Mar 15, 2023" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHelpClick = () => {
    setIsModalOpen(true);
  };

  const handleAnswer = (answer) => {
    console.log("User answer:", answer);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ProfileHeader user={user} />
      <div className="flex mt-6 space-x-6">
        <div className="w-2/3 max-h-3/5 bg-slate-200 p-3 rounded-xl">
          <Timeline donations={donations} />
        </div>
        <div className="w-1/3">
          <KarmaCard
            karmaPoints={user.donationCount * 10}
            onHelpClick={handleHelpClick}
          />
        </div>
      </div>
      <ModalDialog
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default ProfilePage;