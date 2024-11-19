import React, { useState, useEffect } from "react";
import axios from "axios";

const AddEditEquipmentForm = ({ initialData, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [state, setState] = useState("New");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [availability, setAvailability] = useState(true);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setQuantity(initialData.quantity);
      setState(initialData.state);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setImage(initialData.image || null);
      setAvailability(initialData.availability);
      setCategory(initialData.category);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedQuantity = parseInt(quantity, 10);
    const parsedPrice = parseFloat(price);
    const equipmentData = { name, quantity: parsedQuantity, state, description, price: parsedPrice, availability, category };

    const formData = new FormData();
    formData.append("equipmentData", JSON.stringify(equipmentData));
    if (image) {
      formData.append("image", image);
    }

    try {
      if (!name.trim() || isNaN(parsedQuantity) || !state || !description || isNaN(parsedPrice) || !category) {
        throw new Error("Tous les champs sont requis et doivent être valides.");
      }

      let response;
      if (initialData) {
        response = await axios.put(`http://localhost:3030/api/v1/equipments/${initialData._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await axios.post(`http://localhost:3030/api/v1/equipments`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      onSave(response.data);
      onClose();
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom de l'Équipement"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantité"
        required
        min="1"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Prix"
        required
        min="0"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="New">Neuf</option>
        <option value="Used">D'occasion</option>
        <option value="Needs Repair">À réparer</option>
      </select>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="">Sélectionnez une catégorie</option>
        <option value="Audio">Audio</option>
        <option value="Vidéo">Vidéo</option>
        <option value="Mobilier">Mobilier</option>
        {/* Ajoutez d'autres catégories si nécessaire */}
      </select>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked)}
          className="mr-2"
        />
        Disponible
      </label>
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {initialData ? "Modifier" : "Ajouter"} l'Équipement
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default AddEditEquipmentForm;