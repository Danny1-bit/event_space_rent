import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from './Modal'; // Assurez-vous d'importer le composant Modal

const HallCard = ({ hall, onEdit, onDelete }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log("Date sélectionnée :", date);
        // Ajoutez ici la logique pour réserver la date si nécessaire
        setModalOpen(false); // Fermer le modal après la sélection
    };

    const isDateReserved = (date) => {
        return hall.reservedDates.some(reservedDate => {
            return new Date(reservedDate).toDateString() === date.toDateString();
        });
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 flex flex-col">
            <div className="relative w-full h-64 bg-cover bg-center" style={{ backgroundImage: `url(${hall.image ? `/uploads/${hall.image.split('\\').pop()}` : ''})` }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white truncate">{hall.name}</h2>
                    <div className="flex items-center">
                        <button onClick={() => onEdit(hall)} className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center justify-center text-xs font-medium hover:bg-blue-600 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 14l-7-7m0 0l7-7m-7 7H18" />
                            </svg>
                        </button>
                        <button onClick={() => onDelete(hall._id)} className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center justify-center text-xs font-medium hover:bg-red-600 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 9l-7 7-7-7" />
                                <line x1="12" y1="19" x2="12" y2="11" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4 flex-grow overflow-hidden">
                <p className="text-sm text-gray-600 mb-2">Location: {hall.location}</p>
                <p className="text-sm text-gray-600 mb-2">Capacité: {hall.capacity}</p>
                <p className="text-sm text-gray-600 mb-2">Prix: {hall.price} Ar</p>
                <p className="text-sm text-gray-600 mb-4">Description:</p>
                <p className="whitespace-normal text-gray-700 line-clamp-3">{hall.description}</p>
                <button 
                    onClick={() => setModalOpen(true)} 
                    className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
                >
                    Voir les dates réservées
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2 className="text-xl mb-4">Dates Indisponibles</h2>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    inline
                    filterDate={date => !isDateReserved(date)}
                    dayClassName={date => isDateReserved(date) ? 'bg-red-200' : undefined} // Mettre en surbrillance les dates réservées
                />
                <p className="mt-2 text-sm text-gray-500">Les dates en rouge sont déjà réservées.</p>
            </Modal>
        </div>
    );
};

export default HallCard;