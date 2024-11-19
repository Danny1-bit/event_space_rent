// import React from "react";
// import Hero from "../components/Hero";
// import SpaceCarousel from "../components/SpaceCarousel";
// import Biography from "../components/Biography";
// import Department from "../components/Department";
// import MessageForm from "../components/MessageForm";
// import Subscript from "../components/Subscript";
// import Location from "../components/Location";
// const Home = () => {
//   return (
//     <div>
//       <Hero />
//       <SpaceCarousel />
//       <Biography />
//       <Department />
//       <MessageForm />
//     <Subscript />
//       <Location />
//     </div>
//   );
// };

// export default Home;
// Home.js
import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import SpaceCarousel from "../components/SpaceCarousel";
import Department from "../components/Department";
import MessageForm from "../components/MessageForm";
import Location from "../components/Location";
import HallCard from "../components/HallCard";
import ReservationModal from "../components/ReservationModal";
import Modal from "../components/Modal";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/halls");
        setHalls(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des salles :", error.message || String(error));
        setHalls([]);
      }
    };
    fetchHalls();
  }, []);

  const handleHallClick = (hall) => {
    setSelectedHall(hall);
    setIsModalOpen(true);
  };

  const handleReserveClick = (hall) => {
    setSelectedHall(hall);
    setIsReserveModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHall(null);
  };

  const handleCloseReserveModal = () => {
    setIsReserveModalOpen(false);
    setSelectedHall(null);
  };

  const showNext = () => {
    if (currentIndex < halls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const showPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <Hero />
      <SpaceCarousel />
      <Department />

      <div className="p-4 mb-16">
        <h2 className="text-2xl font-bold mb-4">Nos Salles</h2>
        {halls.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden min-h-[420px]">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {halls.map((hall) => (
                  <div key={hall._id} className="flex-shrink-0 w-80 h-full mx-2">
                    <HallCard 
                      hall={hall} 
                      onHallClick={handleHallClick} 
                      onReserveClick={handleReserveClick} 
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={showPrev} 
              disabled={currentIndex === 0} // Disable at the beginning
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-transparent ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ChevronLeftIcon className="h-8 w-8 text-gray-700" />
            </button>
            <button 
              onClick={showNext} 
              disabled={currentIndex === halls.length - 1} // Disable at the end
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-transparent ${currentIndex === halls.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ChevronRightIcon className="h-8 w-8 text-gray-700" />
            </button>
          </div>
        ) : (
          <p>Chargement des salles...</p>
        )}

        {isModalOpen && selectedHall && (
          <Modal hall={selectedHall} onClose={handleCloseModal} />
        )}

        {isReserveModalOpen && selectedHall && (
          <ReservationModal
            hall={selectedHall}
            onReserve={() => console.log("Réservé:", selectedHall.name)}
            onClose={handleCloseReserveModal}
          />
        )}
      </div>

      <MessageForm className="mt-8" />
      <Location />
    </div>
  );
};

export default Home;
