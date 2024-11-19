import React, { useEffect, useState } from "react";
import Modal from "react-modal"; // Assurez-vous d'installer react-modal
import axios from "axios";
import { toast } from "react-toastify";

// Styles pour la modale
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '400px', // Largeur réduite
        padding: '20px', // Espacement interne
        borderRadius: '10px', // Coins arrondis
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Ombre
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Couleur de fond semi-transparente
    },
};

const EditClientModal = ({ isOpen, onRequestClose, client, refreshClients }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (client) {
            setFormData({
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                phone: client.phone,
            });
        }
    }, [client]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3030/api/v1/client/update-client/${client._id}`, formData);
            toast.success("Client updated successfully!");
            refreshClients(); // Refresh clients
            onRequestClose(); // Close modal
        } catch (error) {
            toast.error("Error updating client: " + error.message);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={customStyles}>
            <h2 className="text-xl font-bold mb-4 text-center">Modifier Client</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Prénom"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Nom"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Téléphone"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enregistrer</button>
                    <button type="button" onClick={onRequestClose} className="ml-2 p-2 border border-gray-300 rounded">Annuler</button>
                </div>
            </form>
        </Modal>
    );
};

export default EditClientModal;