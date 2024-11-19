import multer from 'multer';
import path from 'path';

// Configuration du stockage avec multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Dossier où les fichiers seront enregistrés
  },
  filename: (req, file, cb) => {
    // Renommer le fichier pour éviter les doublons
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialisation de multer avec la configuration de stockage
const upload = multer({ storage: storage });

export default upload;
