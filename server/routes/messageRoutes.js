import express from "express";
import {
  createMessageController,
  getAllMessageController,
  deleteMessageController,
} from "../controller/messageController.js"; // Importation des fonctions du contrôleur

const router = express.Router();

// Route pour créer un message
router.post("/", createMessageController); // Pas besoin d'authentification pour créer un message

// Route pour récupérer tous les messages
router.get("/get-all-message", getAllMessageController); // Vérifiez que cette ligne existe

// Route pour supprimer un message par son ID
router.delete("/:id", deleteMessageController); // Pas besoin d'authentification pour supprimer un message

export default router; // Exportation des routes pour utilisation dans le fichier principal
