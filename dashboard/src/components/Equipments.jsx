import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import AddEditEquipmentForm from './AddEditEquipmentForm'; // Mettez à jour le nom du formulaire
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'; // Importation des icônes Heroicons

const EquipmentsPage = () => {
  const [equipments, setEquipments] = useState([]);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch equipments data from the API
  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get('http://localhost:3030/api/v1/equipments', { withCredentials: true });
      setEquipments(response.data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des équipements:', error);
      setEquipments([]);
    }
  };

  // Open modal to edit equipment
  const handleEdit = (record) => {
    setEditingEquipment(record);
    setIsModalOpen(true);
  };

  // Save the edited or new equipment
  const handleSave = (savedEquipment) => {
    if (editingEquipment) {
      // Update existing equipment
      setEquipments((prevEquipments) =>
        prevEquipments.map((equipment) =>
          equipment._id === editingEquipment._id ? savedEquipment : equipment
        )
      );
    } else {
      // Add new equipment
      setEquipments((prevEquipments) => [...prevEquipments, savedEquipment]);
    }
    setIsModalOpen(false); // Close the modal after saving
  };

  // Delete an equipment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/api/v1/equipments/${id}`, { withCredentials: true });
      fetchEquipments(); // Refresh the list after deletion
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'équipement:', error);
    }
  };

  // Open modal to add a new equipment
  const handleAddEquipment = () => {
    setEditingEquipment(null);
    setIsModalOpen(true);
  };

  // Table columns definition
  const columns = [
    { title: 'Nom', dataIndex: 'name', key: 'name' },
    { title: 'Quantité', dataIndex: 'quantity', key: 'quantity' },
    { title: 'État', dataIndex: 'state', key: 'state' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => text ? (
        <img src={`http://localhost:3030${text}`} alt="équipement" className="w-32 h-32 object-contain" />
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
      <h1 className="text-3xl font-bold mb-4">Gestion des Équipements</h1>

      {/* Button to add a new equipment */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4 transition duration-200 ease-in-out transform hover:scale-105"
        onClick={handleAddEquipment}
      >
        <PlusIcon className="h-5 w-5" />
      </button>

      {equipments.length > 0 ? (
        <table className="w-full bg-white shadow-md rounded-lg overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-2 text-left">{column.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <tr key={equipment._id}>
                {columns.map((column) => (
                  <td key={`${equipment._id}-${column.key}`} className="border-b border-gray-200 px-4 py-2">
                    {column.render ? column.render(equipment[column.dataIndex], equipment) : equipment[column.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4 text-center">Aucun équipement trouvé.</p>
      )}

      {/* Modal for adding/editing equipment */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddEditEquipmentForm
          initialData={editingEquipment}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </Modal>
    </div>
  );
};

export default EquipmentsPage;