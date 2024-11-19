import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const ReservationModal = ({ hall, onClose }) => {
  const [formData, setFormData] = useState({
    hallId: hall._id,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    startDate: null,
    endDate: null,
    guests: 1,
    notes: '',
    daysCount: 0,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    let daysCount = 0;

    if (start && end) {
      const diffTime = Math.abs(end - start);
      daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    setFormData({ ...formData, startDate: start, endDate: end, daysCount });
  };

  const handleReserve = async () => {
    if (
      !formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
      !formData.eventType || !formData.startDate || !formData.endDate
    ) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3030/api/v1/hall-reservations", formData, {
        withCredentials: true,
      });
      console.log("Réservation créée :", response.data);
      setFormData((prevState) => ({ ...prevState, daysCount: response.data.daysCount }));
      onClose();
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert("Une erreur est survenue lors de la réservation. Veuillez réessayer.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 max-h-[90vh] overflow-y-auto p-6">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          &times;
        </button>
        <button 
          className="mb-4 text-blue-500 underline hover:text-blue-700 transition duration-300"
          onClick={onClose}
        >
          Retour
        </button>
        <h2 className="text-xl font-bold mb-4">Réservation pour "{hall.name}"</h2>
        <form>
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Numéro de téléphone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            name="eventType"
            placeholder="Type d'événement"
            value={formData.eventType}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <DatePicker
            selected={formData.startDate}
            onChange={handleDateChange}
            startDate={formData.startDate}
            endDate={formData.endDate}
            selectsRange
            className="border rounded p-2 mb-2 w-full"
            placeholderText="Date de début - Date de fin"
            required
          />
          <input
            type="number"
            name="daysCount"
            placeholder="Durée (jours)"
            value={formData.daysCount || ''}
            readOnly
            className="border rounded p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="guests"
            placeholder="Nombre de personnes"
            value={formData.guests}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
            required
          />
          <textarea
            name="notes"
            placeholder="Notes supplémentaires"
            value={formData.notes}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
          />
          <button 
            type="button" 
            onClick={handleReserve} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            aria-label="Confirmer la réservation"
          >
            Réserver
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;