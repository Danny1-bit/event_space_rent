// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const HallModal = ({ visible, onClose, hall, onRefresh }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     capacity: '',
//     price: '',
//     description: '',
//     image: null,
//   });

//   useEffect(() => {
//     if (hall) {
//       setFormData({
//         name: hall.name,
//         location: hall.location,
//         capacity: hall.capacity,
//         price: hall.price,
//         description: hall.description,
//         image: hall.image || null,
//       });
//     } else {
//       setFormData({
//         name: '',
//         location: '',
//         capacity: '',
//         price: '',
//         description: '',
//         image: null,
//       });
//     }
//   }, [hall]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }
//     try {
//       if (hall) {
//         await axios.put(`http://localhost:3030/api/v1/halls/${hall._id}`, formDataToSend, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//       } else {
//         await axios.post('http://localhost:3030/api/v1/halls', formDataToSend, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//       }
//       onRefresh();
//       onClose();
//     } catch (error) {
//       console.error("Erreur lors de l'envoi des données:", error);
//     }
//   };

//   if (!visible) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded shadow-lg w-full max-w-md overflow-y-scroll h-[calc(100vh-4rem)]">
//         <h2 className="text-xl mb-4 font-bold">{hall ? 'Modifier Salle' : 'Ajouter Salle'}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block mb-1">Nom</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="location" className="block mb-1">Emplacement</label>
//             <input
//               type="text"
//               id="location"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="capacity" className="block mb-1">Capacité</label>
//             <input
//               type="number"
//               id="capacity"
//               name="capacity"
//               value={formData.capacity}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="price" className="block mb-1">Prix</label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="description" className="block mb-1">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border rounded"
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="image" className="block mb-1">Image</label>
//             <input
//               type="file"
//               id="image"
//               name="image"
//               onChange={handleImageChange}
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>
//           <div className="flex justify-end mt-4">
//             <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
//               {hall ? 'Modifier' : 'Ajouter'}
//             </button>
//             <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">
//               Annuler
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default HallModal;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HallModal = ({ visible, onClose, hall, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    price: '',
    description: '',
    image: null,
    reservedDates: [],
  });

  useEffect(() => {
    if (hall) {
      setFormData({
        name: hall.name,
        location: hall.location,
        capacity: hall.capacity,
        price: hall.price,
        description: hall.description,
        image: hall.image || null,
        reservedDates: hall.reservedDates || [],
      });
    } else {
      setFormData({
        name: '',
        location: '',
        capacity: '',
        price: '',
        description: '',
        image: null,
        reservedDates: [],
      });
    }
  }, [hall]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleDateClick = (date) => {
    const formattedDate = date.setHours(0, 0, 0, 0);
    const reservedDates = formData.reservedDates.includes(formattedDate)
      ? formData.reservedDates.filter(d => d !== formattedDate) // Deselecter la date
      : [...formData.reservedDates, formattedDate]; // Sélectionner la date
    setFormData({ ...formData, reservedDates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
        if (key === 'reservedDates') {
            // Convertir le tableau de dates réservées en chaîne JSON
            formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
            formDataToSend.append(key, formData[key]);
        }
    }
    try {
        if (hall) {
            await axios.put(`http://localhost:3030/api/v1/halls/${hall._id}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        } else {
            await axios.post('http://localhost:3030/api/v1/halls', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
        }
        onRefresh();
        onClose();
    } catch (error) {
        console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md overflow-y-scroll h-[calc(100vh-4rem)]">
        <h2 className="text-xl mb-4 font-bold">{hall ? 'Modifier Salle' : 'Ajouter Salle'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-1">Emplacement</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="capacity" className="block mb-1">Capacité</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-1">Prix</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-1">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {/* Suppression de la section DatePicker pour la sélection de dates réservées */}
          <div className="mb-4">
            <label className="block mb-1">Dates Réservées</label>
            <DatePicker
              selected={null} // Pas besoin de sélectionner une date ici
              onChange={handleDateClick} // Gérer le clic pour réserver/désélectionner
              inline
              highlightDates={formData.reservedDates.map(date => new Date(date))}
              filterDate={date => !formData.reservedDates.includes(date.setHours(0, 0, 0, 0))}
            />
            <p className="mt-2 text-sm text-gray-500">Cliquez sur une date pour la réserver ou la désélectionner.</p>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">
              {hall ? 'Modifier' : 'Ajouter'}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HallModal;