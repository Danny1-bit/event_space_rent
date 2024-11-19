import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../main"; // Assurez-vous que le chemin est correct
import { toast } from "react-toastify";
import AdminContactForm from '../components/AdminContactForm'; // Importez le nouveau composant

const AccountPage = () => {
  const { isAuth } = useContext(Context);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!isAuth) {
      window.location.href = "/login";
    }

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:3030/api/v1/user/single-client", {
          withCredentials: true,
        });
        setUser(userResponse.data.user);
        setFormData({
          firstName: userResponse.data.user.firstName,
          lastName: userResponse.data.user.lastName,
          email: userResponse.data.user.email,
          phone: userResponse.data.user.phone,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data.");
      }
    };

    fetchUserData();
  }, [isAuth]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:3030/api/v1/user", formData, {
        withCredentials: true,
      });
      setUser(response.data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error.response ? error.response.data.message : error.message);
      toast.error("Failed to update profile: " + (error.response ? error.response.data.message : error.message));
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action ne peut pas être annulée.")) {
      try {
        await axios.delete("http://localhost:3030/api/v1/user", {
          withCredentials: true,
        });
        toast.success("Votre compte a été supprimé avec succès.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000); // Redirige vers la page de connexion après 2 secondes
      } catch (error) {
        console.error("Error deleting account:", error.response ? error.response.data.message : error.message);
        toast.error("Échec de la suppression du compte: " + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  const [showAdminForm, setShowAdminForm] = useState(false);

  const handleOpenAdminForm = () => {
    setShowAdminForm(true);
  };

  const handleCloseAdminForm = () => {
    setShowAdminForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mon Compte</h1>

      {user ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Informations Personnelles</h2>

          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                className="border p-2 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Prénom"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                className="border p-2 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="border p-2 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="border p-2 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Numéro de téléphone"
                required
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <p className="mb-2"><strong>Prénom :</strong> {user.firstName}</p>
              <p className="mb-2"><strong>Nom :</strong> {user.lastName}</p>
              <p className="mb-2"><strong>Email :</strong> {user.email}</p>
              <p className="mb-2"><strong>Téléphone :</strong> {user.phone}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Modifier
              </button>
              <button
                onClick={handleDeleteAccount}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Supprimer le compte
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
          <p>Pas d'utilisateur connecté</p>
        </div>
      )}

      <button
        onClick={handleOpenAdminForm}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Contacter l'administrateur
      </button>

      {showAdminForm && (
        <AdminContactForm onClose={handleCloseAdminForm} />
      )}

    </div>
  );
};

export default AccountPage;
