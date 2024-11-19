import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SpaceReservationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reservationDate, setReservationDate] = useState({ start: null, end: null });
  const [daysCount, setDaysCount] = useState(0);
  const [eventType, setEventType] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [services, setServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/v1/space-reservations/reserved-dates');
        setReservedDates(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des dates réservées :", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/v1/space-reservations/services');
        setAvailableServices(response.data);
        const initialServicesState = response.data.map(service => ({
          name: service.name,
          selected: false,
        }));
        setServices(initialServicesState);
      } catch (error) {
        console.error("Erreur lors de la récupération des services :", error);
      }
    };

    fetchReservedDates();
    fetchServices();
  }, []);

  const isDateReserved = (date) => {
    return reservedDates.some(reserved => {
      const start = new Date(reserved.start);
      const end = new Date(reserved.end);
      return date >= start && date <= end;
    });
  };

  const handleDateChange = (name, date) => {
    setReservationDate((prevDate) => ({ ...prevDate, [name]: date }));

    if (name === "end") {
      const start = new Date(reservationDate.start);
      const end = new Date(date);
      const differenceInTime = end - start;
      setDaysCount(differenceInTime > 0 ? differenceInTime / (1000 * 3600 * 24) + 1 : 1);
    } else if (name === "start") {
      setDaysCount(date ? 1 : 0);
    }
  };

  const handleServiceChange = (serviceName) => {
    setServices((prevServices) => 
      prevServices.map(service => 
        service.name === serviceName 
          ? { ...service, selected: !service.selected } 
          : service
      )
    );
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const selectedServices = services.filter(service => service.selected);
      const { data } = await axios.post(
        "http://localhost:3030/api/v1/space-reservations",
        {
          reservationDate,
          firstName,
          lastName,
          email,
          phone,
          daysCount,
          numberOfPeople,
          eventType,
          services: selectedServices, // Envoie les services sélectionnés
        },
        { withCredentials: true }
      );
      toast.success(data.message);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la réservation :", error.response?.data);
      toast.error(error.response?.data.message || "Erreur lors de la réservation !");
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setReservationDate({ start: null, end: null });
    setDaysCount(0);
    setEventType("");
    setNumberOfPeople(1);
    setServices(availableServices.map(service => ({ name: service.name, selected: false })));
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-yellow-100 my-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Réserver l’Espace Événementiel</h1>
      <form className="space-y-6" onSubmit={handleReservation}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Nom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md"
            required
          />
          <input
            type="text"
            placeholder="Prénom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md"
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <DatePicker
            selected={reservationDate.start}
            onChange={(date) => handleDateChange("start", date)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md"
            minDate={new Date(today)}
            filterDate={(date) => !isDateReserved(date)}
            dayClassName={(date) => (isDateReserved(date) ? 'reserved-date' : undefined)}
            placeholderText="Date de début"
            required
          />
          <DatePicker
            selected={reservationDate.end}
            onChange={(date) => handleDateChange("end", date)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md"
            minDate={reservationDate.start ? new Date(reservationDate.start) : new Date(today)}
            filterDate={(date) => !isDateReserved(date)}
            dayClassName={(date) => (isDateReserved(date) ? 'reserved-date' : undefined)}
            placeholderText="Date de fin"
          />
          <input
            type="number"
            placeholder="Nombre de jours"
            value={daysCount}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md shadow-md bg-gray-200"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="eventType" className="text-gray-700">Type d'événement</label>
          <input
            list="eventTypes"
            placeholder="Sélectionner ou écrire un type d'événement"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md"
            required
          />
          <datalist id="eventTypes">
            <option value="Mariage" />
            <option value="Réunion d'affaire" />
            <option value="Séminaire" />
            <option value="Anniversaire" />
            <option value="Réunion Familiale" />
            <option value="Concert" />
            <option value="Autre" />
          </datalist>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="numberOfPeople" className="text-gray-700">Nombre de personnes (minimum 1)</label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(Math.max(1, e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-md shadow-md"
            min="1"
            required
          />
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          {availableServices.map((service) => (
            <label key={service.name} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={services.find(s => s.name === service.name)?.selected || false}
                onChange={() => handleServiceChange(service.name)}
                className="w-4 h-4"
              />
              <span>{service.name}</span>
            </label>
          ))}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Réserver
        </button>
      </form>
      <style>
        {`
          .reserved-date {
              background-color: red !important;
              color: white !important;
          }
        `}
      </style>
    </div>
  );
};

export default SpaceReservationForm;