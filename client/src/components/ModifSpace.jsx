import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModifSpace = ({ reservationId, onClose, onUpdate }) => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/api/v1/reserv/${reservationId}`);
        setReservation(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération de la réservation');
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [reservationId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested object (services) separately
    if (name.startsWith('services.')) {
      const serviceName = name.split('.')[1];
      setReservation((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          [serviceName]: checked
        }
      }));
    } else {
      setReservation((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3030/api/v1/reserv/${reservationId}`, reservation);
      alert('Réservation mise à jour avec succès!');
      onUpdate(); // Appelle la fonction pour mettre à jour la liste des réservations
      onClose(); // Ferme la modal
    } catch (err) {
      setError('Erreur lors de la mise à jour de la réservation');
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!reservation) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 overflow-y-auto max-h-screen mt-16">
      <button onClick={onClose} className="text-blue-600 hover:text-blue-800 mb-4 flex items-center">
        Retour
      </button>
      <h2 className="text-xl font-semibold mb-4">Mettre à jour votre réservation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Informations personnelles */}
        <div>
          <label>Prénom</label>
          <input type="text" name="firstName" value={reservation.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Nom</label>
          <input type="text" name="lastName" value={reservation.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={reservation.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Téléphone</label>
          <input type="text" name="phone" value={reservation.phone} onChange={handleChange} required />
        </div>

        {/* Dates de réservation */}
        <div>
          <label>Date de début</label>
          <input type="date" name="startDate" value={new Date(reservation.reservationDate.start).toISOString().split('T')[0]} onChange={handleChange} required />
        </div>
        <div>
          <label>Date de fin</label>
          <input type="date" name="endDate" value={new Date(reservation.reservationDate.end).toISOString().split('T')[0]} onChange={handleChange} required />
        </div>

        {/* Informations supplémentaires */}
        <div>
          <label>Type d'événement</label>
          <input type="text" name="eventType" value={reservation.eventType} onChange={handleChange} required />
        </div>
        <div>
          <label>Nombre de personnes</label>
          <input type="number" name="numberOfPeople" value={reservation.numberOfPeople} onChange={handleChange} required />
        </div>
        <div>
          <label>Jours de réservation</label>
          <input type="number" name="daysCount" value={reservation.daysCount} onChange={handleChange} required />
        </div>

        {/* Options de services */}
        <fieldset>
          <legend>Services</legend>
          {reservation.services && Object.keys(reservation.services).map((service) => (
            <div key={service}>
              <label>
                <input
                  type="checkbox"
                  name={`services.${service}`}
                  checked={reservation.services[service]}
                  onChange={handleChange}
                />
                {service}
              </label>
            </div>
          ))}
        </fieldset>

        {/* Soumettre */}
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold rounded-lg p-2 hover:bg-blue-500">
          Mettre à jour la réservation
        </button>
      </form>
    </div>
  );
};

export default ModifSpace;