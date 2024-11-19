import express from 'express';
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from '../controller/serviceController.js';

const router = express.Router();

router.get('/', getAllServices);
router.post('/', createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
