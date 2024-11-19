import express from "express";
import {
  createSpace,
  getSpaces,
  getSpaceById,
  updateSpace,
  deleteSpace,
} from "../controller/spaceController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.array('photos'), createSpace); // Route pour créer un espace
router.get("/", getSpaces); // Route pour obtenir tous les espaces
router.get("/:id", getSpaceById);  // Route pour obtenir un espace par ID
router.put("/:id", upload.array('photos'), updateSpace); // Route pour mettre à jour un espace
router.delete("/:id", deleteSpace); // Route pour supprimer un espace

export default router;
