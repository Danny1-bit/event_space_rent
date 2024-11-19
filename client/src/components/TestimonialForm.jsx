import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialForm = ({ onTestimonialSubmitted }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Récupérer les informations de l'utilisateur connecté
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/user/single-client", {
          withCredentials: true // Inclure les cookies dans la requête
        });
        setAuthor(`${response.data.user.firstName} ${response.data.user.lastName}`);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur", error);
        setErrorMessage("Vous devez être connecté pour soumettre un témoignage.");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3030/api/v1/testimonials',
        { content, author }, // Inclure l'auteur ici
        {
          withCredentials: true // Inclure les cookies dans la requête
        }
      );
      onTestimonialSubmitted(response.data);
      setContent('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage("Erreur lors de l'ajout du témoignage, veuillez réessayer.");
      console.error("Erreur Axios:", error.response ? error.response.data : error); // Affichage des détails de l'erreur
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-12">
      <h3 className="text-2xl text-center text-blue-600 font-semibold mb-4">Ajouter un Témoignage</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="border border-gray-300 p-3 rounded-lg"
          placeholder="Votre témoignage"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          className="border border-gray-300 p-3 rounded-lg"
          value={author}
          readOnly
        />
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;