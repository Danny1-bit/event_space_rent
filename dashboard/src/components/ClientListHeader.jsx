import React from 'react';

const ClientListHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={() => setActiveTab("space")}
        className={`px-4 py-2 rounded-lg ${activeTab === "space" ? "bg-indigo-600 text-white" : "bg-gray-300 text-black"}`}
      >
        Clients d'Espace
      </button>
      <button
        onClick={() => setActiveTab("hall")}
        className={`px-4 py-2 rounded-lg ${activeTab === "hall" ? "bg-indigo-600 text-white" : "bg-gray-300 text-black"}`}
      >
        Clients de Salle
      </button>
    </div>
  );
};

export default ClientListHeader;