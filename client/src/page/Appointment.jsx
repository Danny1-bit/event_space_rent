// src/pages/Appointment.jsx

import React, { useState } from "react";
import AppointmentForm from "../components/AppointmentFrom"; // Vérifiez le nom
import CalendarComponent from "../components/CalendarComponent";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState({ start: "", end: "" });

  const handleDateSelect = (date) => {
    if (!selectedDate.start) {
      setSelectedDate({ ...selectedDate, start: date });
    } else if (!selectedDate.end) {
      setSelectedDate({ ...selectedDate, end: date });
    } else {
      alert("Veuillez réinitialiser la sélection de dates.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6">Réservation d'Espace</h1>
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md">
        <CalendarComponent onDateSelect={handleDateSelect} />
      </div>
      <AppointmentForm selectedDate={selectedDate} />
    </div>
  );
};

export default Appointment;