import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // Assurez-vous que ce chemin est correct
import "./index.css"; // Ou le chemin vers votre fichier CSS

// Création du Contexte
export const Context = createContext();

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Authentification par défaut

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <App />
    </Context.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Main />
    </Router>
  </React.StrictMode>
);