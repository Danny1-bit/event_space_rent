import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const SpaceCarousel = () => {
  const [photos, setPhotos] = useState([]);
  const spaceId = "6737591b2471853d39d93a4c"; // Utilisez l'ID unique de votre espace

  useEffect(() => {
    const fetchSpaceImages = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/api/v1/space/${spaceId}`);
        setPhotos(response.data.photos);
      } catch (error) {
        console.error("Erreur lors de la récupération des images de l'espace:", error);
      }
    };
    fetchSpaceImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Affiche 3 images simultanément
    slidesToScroll: 3, // Défiler de 3 images
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="max-w-[1500px] mx-auto py-10">
      <h1 className="text-center py-2 text-4xl font-bold">Galerie d'images de l'espace</h1>
      <Slider {...settings} className="w-full bg-gray-100 h-[600px] mt-[30px]">
        {photos.map((photo, index) => (
          <div key={index} className="flex justify-center items-center w-full h-[600px]">
            <img
              src={`http://localhost:3030/uploads/${photo}`}
              alt={`Photo ${index + 1}`}
              className="object-cover w-full h-full" // Utilise object-cover pour remplir le conteneur
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpaceCarousel;
