import Service from '../model/serviceModel.js';
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

// Récupérer tous les services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des services' });
  }
};

// Ajouter un nouveau service
export const createService = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Erreur lors du téléchargement de l\'image' });

    const { name, quantity, condition, description, price } = JSON.parse(req.body.serviceData);
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !quantity || !condition || !description || !price) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    try {
      const service = new Service({ name, quantity, condition, description, price, image });
      await service.save();
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création du service' });
    }
  });
};

// Mettre à jour un service par ID
export const updateService = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: 'Erreur lors du téléchargement de l\'image' });

    try {
      const updatedData = JSON.parse(req.body.serviceData);
      if (req.file) {
        updatedData.image = `/uploads/${req.file.filename}`;
      }

      const updatedService = await Service.findByIdAndUpdate(req.params.id, updatedData, { new: true });
      if (!updatedService) return res.status(404).json({ message: 'Service non trouvé' });
      res.json(updatedService);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du service' });
    }
  });
};

// Supprimer un service par ID
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service non trouvé' });
    res.json({ message: 'Service supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du service' });
  }
};
