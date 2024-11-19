import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Pour la navigation vers d'autres pages

const ReservationModal = ({ onClose }) => {
  const navigate = useNavigate(); // Utiliser pour rediriger vers ReservationManagement.jsx
  const [halls, setHalls] = useState([]);
  const [formData, setFormData] = useState({
    hallId: '',
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

  useEffect(() => {
    // Récupérer la liste des salles
    const fetchHalls = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/v1/halls');
        setHalls(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des salles :", error);
      }
    };
    fetchHalls();
  }, []);

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
    if (!formData.hallId || !formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
      !formData.eventType || !formData.startDate || !formData.endDate) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3030/api/v1/hall-reservations", formData, {
        withCredentials: true,
      });
      console.log("Réservation créée :", response.data);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      alert("Une erreur est survenue lors de la réservation. Veuillez réessayer.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3 max-h-screen overflow-y-auto relative">
        <button 
          className="absolute top-2 right-2 text-gray-500" 
          onClick={onClose}
          aria-label="Fermer"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Créer une Réservation</h2>

        <form>
          <select
            name="hallId"
            value={formData.hallId}
            onChange={handleInputChange}
            className="border rounded p-2 mb-2 w-full"
            required
          >
            <option value="">Sélectionnez une salle</option>
            {halls.map(hall => (
              <option key={hall._id} value={hall._id}>{hall.name}</option>
            ))}
          </select>
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
            placeholder="Nombre d'invités"
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
              onClick={onClose}
              className="bg-gray-500 text-white rounded px-4 py-2 mt-4"
            >
              Retour
            </button>
          <button 
            type="button" 
            onClick={handleReserve} 
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-all"
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
