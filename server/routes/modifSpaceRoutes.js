import express from 'express';
import { getReservationById, updateReservation, deleteReservation } from '../controller/modifspaceController.js';

const router = express.Router();

// Route pour récupérer une réservation par ID
router.get('/:id', getReservationById);

// Route pour mettre à jour une réservation par ID
router.put('/:id', updateReservation);

// Route pour supprimer une réservation par ID
router.delete('/:id', deleteReservation);

export default router;
