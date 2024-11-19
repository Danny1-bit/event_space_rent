import express from 'express';
import multer from 'multer';
import { addHall, getAllHalls, updateHall, deleteHall } from '../controller/hallController.js';

const router = express.Router();

// Configure multer pour le stockage des fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // Dossier de destination
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), // Nom du fichier
});

const upload = multer({ storage: storage }).single('image'); // Configurer multer pour un fichier unique

// Route pour ajouter une salle
router.post('/', upload, addHall);// Vérifiez que cette route est correctement définie
router.get('/', getAllHalls);
router.put('/:id', upload, updateHall);
router.delete('/:id', deleteHall);

export default router;