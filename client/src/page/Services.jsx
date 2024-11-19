// src/components/ServiceList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/v1/services'); // Assurez-vous que l'URL correspond à votre backend
        setServices(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div key={service._id} className="bg-white rounded-lg shadow-lg p-4">
          {service.image && (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          )}
          <h3 className="text-xl font-bold mt-2">{service.name}</h3>
          <p className="text-gray-600">Quantité : {service.quantity}</p>
          <p className="text-gray-600">État : {service.condition}</p>
          <p className="mt-2">{service.description}</p>
          <p className="font-bold text-blue-600 mt-4">{service.price} €</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;