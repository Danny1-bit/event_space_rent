import express from 'express';
import { getReservationById, updateReservationById, deleteReservationById } from '../controller/hallReservController.js';

const router = express.Router();

// Route pour récupérer une réservation par ID
router.get('/:id', getReservationById);

// Route pour mettre à jour une réservation par ID
router.put('/:id', updateReservationById);

// Route pour supprimer une réservation par ID
router.delete('/:id', deleteReservationById);

export default router;
