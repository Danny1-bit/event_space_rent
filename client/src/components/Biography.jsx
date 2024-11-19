import React from "react";

const AboutUs = () => {
  return (
    <div
      className="container py-12 px-4 mx-auto bg-gray-100 flex
      flex-col md:flex-row gap-8"
    >
      <div className="flex-1 flex items-center justify-center">
        <img
          src="https://www.example.com/event-space.jpg" // Remplacez par l'URL d'une image représentant un espace événementiel
          alt="Notre espace événementiel"
          className="w-full h-auto object-cover rounded-md hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <p className="text-2xl font-bold text-gray-800 text-center">
          À propos de nous
        </p>
        <h3 className="text-lg font-bold text-gray-800">Qui sommes-nous ?</h3>
        <p className="text-lg text-gray-700">
          Nous offrons des espaces uniques et personnalisés pour tous vos événements,
          qu'il s'agisse de réceptions, de conférences, ou de séminaires. Notre
          équipe est dédiée à rendre chaque événement spécial.
        </p>
        <p className="text-lg text-gray-700">
          Grâce à notre expertise dans l’organisation d'événements et notre engagement
          envers la satisfaction client, nous assurons que chaque détail est pris en
          charge pour offrir une expérience inoubliable.
        </p>
        <h3 className="text-lg font-bold text-gray-800">Nos Services</h3>
        <p className="text-lg text-gray-700">
          - Espaces flexibles et modernes pour tout type d'événement.
        </p>
        <p className="text-lg text-gray-700">
          - Équipements audiovisuels et mobilier adaptés à vos besoins.
        </p>
        <p className="text-lg text-gray-700">
          - Services complémentaires, y compris restauration et décoration.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
