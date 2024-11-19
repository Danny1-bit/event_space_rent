import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline'; // Assurez-vous que le chemin est correct
import { FaMapMarkerAlt, FaUser, FaDollarSign } from 'react-icons/fa';

const HallCard = ({ hall, onReserveClick, onHallClick }) => {
  const handleImageLoad = (e) => {
    console.log('Image chargée avec succès');
  };

  const handleImageError = (e) => {
    console.error('Erreur lors du chargement de l\'image');
    e.target.src = '/default-image-url'; // Remplacez par une URL d'image par défaut
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 hover:shadow-xl">
      {hall.image ? (
        <img 
          src={`http://localhost:3030/${hall.image}`}
          alt={hall.name || 'Image du hall'} 
          className="w-full h-48 object-cover transition-opacity duration-300"
          onLoad={handleImageLoad}
          onError={handleImageError}
          crossOrigin="anonymous"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-300">
          <span className="text-gray-500">Image non disponible</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {hall.name || 'Nom non disponible'}
        </h3>
        <div className="flex items-center text-gray-600 mb-1">
          <FaMapMarkerAlt className="mr-1 text-blue-500" />
          <span>{hall.location || 'Emplacement non disponible'}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-1">
          <FaUser className="mr-1 text-blue-500" />
          <span>Capacité : {hall.capacity || 'Inconnue'} personnes</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <FaDollarSign className="mr-1 text-blue-500" />
          <span className="font-bold text-lg">${hall.price || 'N/A'} / jour</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              onReserveClick(hall);
            }}
          >
            <PlusIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            Réserver
          </button>

          <button 
            className="mt-2 text-blue-600 underline hover:text-blue-700 transition duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onHallClick(hall); // Déclenche l'ouverture de la modale avec la description
            }}
          >
            Voir Détails
          </button>
        </div>
      </div>
    </div>
  );
};

export default HallCard;