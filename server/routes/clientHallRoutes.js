import express from "express";
import { getAllClients, deleteClientById, updateClient } from "../controller/clientControllerHall.js";
import HallReservation from "../model/hallReservationModel.js"; // Modèle de réservation de salle

const router = express.Router();

// Route pour récupérer tous les clients de la réservation de salle
router.get("/get-hall-clients", getAllClients);

// Route pour supprimer un client par ID (et ses réservations)
router.delete("/delete-client/:id", deleteClientById);

// Route pour mettre à jour les informations d'un client
router.put("/update-client/:id", updateClient);

// Route pour récupérer les réservations d'une salle
router.get("/reservations/:hallId", async (req, res) => {
  const { hallId } = req.params;
  try {
    const reservations = await HallReservation.find({ hallId });
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;