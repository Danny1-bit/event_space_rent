import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SpaceTableHeader from "../components/SpaceTableHeader";
import EditSpaceModal from "../components/EditSpaceModal";
import AddNewSpace from "../components/AddNewSpace"; // Importer le composant
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const SpacesList = () => {
  const [spaces, setSpaces] = useState([]);
  const [editingSpace, setEditingSpace] = useState(null);
  const [showAddNewSpace, setShowAddNewSpace] = useState(false); // État pour contrôler l'affichage

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const { data } = await axios.get('http://localhost:3030/api/v1/space');
        if (Array.isArray(data)) {
          setSpaces(data);
        } else {
          console.error("Données reçues ne sont pas un tableau :", data);
          setSpaces([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des espaces :", error);
        toast.error("Erreur lors du chargement des espaces.");
      }
    };
    fetchSpaces();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/api/v1/space/${id}`);
      setSpaces(spaces.filter(space => space._id !== id));
      toast.success("Espace supprimé avec succès.");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'espace.");
    }
  };

  const handleEditClick = (space) => {
    setEditingSpace(space);
  };

  const handleUpdateSpace = (updatedSpace) => {
    setSpaces(spaces.map(space => (space._id === updatedSpace._id ? updatedSpace : space)));
    setEditingSpace(null);
  };

  const handleAddNewSpace = (newSpace) => {
    setSpaces([...spaces, newSpace]);
    setShowAddNewSpace(false); // Fermer le formulaire après ajout
  };

  return (
    <div className="container mx-auto mt-10">
      <SpaceTableHeader />
      
      <table className="min-w-full bg-white shadow-md rounded my-6">
        <thead>
          <tr>
            <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold text-sm uppercase text-left">Nom</th>
            <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold text-sm uppercase text-left">Localisation</th>
            <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold text-sm uppercase text-left">Capacité</th>
            <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold text-sm uppercase text-left">Description</th>
            <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold text-sm uppercase text-left">Photos</th>
            <th className="py-3 px-5 bg-gray-200 text-gray-600 font-semibold text-sm uppercase text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spaces.map((space) => (
            <tr key={space._id}>
              <td className="py-4 px-5 align-top">{space.name}</td>
              <td className="py-4 px-5 align-top">{space.location}</td>
              <td className="py-4 px-5 align-top">{space.capacity}</td>
              <td className="py-4 px-5 align-top">{space.description}</td>
              <td className="py-4 px-5 align-top">
                <div className="flex flex-col">
                  {Array.isArray(space.photos) && space.photos.map((photo, index) => (
                    <img 
                      key={index} 
                      src={`/uploads/${photo}`} 
                      alt={`Space ${index}`} 
                      className="h-20 object-cover mb-2" 
                    />
                  ))}
                </div>
              </td>
              <td className="py-4 px-5 align-top flex space-x-2">
                <button onClick={() => handleEditClick(space)}>
                  <FaEdit className="text-blue-500 hover:text-blue-700" />
                </button>
                <button onClick={() => handleDelete(space._id)}>
                  <FaTrash className="text-red-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingSpace && (
        <EditSpaceModal
          space={editingSpace}
          onClose={() => setEditingSpace(null)}
          onUpdate={handleUpdateSpace}
        />
      )}
    </div>
  );
};

export default SpacesList;