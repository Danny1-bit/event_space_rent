import express from 'express';
import {
  getAllEquipments,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from '../controller/equipmentController.js';

const router = express.Router();

router.get('/', getAllEquipments);
router.post('/', createEquipment);
router.put('/:id', updateEquipment);
router.delete('/:id', deleteEquipment);

export default router;