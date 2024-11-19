import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManagePhotos = ({ spaceId }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await axios.get(`/api/v1/space/${spaceId}`);
        setPhotos(data.photos);
      } catch (error) {
        toast.error("Erreur lors de la récupération des photos.");
      }
    };
    fetchPhotos();
  }, [spaceId]);

  const deletePhoto = async (index) => {
    try {
      await axios.delete(`/api/v1/space/${spaceId}/photos/${index}`);
      toast.success("Photo supprimée avec succès");
      setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    } catch (error) {
      toast.error("Erreur lors de la suppression de la photo");
    }
  };

  return (
    <div>
      <h3 className="text-xl">Gérer les Photos</h3>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img src={`/uploads/${photo}`} alt={`Photo ${index}`} className="w-full h-32 object-cover"/>
            <button
              onClick={() => deletePhoto(index)}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePhotos;
