import React, { useState } from 'react';
import axios from 'axios';

const AdminContactForm = ({ onClose }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3030/api/v1/message', { message }, {
        withCredentials: true,
      });
      onClose();
      alert('Message envoyé à l\'administrateur avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      alert('Échec de l\'envoi du message. Veuillez réessayer.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Contacter l'administrateur</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message..."
          className="w-full border p-2"
          required
        ></textarea>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Envoyer
        </button>
      </form>
      <button onClick={onClose} className="mt-4 bg-gray-300 text-black px-4 py-2 rounded">
        Fermer
      </button>
    </div>
  );
};

export default AdminContactForm;
