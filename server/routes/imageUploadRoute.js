import express from "express";
import cloudinary from "../CloudinaryConfig.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// Configurer multer pour stocker les fichiers temporairement
const upload = multer({ dest: "uploads/" });

// Route pour uploader une image vers Cloudinary
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // Supprimez l'image locale temporaire après l'upload
    fs.unlinkSync(req.file.path);
    
    // Envoyer l'URL de l'image comme réponse
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
    res.status(500).json({ message: "Erreur de téléchargement de l'image", error });
  }
});

export default router;
