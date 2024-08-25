import React from 'react';

const Timeline = ({ donations }) => {
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold mb-4">Donation History</h3>
      <div className="space-y-4">
        {donations.map((donation, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700 font-semibold">{donation.hospital}</p>
            <p className="text-gray-500">{donation.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;