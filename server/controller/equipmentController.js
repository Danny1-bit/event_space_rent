import Equipment from '../model/equipmentModel.js';
import multer from 'multer';
import path from 'path';

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Récupérer tous les équipements
export const getAllEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find();
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des équipements' });
  }
};

// Ajouter un nouvel équipement
export const createEquipment = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Erreur lors du téléchargement de l\'image' });

    const { name, quantity, state, description, price, availability, category } = JSON.parse(req.body.equipmentData);
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !quantity || !state || !description || !price || !category) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    try {
      const equipment = new Equipment({ name, quantity, state, description, price, image, availability, category });
      await equipment.save();
      res.status(201).json(equipment);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'équipement' });
    }
  });
};

// Mettre à jour un équipement par ID
export const updateEquipment = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Erreur lors du téléchargement de l\'image' });

    try {
      const updatedData = JSON.parse(req.body.equipmentData);
      if (req.file) {
        updatedData.image = `/uploads/${req.file.filename}`;
      }

      const updatedEquipment = await Equipment.findByIdAndUpdate(req.params.id, updatedData, { new: true });
      if (!updatedEquipment) return res.status(404).json({ message: 'Équipement non trouvé' });
      res.json(updatedEquipment);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'équipement' });
    }
  });
};

// Supprimer un équipement par ID
export const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) return res.status(404).json({ message: 'Équipement non trouvé' });
    res.json({ message: 'Équipement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'équipement' });
  }
};