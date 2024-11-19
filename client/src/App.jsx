// import React, { useContext, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import axios from "axios";
// import Home from "./page/Home";
// import PageNotFound from "./page/PageNotFound";
// import PrivacyandPolicy from "./page/PrivacyandPolicy";
// import Contact from "./page/Contact";
// import Services from "./page/Services";
// import Appointment from "./page/Appointment";
// import Register from "./page/Register";
// import Login from "./page/Login";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import About from "./page/About";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Context } from "./main";
// import "./global.css"; // Ajoutez cette ligne en haut de votre fichier

// const App = () => {
//   const { setIsAuth, setUser } = useContext(Context);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3030/api/v1/user/single-client",
//           { withCredentials: true }
//         );
//         setIsAuth(true);
//         setUser(response.data.user);
//       } catch (error) {
//         setIsAuth(false);
//         setUser(null); // Changement ici pour éviter un objet vide
//         console.error("Error fetching user data:", error); // Optionnel : log pour le débogage
//       }
//     };
//     fetchUser();
//   }, [setIsAuth, setUser]); // Ajout de dépendances

//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/appointment" element={<Appointment />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/privacyAndPolicy" element={<PrivacyandPolicy />} />
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//       <Footer />
//       <ToastContainer position="top-center" />
//     </div>
//   );
// };

// export default App;
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./page/Home";
import PageNotFound from "./page/PageNotFound";
import PrivacyandPolicy from "./page/PrivacyandPolicy";
import Contact from "./page/Contact";
import Services from "./page/Services";
import Appointment from "./page/Appointment";
import Register from "./page/Register";
import Login from "./page/Login";
import Navbar from "./components/Navbar";
import AccountPage from "./page/AccountPage";
import Footer from "./components/Footer";
import About from "./page/About";
import Reservations from "./page/Reservations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main";
import "./global.css";

const App = () => {
  const { setIsAuth, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await axios.get("http://localhost:3030/api/v1/user/single-client", { withCredentials: true });
          setIsAuth(true);
          setUser(response.data.user);
      } catch (error) {
          console.error("Error fetching user data:", error.response?.data || error.message);
          setIsAuth(false);
          setUser(null);
      }
    };
    fetchUser();
}, [setIsAuth, setUser]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Navigate to="http://localhost:5174" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacyAndPolicy" element={<PrivacyandPolicy />} />
        <Route path="/Reservations" element={<Reservations />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
