import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PastEvents = () => {
  const eventsArray = [
    {
      name: "Mariage de Sophie & Tom",
      imageUrl: "https://asset.cloudinary.com/dwkhtv2gb/33308e64b33d36ee76f3e7d39e3cd9dd",
    },
    {
      name: "Conférence annuelle Tech",
      imageUrl: "https://asset.cloudinary.com/dwkhtv2gb/4c32b8baab2e75b8f580b52e541501a9",
    },
    {
      name: "Gala de bienfaisance",
      imageUrl: "https://asset.cloudinary.com/dwkhtv2gb/732493291889aa70b630f09dcf0070cc",
    },
    {
      name: "Soirée d'entreprise",
      imageUrl: "https://asset.cloudinary.com/dwkhtv2gb/6781300f16a45fda4f79ee303fb57788",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 3,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="max-w-[1540px] mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Événements Passés</h2>
      <Carousel responsive={responsive} removeArrowOnDeviceType={["tablet", "mobile"]}>
        {eventsArray.map((event, index) => (
          <div key={index} className="relative gap-3 w-[460px] bg-white h-[350px] rounded-lg shadow-md overflow-hidden">
            <img
              src={event.imageUrl}
              alt={`Image de l'événement ${event.name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null; // Eviter une boucle infinie
                e.target.src = 'https://via.placeholder.com/460x350?text=Image+non+disponible'; // Image par défaut
              }}
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white text-xl font-bold text-center">
              {event.name}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PastEvents;