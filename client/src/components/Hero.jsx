import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-full h-[600px] relative flex flex-col items-center pt-24">
      <div className="w-full h-full group">
        <div
          className="absolute inset-0 bg-blue-600/80 flex flex-col justify-center items-center text-white opacity-0 
          group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
        >
          <p className="font-bold text-4xl px-4 text-center">
            Location d'Espaces Événementiels
          </p>
          <p className="px-4 text-center py-4 text-xl">
            Réservez l'espace parfait pour vos événements, que ce soit pour
            des réceptions, des conférences, ou des ateliers. Offrez à vos
            invités une expérience mémorable dans nos espaces modernes et
            personnalisables.
          </p>
          <div className="text-center">
            <Link to="/appointment">
              <button
                className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold rounded-full shadow-lg
                hover:scale-105 transition-transform duration-300 ease-in-out hover:from-blue-400 hover:to-blue-300"
              >
                Réservez Maintenant
              </button>
            </Link>
          </div>
        </div>
        <img
          className="w-full h-full object-cover bg-gray-800/50 group-hover:bg-transparent transition-all duration-500 ease-in-out"
          src="https://asset.cloudinary.com/dwkhtv2gb/6781300f16a45fda4f79ee303fb57788" // Remplacez par l'URL d'une image d'espace événementiel
          alt="Espace événementiel"
        />
      </div>
    </div>
  );
};

export default Hero;