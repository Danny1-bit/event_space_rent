import Space from "../model/spaceModel.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Définition de __dirname pour les modules ES
const __dirname = dirname(fileURLToPath(import.meta.url));

// Créer un nouvel espace
export const createSpace = async (req, res) => {
  try {
    const { name, location, capacity, description, price } = req.body;
    const photos = req.files ? req.files.map(file => file.filename) : [];

    const newSpace = new Space({
      name,
      location,
      capacity,
      description,
      price,
      photos,
    });

    await newSpace.save();
    res.status(201).json(newSpace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir tous les espaces
export const getSpaces = async (req, res) => {
  try {
    const spaces = await Space.find();
    res.status(200).json(spaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtenir un espace par son ID
// Obtenir un espace par son ID
export const getSpaceById = async (req, res) => {
  const { id } = req.params;

  try {
    const space = await Space.findById(id);

    if (!space) {
      return res.status(404).json({ message: "Espace non trouvé" });
    }

    res.status(200).json(space); // Assurez-vous que les photos sont incluses ici
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un espace existant
export const updateSpace = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSpace = await Space.findById(id);
    if (!updatedSpace) {
      return res.status(404).json({ message: "Espace non trouvé" });
    }

    updatedSpace.name = req.body.name || updatedSpace.name;
    updatedSpace.location = req.body.location || updatedSpace.location;
    updatedSpace.capacity = req.body.capacity || updatedSpace.capacity;
    updatedSpace.description = req.body.description || updatedSpace.description;

    if (req.body.photosToRemove) {
      const photosToRemove = JSON.parse(req.body.photosToRemove);
      updatedSpace.photos = updatedSpace.photos.filter(photo => !photosToRemove.includes(photo));

      photosToRemove.forEach(photo => {
        const photoPath = path.join(__dirname, '../uploads', photo);
        if (fs.existsSync(photoPath)) {
          fs.unlinkSync(photoPath);
        }
      });
    }

    if (req.files) {
      updatedSpace.photos.push(...req.files.map(file => file.filename));
    }

    await updatedSpace.save();
    res.status(200).json(updatedSpace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un espace par ID
export const deleteSpace = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSpace = await Space.findByIdAndDelete(id);
    if (!deletedSpace) {
      return res.status(404).json({ message: "Espace non trouvé" });
    }

    deletedSpace.photos.forEach(photo => {
      const photoPath = path.join(__dirname, '../uploads', photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    });

    res.status(200).json({ message: "Espace supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
