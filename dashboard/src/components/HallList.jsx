import React, { useEffect, useState } from 'react';
import HallCard from './HallCard';
import HallModal from './HallModal';
import axios from 'axios';

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchHalls = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/v1/halls');
      console.log("Fetched halls:", response.data);
      setHalls(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching halls:", error);
      setHalls([]);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  const openModal = (hall) => {
    setSelectedHall(hall);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedHall(null);
    setModalVisible(false);
  };

  const deleteHall = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/api/v1/halls/${id}`);
      setHalls(halls.filter(hall => hall._id !== id));
    } catch (error) {
      console.error("Error deleting hall:", error);
    }
  };

  const filteredHalls = halls.filter(hall =>
    hall.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Liste des Salles</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Rechercher une salle..."
          className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => openModal(null)} className="bg-blue-500 text-white p-2 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredHalls.length > 0 ? (
          filteredHalls.map(hall => (
            <HallCard key={hall._id} hall={hall} onEdit={openModal} onDelete={deleteHall} />
          ))
        ) : (
          <p className="text-center text-gray-400">Aucune salle correspondance trouvée.</p>
        )}
      </div>
      <HallModal 
        visible={modalVisible} 
        onClose={closeModal} 
        hall={selectedHall} 
        onRefresh={() => {
          fetchHalls();
          closeModal();
        }} 
      />
    </div>
  );
};

export default HallList;
