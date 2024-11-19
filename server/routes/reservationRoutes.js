import express from 'express';
import { getClientReservations } from '../controller/reservationController.js';
import { clientTokenAuth } from '../middleware/auth.js';

const router = express.Router();

// Define the route for fetching client reservations with authentication
router.get('/client-reservations', clientTokenAuth, getClientReservations);

export default router;