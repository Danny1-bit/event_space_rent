import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const AddReservation = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        reservationDate: {
            start: null,
            end: null,
        },
        daysCount: 1,
        eventType: '',
        numberOfPeople: 1,
        services: {
            catering: false,
            audiovisual: false,
            furniture: false,
            decoration: false,
            eventCoordination: false,
            entertainment: false,
            transport: false,
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                services: { ...prev.services, [name]: checked },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleDateChange = (date, field) => {
        setFormData((prev) => ({
            ...prev,
            reservationDate: { ...prev.reservationDate, [field]: date },
        }));

        // Calculer le nombre de jours
        if (field === 'start') {
            const endDate = formData.reservationDate.end;
            if (endDate) {
                const daysCount = Math.ceil((endDate - date) / (1000 * 60 * 60 * 24)) + 1;
                setFormData((prev) => ({ ...prev, daysCount }));
            }
        } else if (field === 'end') {
            const startDate = formData.reservationDate.start;
            if (startDate) {
                const daysCount = Math.ceil((date - startDate) / (1000 * 60 * 60 * 24)) + 1;
                setFormData((prev) => ({ ...prev, daysCount }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation des champs requis
        const { firstName, lastName, email, phone, reservationDate, eventType, numberOfPeople } = formData;
        if (!firstName || !lastName || !email || !phone || !reservationDate.start || !eventType || numberOfPeople <= 0) {
            toast.error("Tous les champs obligatoires doivent être remplis !");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3030/api/v1/space-reservations", {
                ...formData,
                reservationDate: {
                    start: reservationDate.start.toISOString(),
                    end: reservationDate.end ? reservationDate.end.toISOString() : null,
                },
            });
            toast.success(response.data.message);
            // Réinitialiser le formulaire après l'ajout
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                reservationDate: { start: null, end: null },
                daysCount: 1,
                eventType: '',
                numberOfPeople: 1,
                services: {
                    catering: false,
                    audiovisual: false,
                    furniture: false,
                    decoration: false,
                    eventCoordination: false,
                    entertainment: false,
                    transport: false,
                },
            });

            // Appeler la fonction de rappel pour fermer la modale
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || "Erreur lors de la création de la réservation");
        }
    };

    return (
        <div className="overflow-auto max-h-[80vh] p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-lg font-semibold">Ajouter une réservation</h2>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Prénom"
                    required
                    className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Nom"
                    required
                    className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Téléphone"
                    required
                    className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>
                    <label className="block mb-1">Date de début:</label>
                    <DatePicker
                        selected={formData.reservationDate.start}
                        onChange={(date) => handleDateChange(date, 'start')}
                        className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Date de fin:</label>
                    <DatePicker
                        selected={formData.reservationDate.end}
                        onChange={(date) => handleDateChange(date, 'end')}
                        className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <input
                    type="number"
                    name="daysCount"
                    value={formData.daysCount}
                    readOnly
                    className="border p-3 w-full rounded-md shadow-sm bg-gray-100"
                />
                <input
                    type="text"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    placeholder="Type d'événement"
                    required
                    className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleChange}
                    min="1"
                    required
                    className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="space-y-2">
                    <h3 className="font-semibold">Services:</h3>
                    {Object.keys(formData.services).map((service) => (
                        <label key={service} className="block">
                            <input
                                type="checkbox"
                                name={service}
                                checked={formData.services[service]}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            {service.charAt(0).toUpperCase() + service.slice(1)}
                        </label>
                    ))}
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded p-3 w-full hover:bg-blue-600 transition">
                    Ajouter la réservation
                </button>
            </form>
        </div>
    );
};

export default AddReservation;