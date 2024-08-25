import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-600 p-6 rounded-lg flex items-center relative">
      <img
        src={user.profilePic}
        alt="Profile"
        className="w-32 h-32 rounded-full border-4 border-white"
      />
      <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <div className="ml-6 text-white">
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <p className="text-lg">Age: {user.age}</p>
        <p className="text-lg">Location: {user.location}</p>
        <p className="text-lg">Blood Group: {user.bloodGroup}</p>
        <p className="text-lg">Donations: {user.donationCount}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
