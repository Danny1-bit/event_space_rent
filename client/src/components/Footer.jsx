import React from "react";
import { FaLocationArrow, FaPhone, FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM to 10:00 PM" },
    { id: 2, day: "Tuesday", time: "9:00 AM to 10:00 PM" },
    { id: 3, day: "Wednesday", time: "9:00 AM to 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM to 10:00 PM" },
    { id: 5, day: "Friday", time: "9:00 AM to 10:00 PM" },
    { id: 6, day: "Saturday", time: "10:00 AM to 8:00 PM" },
    { id: 7, day: "Sunday", time: "Closed" },
  ];

  return (
    <div className="bg-blue-200 text-black shadow-xl">
      <footer className="max-w-[1540px] mx-auto py-8 px-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1">
            <h1 className="text-xl font-bold cursor-pointer">
              Espace de Location
            </h1>
            <p className="text-gray-700 text-lg">
              Réservez votre espace idéal pour des événements inoubliables. 
              Que ce soit pour des réunions, des fêtes ou des séminaires, 
              nous avons ce qu'il vous faut.
            </p>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold cursor-pointer mb-4">
              Liens Rapides
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to={"/"} className="text-gray-900 hover:text-black">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to={"/about"} className="text-gray-900 hover:text-black">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to={"/services"} className="text-gray-900 hover:text-black">
                  Services
                </Link>
              </li>
              <li>
                <Link to={"/contact"} className="text-gray-900 hover:text-black">
                  Contact
                </Link>
              </li>
              <li>
                <Link to={"/privacyAndPolicy"} className="text-gray-900 hover:text-black">
                  Politique de Confidentialité
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold cursor-pointer mb-4">Horaires</h4>
            <ul className="space-y-2">
              {hours.map((element) => (
                <li key={element.id} className="flex justify-between text-gray-700">
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold cursor-pointer mb-4">Contact</h4>
            <div className="flex items-center gap-2 mb-2">
              <FaPhone className="text-gray-900" />
              <span className="text-gray-900">+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <MdEmail className="text-gray-900" />
              <span className="text-gray-900">info@location.com</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <FaLocationArrow className="text-gray-900" />
              <span className="text-gray-900">Paris, France</span>
            </div>
          </div>
          <div className="flex justify-between gap-4 cursor-pointer items-center">
            <FaFacebookSquare className="text-gray-900 hover:text-black" />
            <FaYoutube className="text-gray-900 hover:text-black" />
            <FaSquareInstagram className="text-gray-900 hover:text-black" />
            <FaGithub className="text-gray-900 hover:text-black" />
          </div>
        </div>
      </footer>
      <p className="text-center cursor-pointer text-md py-4">
        &copy;{new Date().getFullYear()} Espace de Location. Tous droits réservés.
      </p>
    </div>
  );
};

export default Footer;