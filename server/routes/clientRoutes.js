import express from "express";
import { getAllClients, deleteClientById, updateClient } from "../controller/clientController.js";
import SpaceReservation from "../model/spaceReservationModel.js"; // Importez votre modèle de réservation

const router = express.Router();

// Route pour récupérer tous les clients
router.get("/get-space-clients", getAllClients); // Ajustement pour correspondre à l'appel du frontend

// Route pour supprimer un client par ID (et ses réservations)
router.delete("/delete-client/:id", deleteClientById);

// Route pour mettre à jour les informations d'un client
router.put("/update-client/:id", updateClient);

// Route pour récupérer les réservations d'un client
router.get("/reservations/:clientId", async (req, res) => {
    const { clientId } = req.params;
    try {
        const reservations = await SpaceReservation.find({ userId: clientId });
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ message: error.message });
    }
});

// Route pour bloquer un client
router.put("/block/:clientId", async (req, res) => {
    const { clientId } = req.params;
    try {
        // Logique pour bloquer le client, par exemple mettre à jour un champ dans le modèle User
        // await User.findByIdAndUpdate(clientId, { blocked: true });
        res.status(200).json({ message: "Client blocked successfully." });
    } catch (error) {
        console.error("Error blocking client:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;