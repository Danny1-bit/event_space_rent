import React, { useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(Context);
  const navigate = useNavigate();

  // Handle logout
  const logOutHandle = async () => {
    try {
      const res = await axios.get("http://localhost:3030/api/v1/user/logout-client", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuth(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Logout failed. Please try again.");
    }
  };

  // Handle login navigation
  const handleLogin = () => {
    navigate("/login");
  };

  // Handle confirmation navigation
  const handleConfirmation = () => {
    if (isAuth) {
      navigate("/confirmation");
    } else {
      toast.warn("Please log in to access the confirmation page.");
      navigate("/login"); // Redirige vers la page de connexion
    }
  };

  return (
    <div className="shadow-lg bg-blue-200 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-[1540px] mx-auto py-5 px-8 text-black">
        <nav className="flex justify-between items-center">
          <div className="flex-1 text-2xl font-bold">
            <Link to="/">Space Rental System</Link>
          </div>
          <div className="hidden lg:flex flex-2">
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-gray-900 cursor-pointer hover:text-black font-semibold hover:underline"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-900 cursor-pointer hover:text-black font-semibold hover:underline hover:underline-offset-8"
              >
                About
              </Link>
              {/* Lien vers la page "Mon Compte" */}
              {isAuth && (
                <Link
                  to="/account"  // Assurez-vous que le chemin correspond à votre route
                  className="text-gray-900 cursor-pointer hover:text-black font-semibold hover:underline"
                >
                  Mon Compte
                </Link>
              )}
              {/* Le bouton Réservations n'apparaît que si l'utilisateur est authentifié */}
              {isAuth && (
                <Link
                  to="/reservations"
                  className="text-gray-900 cursor-pointer hover:text-black font-semibold hover:underline"
                >
                  Mes Réservations
                </Link>
              )}
              <Link
                to="/appointment"
                className="text-gray-900 cursor-pointer hover:text-black font-semibold hover:underline"
              >
                Appointment
              </Link>

              {/* Lien vers la déconnexion ou la connexion */}
              {isAuth ? (
                <button
                  onClick={logOutHandle}
                  className="text-gray-900 cursor-pointer hover:text-black font-semibold hover:underline"
                >
                  LogOut
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="text-gray-900 cursor-pointer hover:text-black font-semibold hover:underline"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;