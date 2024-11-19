import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // Ensure react-modal is installed
import axios from "axios";
import { toast } from "react-toastify";

const ClientDetailsModal = ({ isOpen, onRequestClose, clientId }) => {
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        if (clientId) {
            const fetchReservations = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:3030/api/v1/client/reservations/${clientId}`);
                    setReservations(data);
                } catch (error) {
                    toast.error("Error fetching reservations: " + error.message);
                }
            };
            fetchReservations();
        }
    }, [clientId]);

    const handleBlockClient = async () => {
        try {
            await axios.put(`http://localhost:3030/api/v1/client/block/${clientId}`);
            toast.success("Client blocked successfully!");
            onRequestClose(); // Close modal
        } catch (error) {
            toast.error("Error blocking client: " + error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
            <h2 className="text-xl font-bold mb-4">Historique des Réservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation._id}>
                        <p>{reservation.eventType} - {new Date(reservation.reservationDate.start).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleBlockClient} className="bg-red-500 text-white p-2 rounded">
                Bloquer Client
            </button>
            <button onClick={onRequestClose} className="ml-2 p-2 border border-gray-300 rounded">
                Fermer
            </button>
        </Modal>
    );
};

export default ClientDetailsModal;