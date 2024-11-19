import React, { useState } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'; // Import pour Heroicons v2
import UpdateReservation from './UpdateReservation';
import axios from 'axios';

const HallReservationTable = ({ title, reservations, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const handleEditClick = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  const handleDeleteClick = async (reservationId) => {
    try {
      const response = await axios.delete(`http://localhost:3030/api/v1/reservation/${reservationId}`);
      if (response.status === 200) {
        alert('Réservation supprimée avec succès!');
        onDelete(reservationId); // Appelle la fonction onDelete pour mettre à jour la liste des réservations
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
      alert('Erreur lors de la suppression de la réservation');
    }
  };

  if (!Array.isArray(reservations)) {
    reservations = [];
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">{title}</h2>
      {reservations.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Téléphone</th>
                <th className="py-3 px-4 text-left">Date Début</th>
                <th className="py-3 px-4 text-left">Date Fin</th>
                <th className="py-3 px-4 text-left">Type d'Événement</th>
                <th className="py-3 px-4 text-left">Nombre de Personnes</th>
                <th className="py-3 px-4 text-left">Durée (jours)</th>
                <th className="py-3 px-4 text-left">Statut</th>
                <th className="py-3 px-4 text-left">Notes</th>
                <th className="py-3 px-4 text-left">Actes</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {reservations.map((reservation) => (
                <tr key={reservation._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                  <td className="py-2 px-4">{reservation.firstName} {reservation.lastName}</td>
                  <td className="py-2 px-4">{reservation.email}</td>
                  <td className="py-2 px-4">{reservation.phone}</td>
                  <td className="py-2 px-4">{new Date(reservation.startDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{new Date(reservation.endDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{reservation.eventType}</td>
                  <td className="py-2 px-4">{reservation.guests}</td>
                  <td className="py-2 px-4">{reservation.daysCount}</td>
                  <td className="py-2 px-4">{reservation.status}</td>
                  <td className="py-2 px-4">{reservation.notes || 'Aucune'}</td>
                  <td className="py-2 px-4 flex space-x-4">
                    <button onClick={() => handleEditClick(reservation)} className="text-blue-600 hover:text-blue-800">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteClick(reservation._id)} className="text-red-600 hover:text-red-800">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">Aucune réservation trouvée.</p>
      )}
      
      {/* Modal pour la mise à jour */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-semibold"
            >
              &times;
            </button>
            <UpdateReservation
              reservationId={selectedReservation._id}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HallReservationTable;