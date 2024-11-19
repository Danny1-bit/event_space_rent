import express from "express";
import {
  createSpaceReservation,
  getReservedDates,
  getServices,
  getSpaceReservations,
  getSpaceReservationById,
  updateSpaceReservation, // This should match the exported function
  deleteSpaceReservation,
} from "../controller/spaceReservationController.js";
import { clientTokenAuth } from "../middleware/auth.js";

const router = express.Router();

// Récupérer les dates réservées
router.get('/reserved-dates', getReservedDates);

// Route for creating a new reservation
router.post("/", clientTokenAuth, createSpaceReservation);

router.get('/services', getServices); // Nouvelle route pour obtenir les services

// Route for retrieving all reservations
router.get("/", getSpaceReservations);

// Route for retrieving a reservation by ID
router.get("/:id", getSpaceReservationById);

// Route pour mettre à jour une réservation
router.put('/:id', updateSpaceReservation); // Added auth middleware if needed

// Route for deleting a reservation by ID
router.delete("/:id", deleteSpaceReservation); // Added auth middleware if needed

export default router;
