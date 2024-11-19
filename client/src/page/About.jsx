import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaQuoteLeft } from 'react-icons/fa';
import TestimonialForm from '../components/TestimonialForm';
import axios from 'axios';

const About = () => {
  const [testimonials, setTestimonials] = useState([]); // Témoignages publics
  const [userTestimonials, setUserTestimonials] = useState([]); // Témoignages de l'utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État d'authentification

  // Récupérer les témoignages et vérifier l'authentification
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/testimonials");
        setTestimonials(response.data.testimonials);
      } catch (error) {
        console.error("Erreur lors de la récupération des témoignages:", error);
      }
    };

    const fetchUserTestimonials = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/user/single-client", {
          withCredentials: true
        });
        setIsAuthenticated(true); // Marquer comme authentifié
        setUserTestimonials(response.data.user.testimonials || []); // Récupérer les témoignages de l'utilisateur
      } catch (error) {
        console.log("Utilisateur non authentifié ou erreur:", error);
      }
    };

    fetchTestimonials(); // Récupérer tous les témoignages
    fetchUserTestimonials(); // Récupérer les témoignages de l'utilisateur
  }, []);

  const handleTestimonialSubmitted = (newTestimonial) => {
    setUserTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial.testimonial]);
  };

  return (
    <div>
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Section À Propos */}
        <div className="text-center mb-12">
          <h1 className="text-blue-600 text-4xl font-bold">À Propos de Notre Espace Événementiel</h1>
          <p className="text-gray-700 text-xl mt-4">Un lieu luxueux pour des événements inoubliables</p>
        </div>

        {/* Section Intro + Image */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="flex-1">
            <p className="text-gray-600 leading-relaxed">
              Notre espace événementiel offre un cadre somptueux et raffiné, parfait pour accueillir tout type d'événement, qu'il s'agisse de mariages, de conférences, de galas ou d'autres célébrations.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Notre espace combine un design élégant avec tout le confort et les services nécessaires, afin de faire de votre événement une réussite mémorable.
            </p>
            <div className="text-center mt-8">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                En Savoir Plus
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://example.com/elegant-event-space.jpg" // Modifiez avec l'URL de votre image
              alt="Espace événementiel"
              className="rounded-lg shadow-lg w-full object-cover h-[300px]"
            />
          </div>
        </div>

        {/* Caractéristiques */}
        <h2 className="text-3xl text-center text-blue-600 font-bold mb-6 underline underline-offset-8">Nos Caractéristiques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[{
            title: "500+", subtitle: "Capacité d'accueil"
          }, {
            title: "Luxueux", subtitle: "Design et Confort"
          }, {
            title: "Équipements", subtitle: "Audio, Visuel & Internet"
          }, {
            title: "Services", subtitle: "Restauration & Sécurité 24/7"
          }].map((feature, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl text-center text-blue-600 font-semibold mb-2">{feature.title}</h3>
              <p className="text-center text-gray-600">{feature.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Galerie de Photos */}
        <h2 className="text-3xl text-center text-blue-600 font-bold mb-6 underline underline-offset-8">Galerie</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {["event1.png", "event2.png", "event3.png", "event4.png", "event5.png", "event6.png"].map((photo, index) => (
            <img
              key={index}
              src={`/images/${photo}`} // Utilisation du chemin local
              alt={`Gallery ${index + 1}`}
              className="rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            />
          ))}
        </div>

        {/* Témoignages */}
        <h2 className="text-3xl text-center text-blue-600 font-bold mb-6 underline underline-offset-8">Ce Que Nos Clients Disent</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Afficher tous les témoignages si non authentifié ou les témoignages de l'utilisateur si authentifié */}
          {(isAuthenticated ? userTestimonials : testimonials).length > 0 ? (
            (isAuthenticated ? userTestimonials : testimonials).map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4 max-w-xs w-full">
                <FaQuoteLeft className="text-blue-600 text-3xl" />
                <div className="flex-grow">
                  <p className="text-gray-600 leading-relaxed break-words">{testimonial.content}</p>
                  <p className="text-gray-500 italic text-right">- {testimonial.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aucun témoignage soumis pour le moment.</p>
          )}
        </div>

        {/* Formulaire de soumission de témoignage */}
        {isAuthenticated && <TestimonialForm onTestimonialSubmitted={handleTestimonialSubmitted} />}

        {/* Bouton Retour */}
        <div className="text-center mt-16">
          <Link to="/" className="text-blue-600 underline text-lg hover:text-blue-800">
            Retour à la Page d'Accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;