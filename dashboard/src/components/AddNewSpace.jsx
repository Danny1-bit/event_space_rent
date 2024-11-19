// import React, { useState } from 'react'; 
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import 'react-toastify/dist/ReactToastify.css';

// const AddNewSpace = () => {  
//   const { register, handleSubmit, reset } = useForm();
//   const [images, setImages] = useState([]);
//   const apiUrl = "http://localhost:3030/api/v1/space";
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('location', data.location);
//       formData.append('capacity', data.capacity);
//       formData.append('description', data.description);
//       formData.append('price', data.price);
      
//       images.forEach((image) => {
//         formData.append('photos', image);
//       });

//       const response = await axios.post(apiUrl, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success("Espace créé avec succès !");
//       reset();
//       setImages([]);
//       navigate("/spaces-list");
//     } catch (error) {
//       toast.error("Erreur lors de la création de l'espace.");
//       console.error(error.response ? error.response.data : error.message);
//     }
//   };

//   const handleImageUpload = (e) => {
//     setImages([...e.target.files]);
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Ajouter un Nouvel Espace</h2>
//       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//         <input 
//           {...register("name")} 
//           placeholder="Nom de l'espace" 
//           required 
//           className="border rounded p-2 mb-2 w-full"
//         />
//         <input 
//           {...register("location")} 
//           placeholder="Emplacement" 
//           required 
//           className="border rounded p-2 mb-2 w-full"
//         />
//         <input 
//           type="number" 
//           {...register("capacity")} 
//           placeholder="Capacité" 
//           required 
//           className="border rounded p-2 mb-2 w-full"
//         />
//         <textarea 
//           {...register("description")} 
//           placeholder="Description" 
//           required 
//           className="border rounded p-2 mb-2 w-full"
//         />
//         <input 
//           type="number" 
//           {...register("price")} 
//           placeholder="Prix" 
//           required 
//           className="border rounded p-2 mb-2 w-full"
//         />
//         <input 
//           type="file" 
//           multiple 
//           onChange={handleImageUpload} 
//           accept="image/*" 
//           className="mb-2"
//         />
//         <div className="flex justify-between mt-4">
//           <button 
//             type="submit" 
//             className="bg-blue-500 text-white rounded px-4 py-2"
//           >
//             Créer Espace
//           </button>
//           <button 
//             type="button" 
//             onClick={() => navigate("/spaces-list")} 
//             className="bg-gray-300 text-black rounded px-4 py-2"
//           >
//             Annuler
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddNewSpace;
// src/components/AddNewSpace.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddNewSpace = () => {
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState([]);
  const apiUrl = "http://localhost:3030/api/v1/space";
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('location', data.location);
      formData.append('capacity', data.capacity);
      formData.append('description', data.description);
      formData.append('price', data.price);
      
      images.forEach((image) => {
        formData.append('photos', image); // Changez 'image' en 'photos'
    });

      await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Espace créé avec succès !");
      reset();
      setImages([]);
      navigate("/spaces-list");
    } catch (error) {
      toast.error("Erreur lors de la création de l'espace.");
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Ajouter un Nouvel Espace</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input 
          {...register("name")} 
          placeholder="Nom de l'espace" 
          required 
          className="border rounded p-2 mb-2 w-full"
        />
        <input 
          {...register("location")} 
          placeholder="Emplacement" 
          required 
          className="border rounded p-2 mb-2 w-full"
        />
        <input 
          type="number" 
          {...register("capacity")} 
          placeholder="Capacité" 
          required 
          className="border rounded p-2 mb-2 w-full"
        />
        <textarea 
          {...register("description")} 
          placeholder="Description" 
          required 
          className="border rounded p-2 mb-2 w-full"
        />
        <input 
          type="number" 
          {...register("price")} 
          placeholder="Prix" 
          required 
          className="border rounded p-2 mb-2 w-full"
        />
        <input 
          type="file" 
          multiple 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="mb-2"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Créer Espace
        </button>
      </form>
    </div>
  );
};

export default AddNewSpace;