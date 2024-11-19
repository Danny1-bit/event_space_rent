import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ModifSpace from './ModifSpace';
import axios from 'axios';

const SpaceReservationTable = ({ title, reservations, onDelete }) => {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [updatedReservations, setUpdatedReservations] = useState(reservations);

  // Fonction pour récupérer les réservations
  const fetchReservations = async () => {
    try {
      const { data } = await axios.get('http://localhost:3030/api/v1/reservations/client-reservations', {
        withCredentials: true,
      });
      setUpdatedReservations(data.spaceReservations || []); // Met à jour les réservations
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
    }
  };

  // Utilisation de useEffect pour récupérer les réservations et mettre à jour automatiquement
  useEffect(() => {
    fetchReservations(); // Appel initial
    const intervalId = setInterval(fetchReservations, 5000); // Mise à jour toutes les 5 secondes
    return () => clearInterval(intervalId); // Nettoyage de l'intervalle
  }, []);

  const openModal = (reservation) => setSelectedReservation(reservation);
  const closeModal = () => setSelectedReservation(null);

  // Fonction pour gérer la suppression d'une réservation
  const handleDelete = async (reservationId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      try {
        await axios.delete(`http://localhost:3030/api/v1/reserv/${reservationId}`); // Suppression
        onDelete(reservationId); // Appel de la fonction de suppression du parent
        fetchReservations(); // Met à jour les réservations après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression de la réservation :", error);
      }
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">{title}</h2>
      {updatedReservations.length > 0 ? (
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
                <th className="py-3 px-4 text-left">Services</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {updatedReservations.map((reservation) => (
                <tr key={reservation._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                  <td className="py-2 px-4">{reservation.firstName} {reservation.lastName}</td>
                  <td className="py-2 px-4">{reservation.email}</td>
                  <td className="py-2 px-4">{reservation.phone}</td>
                  <td className="py-2 px-4">{new Date(reservation.reservationDate.start).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{reservation.reservationDate.end ? new Date(reservation.reservationDate.end).toLocaleDateString() : 'N/A'}</td>
                  <td className="py-2 px-4">{reservation.eventType}</td>
                  <td className="py-2 px-4">{reservation.numberOfPeople}</td>
                  <td className="py-2 px-4">{reservation.daysCount}</td>
                  <td className="py-2 px-4">{reservation.status}</td>
                  <td className="py-2 px-4">
                    {reservation.services ? (
                      <ul className="list-disc list-inside">
                        {Object.entries(reservation.services).map(([key, value]) => value && <li key={key}>{key}</li>)}
                      </ul>
                    ) : 'Aucun service'}
                  </td>
                  <td className="py-2 px-4 flex space-x-4">
                    <button onClick={() => openModal(reservation)} className="text-blue-600 hover:text-blue-800">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(reservation._id)} className="text-red-600 hover:text-red-800">
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
      {selectedReservation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <ModifSpace 
              reservationId={selectedReservation._id} 
              onClose={closeModal} 
              onUpdate={fetchReservations} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceReservationTable;