import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import AddEditServiceForm from './AddEditServiceForm';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'; // Importation des icônes Heroicons

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch services data from the API
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/v1/services', { withCredentials: true });
      setServices(response.data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des services:', error);
      setServices([]);
    }
  };

  // Open modal to edit service
  const handleEdit = (record) => {
    setEditingService(record);
    setIsModalOpen(true);
  };

  // Save the edited or new service
  const handleSave = (savedService) => {
    if (editingService) {
      // Update existing service
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === editingService._id ? savedService : service
        )
      );
    } else {
      // Add new service
      setServices((prevServices) => [...prevServices, savedService]);
    }
    setIsModalOpen(false); // Close the modal after saving
  };

  // Delete a service
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/api/v1/services/${id}`, { withCredentials: true });
      fetchServices(); // Refresh the list after deletion
    } catch (error) {
      console.error('Erreur lors de la suppression du service:', error);
    }
  };

  // Open modal to add a new service
  const handleAddService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  // Table columns definition
  const columns = [
    { title: 'Nom', dataIndex: 'name', key: 'name' },
    { title: 'Quantité', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Condition', dataIndex: 'condition', key: 'condition' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => text ? (
        <img src={`http://localhost:3030${text}`} alt="service" className="w-32 h-32 object-contain" />
      ) : null,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <p className="break-words" style={{ maxWidth: '8cm', wordWrap: 'break-word', overflow: 'hidden' }}>
          {text}
        </p>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <button
            onClick={() => handleEdit(record)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gestion des Services</h1>

      {/* Button to add a new service */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 transition duration-200 ease-in-out transform hover:scale-105"
        onClick={handleAddService}
      >
        <PlusIcon className="h-5 w-5" />
      </button>

      {services.length > 0 ? (
        <table className="w-full bg-white shadow-md rounded-lg overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-2 text-left">{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                {columns.map((column) => (
                  <td key={`${service._id}-${column.key}`} className="border-b border-gray-200 px-4 py-2">
                    {column.render ? column.render(service[column.dataIndex], service) : service[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-center">Aucun service trouvé.</p>
      )}

      {/* Modal for adding/editing service */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddEditServiceForm
          initialData={editingService}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </Modal>
    </div>
  );
};

export default ServicesPage;
