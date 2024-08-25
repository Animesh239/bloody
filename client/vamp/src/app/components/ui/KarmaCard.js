import React from 'react';

const KarmaCard = ({ karmaPoints, onHelpClick }) => {
  return (
    <div className="bg-teal-300 text-white p-6 rounded-lg shadow-lg h-96">
      <h3 className="text-2xl font-bold mb-4">Karma Points: {karmaPoints}</h3>
      <button
        className="bg-red-500 text-white py-2 px-4 rounded-full text-lg"
        onClick={onHelpClick}
      >
        Want your help? 😊
      </button>
    </div>
  );
};

export default KarmaCard;