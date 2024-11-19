import express from 'express';
import {
  addTestimonialController,
  getTestimonialsController,
  updateTestimonialController,
  deleteTestimonialController,
} from '../controller/testimonialController.js';
import { clientTokenAuth } from "../middleware/auth.js";

const router = express.Router();

// Route pour ajouter un témoignage
router.post('/', clientTokenAuth, addTestimonialController);

// Route pour obtenir tous les témoignages
router.get('/', getTestimonialsController);

// Route pour mettre à jour un témoignage
router.put('/:id', clientTokenAuth, updateTestimonialController); // Authentification requise pour mettre à jour

// Route pour supprimer un témoignage
router.delete('/:id', clientTokenAuth, deleteTestimonialController); // Authentification requise pour supprimer

export default router;