import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdClose } from 'react-icons/md';
import axios from 'axios';

const EditReservation = ({ reservation, formData, onClose, onChange, onDateChange }) => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const { data } = await axios.get('http://localhost:3030/api/v1/halls');
        setHalls(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération des salles");
      }
    };
    fetchHalls();
  }, []);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    onDateChange("start", startDate);
    const endDate = new Date(formData.endDate);
    if (endDate < startDate) {
      onDateChange("end", startDate);
    }
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    onDateChange("end", endDate);
  };

  const calculateDaysCount = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez si au moins un champ a été modifié
    if (!formData.hallId && !formData.eventType && !formData.startDate && !formData.endDate && !formData.guests) {
      toast.error("Veuillez remplir au moins un champ pour modifier la réservation.");
      return;
    }

    try {
        const response = await axios.put(`http://localhost:3030/api/v1/hall-reservations/${reservation._id}`, formData);
      toast.success("Réservation mise à jour avec succès !");
      onClose(); // Fermer le modal après la mise à jour
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de la réservation.");
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-5 w-11/12 md:w-1/2 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Modifier la Réservation</h2>
          <button onClick={onClose}>
            <MdClose size={24} className="text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block mb-1">Nom du Client</label>
            <input
              type="text"
              value={`${formData.firstName} ${formData.lastName}`}
              readOnly
              className="border rounded p-2 w-full bg-gray-200"
            />
          </div>
          <div>
            <label className="block mb-1">Salle</label>
            <select
              name="hallId"
              value={formData.hallId || ''}
              onChange={onChange}
              className="border rounded p-2 w-full"
            >
              {halls.map((hall) => (
                <option key={hall._id} value={hall._id}>
                  {hall.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Type d'événement</label>
            <input
              type="text"
              name="eventType"
              value={formData.eventType || ''}
              onChange={onChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Date de Début</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate.toISOString().split('T')[0]}
              onChange={handleStartDateChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Date de Fin</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate.toISOString().split('T')[0]}
              onChange={handleEndDateChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Nombre de Jours</label>
            <input
              type="text"
              value={calculateDaysCount()}
              readOnly
              className="border rounded p-2 w-full bg-gray-200"
            />
          </div>
          <div>
            <label className="block mb-1">Nombre d'Invités</label>
            <input
              type="number"
              name="guests"
              value={formData.guests || ''}
              onChange={onChange}
              className="border rounded p-2 w-full"
              min="1"
            />
          </div>
          <div>
            <label className="block mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={onChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white rounded px-4 py-2 mt-4"
            >
              Retour
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReservation;