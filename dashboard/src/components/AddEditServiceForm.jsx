import React, { useState, useEffect } from "react";
import axios from "axios";

const AddEditServiceForm = ({ initialData, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [condition, setCondition] = useState("new");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setQuantity(initialData.quantity);
      setCondition(initialData.condition);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setImage(initialData.image || null); // Gérer l'image si elle existe
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedQuantity = parseInt(quantity, 10);
    const parsedPrice = parseFloat(price);
    const serviceData = { name, quantity: parsedQuantity, condition, description, price: parsedPrice };

    const formData = new FormData();
    formData.append("serviceData", JSON.stringify(serviceData));
    if (image) {
      formData.append("image", image);
    }

    try {
      if (!name.trim() || isNaN(parsedQuantity) || !condition || !description || isNaN(parsedPrice)) {
        throw new Error("Tous les champs sont requis et doivent être valides.");
      }

      let response;
      if (initialData) {
        response = await axios.put(`http://localhost:3030/api/v1/services/${initialData._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await axios.post(`http://localhost:3030/api/v1/services`, formData, {
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
        placeholder="Nom du Service"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantité"
        required
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
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      />
      <select
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="new">Neuf</option>
        <option value="used">Usé</option>
      </select>
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
          {initialData ? "Modifier" : "Ajouter"} le Service
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

export default AddEditServiceForm;