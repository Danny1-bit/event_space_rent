import express from "express";
import {
  createUserController,
  createAdminController,
  loginUserController,
  logOutClient,
  loginAdminController,
  getSingleClient,
  updateUserController,
  logOutAdmin,
} from "../controller/userController.js";
import { clientTokenAuth, adminTokenAuth } from "../middleware/auth.js";

const router = express.Router();

// Créer un utilisateur (Client)
router.post("/create-client", createUserController);

// Connexion utilisateur (Admin ou Client)
router.post("/login-user", loginUserController);
// Connexion admin
router.post("/login-admin", loginAdminController);

// Récupérer les détails d'un client connecté
router.get("/single-client", clientTokenAuth, getSingleClient);

// Créer un nouvel admin (nécessite une authentification admin)
router.post("/create-new-admin", createAdminController);

// Déconnexion Admin
router.get("/logout-admin", adminTokenAuth, logOutAdmin);

// Déconnexion Client
router.get("/logout-client", clientTokenAuth, logOutClient);

// Mettre à jour les informations de l'utilisateur
router.put("", clientTokenAuth, updateUserController);

// Supprimer le compte de l'utilisateur
router.delete("", clientTokenAuth, async (req, res) => {
  try {
    await req.user.destroy();
    res.status(204).send({ message: "Compte supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error);
    res.status(500).json({ success: false, message: "Une erreur est survenue lors de la suppression du compte." });
  }
});

export default router;
