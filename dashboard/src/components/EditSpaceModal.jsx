import React, { useState } from 'react';
import axios from 'axios';

const EditSpaceModal = ({ space, onClose, onUpdate }) => {
  const [name, setName] = useState(space.name);
  const [location, setLocation] = useState(space.location);
  const [capacity, setCapacity] = useState(space.capacity);
  const [description, setDescription] = useState(space.description);
  const [photos, setPhotos] = useState(space.photos);
  const [newPhotos, setNewPhotos] = useState([]); // État pour les nouvelles photos

  const handlePhotoRemove = (photoToRemove) => {
    setPhotos(photos.filter(photo => photo !== photoToRemove));
  };

  const handleNewPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setNewPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('capacity', capacity);
    formData.append('description', description);
    
    // Ajouter les photos à supprimer
    formData.append('photosToRemove', JSON.stringify(photos.filter(photo => !newPhotos.includes(photo.name))));
    
    // Conserver les photos existantes et ajouter les nouvelles photos
    photos.forEach(photo => formData.append('photos', photo)); 
    newPhotos.forEach(photo => formData.append('photos', photo)); 

    try {
      const { data } = await axios.put(`http://localhost:3030/api/v1/space/${space._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onUpdate(data);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'espace :", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow-lg w-1/2 overflow-y-auto max-h-3/4">
        <h2 className="text-2xl mb-4">Modifier Espace</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom"
            className="mb-2 p-2 border w-full"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Localisation"
            className="mb-2 p-2 border w-full"
            required
          />
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Capacité"
            className="mb-2 p-2 border w-full"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="mb-2 p-2 border w-full"
            required
          />

          <div className="mb-4">
            <label>Photos existantes :</label>
            <div className="flex flex-wrap mt-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative w-20 h-20 mr-2 mb-2">
                  <img
                    src={`http://localhost:3030/uploads/${photo}`}
                    alt="space"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => handlePhotoRemove(photo)}
                    className="absolute top-0 right-0 text-white bg-red-600 w-5 h-5 flex items-center justify-center rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label>Nouvelles Photos :</label>
            <input
              type="file"
              multiple
              onChange={handleNewPhotoChange}
              className="mb-2 p-2 border w-full"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Mettre à jour</button>
          <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded ml-2">Annuler</button>
        </form>
      </div>
    </div>
  );
};

export default EditSpaceModal;