import express from 'express';
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationStatus,
  updateReservation,
  deleteReservation,
} from '../controller/hallReservationController.js';
import { clientTokenAuth } from "../middleware/auth.js";
import { sendEmail } from '../mailer.js';

const router = express.Router();

// Route pour créer une réservation
router.post('/', clientTokenAuth, createReservation);

// Route pour récupérer toutes les réservations
router.get('/', getAllReservations);

// Route pour récupérer une réservation par ID
router.get('/:id', getReservationById);

// Route pour mettre à jour le statut d'une réservation
router.put('/:id/status', updateReservationStatus);

// Route pour mettre à jour une réservation
router.put('/:id', updateReservation);

// Route to send an email
router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
      await sendEmail(to, subject, text);
      res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
      res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});
router.delete('/:id', deleteReservation);

export default router;
