// src/components/CalendarComponent.jsx

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const CalendarComponent = ({ onDateSelect }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/v1/space-reservations');
        const reservedDates = response.data.map(reservation => ({
          start: reservation.reservationDate.start,
          end: reservation.reservationDate.end,
          title: `${reservation.eventType}`,
          color: 'red', // Couleur par défaut pour les réservations
        }));
        setEvents(reservedDates);
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={(info) => onDateSelect(info.dateStr)}
      eventClassNames="bg-red-600 text-white rounded-md p-2" // Utilisation de Tailwind CSS pour les styles
      eventContent={(info) => ( // Rendu personnalisé de l'événement
        <div className="text-center">
          <strong>{info.event.title}</strong>
        </div>
      )}
    />
  );
};

export default CalendarComponent;