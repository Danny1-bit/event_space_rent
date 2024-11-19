// // hallController.js
// import Hall from "../model/hallModel.js";

// // Créer un nouveau hall
// export const createHall = async (req, res) => {
//   try {
//     const { name, location, capacity, price, description } = req.body;

//     // Vérifiez si tous les champs requis sont présents
//     if (!name || !location || !capacity || !price || !description || !req.file) {
//       return res.status(400).json({ message: "Tous les champs sont requis." });
//     }

//     const image = req.file.path; // Récupérer le chemin de l'image

//     const newHall = new Hall({
//       name,
//       location,
//       capacity,
//       price,
//       description,
//       image,
//     });

//     await newHall.save();
//     res.status(201).json(newHall);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur lors de la création du hall." });
//   }
// };

// // Mettre à jour un hall existant
// export const updateHall = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, location, capacity, price, description } = req.body;

//     const hallData = { name, location, capacity, price, description };

//     if (req.file) {
//       hallData.image = req.file.path; // Mettre à jour l'image si elle est fournie
//     }

//     const updatedHall = await Hall.findByIdAndUpdate(id, hallData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedHall) {
//       return res.status(404).json({ message: "Hall non trouvé." });
//     }

//     res.json(updatedHall);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur lors de la mise à jour du hall." });
//   }
// };

// // Supprimer un hall par ID
// export const deleteHall = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedHall = await Hall.findByIdAndDelete(id);

//     if (!deletedHall) {
//       return res.status(404).json({ message: "Hall non trouvé." });
//     }

//     res.json({ message: "Hall supprimé avec succès." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur lors de la suppression du hall." });
//   }
// };

// // Récupérer tous les halls
// export const getAllHalls = async (req, res) => {
//   try {
//     const halls = await Hall.find();
//     res.json(halls);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur lors de la récupération des halls." });
//   }
// };

// // Récupérer un hall par ID
// export const getHallById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const hall = await Hall.findById(id);

//     if (!hall) {
//       return res.status(404).json({ message: "Hall non trouvé." });
//     }

//     res.json(hall);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Erreur lors de la récupération du hall." });
//   }
// };
// controllers/hallController.js
// hallController.js
// import Hall from "../model/hallModel.js";
// import multer from "multer";
// import fs from "fs";
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// // Obtenir le chemin du répertoire actuel
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Assurez-vous que le répertoire uploads existe
// const uploadDir = join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// // Configure multer pour les uploads d'images
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir); // Utilisez le chemin du répertoire uploads
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage }).single('image'); // Assurez-vous de nommer le champ 'image'

// // Ajouter un hall
// export const addHall = async (req, res) => {
//   try {
//       console.log("Corps de la requête:", req.body);
//       console.log("Fichier reçu:", req.file);
      
//       const { name, location, capacity, price, description } = req.body;

//       if (!name || !location || !capacity || !price || !description || !req.file) {
//           return res.status(400).json({ message: "Tous les champs sont requis." });
//       }

//       const hall = new Hall({
//           name,
//           location,
//           capacity,
//           price,
//           description,
//           image: req.file.path,
//       });

//       await hall.save();
//       res.status(201).json(hall);
//   } catch (error) {
//       console.error("Erreur lors de la création du hall:", error.message);
//       res.status(500).json({ message: "Erreur lors de la création du hall." });
//   }
// };

// // Lister tous les halls
// export const getAllHalls = async (req, res) => {
//     try {
//         const halls = await Hall.find();
//         res.status(200).json(halls);
//     } catch (error) {
//         console.error("Erreur lors de la récupération des halls:", error);
//         res.status(500).json({ message: "Erreur lors de la récupération des halls." });
//     }
// };

// // Récupérer un hall par ID
// export const getHallById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const hall = await Hall.findById(id);

//         if (!hall) {
//             return res.status(404).json({ message: "Hall non trouvé." });
//         }

//         res.json(hall);
//     } catch (error) {
//         console.error("Erreur lors de la récupération du hall:", error);
//         res.status(500).json({ message: "Erreur lors de la récupération du hall." });
//     }
// };

// // Modifier un hall
// export const updateHall = async (req, res) => {
//     try {
//         const hallData = { ...req.body };
//         const { name, location, capacity, price, description } = hallData;

//         if (!name || !location || !capacity || !price || !description) {
//             return res.status(400).json({ message: "Tous les champs sont requis." });
//         }

//         if (req.file) {
//             hallData.image = req.file.path; // Mettre à jour l'image si elle est fournie
//         }

//         const hall = await Hall.findByIdAndUpdate(req.params.id, hallData, { new: true, runValidators: true });

//         if (!hall) {
//             return res.status(404).json({ message: "Hall non trouvé." });
//         }

//         res.status(200).json(hall);
//     } catch (error) {
//         console.error("Erreur lors de la mise à jour du hall:", error);
//         res.status(400).json({ message: "Erreur lors de la mise à jour du hall." });
//     }
// };

// // Supprimer un hall par ID
// export const deleteHall = async (req, res) => {
//     try {
//         const hall = await Hall.findByIdAndDelete(req.params.id);

//         if (!hall) {
//             return res.status(404).json({ message: "Hall non trouvé." });
//         }

//         res.status(204).send(); // Utilisez 204 No Content pour une suppression réussie
//     } catch (error) {
//         console.error("Erreur lors de la suppression du hall:", error);
//         res.status(400).json({ message: "Erreur lors de la suppression du hall." });
//     }
// };
import Hall from "../model/hallModel.js";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Assurez-vous que le répertoire uploads existe
const uploadDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer pour les uploads d'images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Utilisez le chemin du répertoire uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image'); // Assurez-vous de nommer le champ 'image'

// Ajouter un hall
export const addHall = async (req, res) => {
    try {
        console.log("Corps de la requête:", req.body);
        console.log("Fichier reçu:", req.file);
        
        const { name, location, capacity, price, description, reservedDates } = req.body;

        if (!name || !location || !capacity || !price || !description || !req.file) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        const hall = new Hall({
            name,
            location,
            capacity,
            price,
            description,
            image: req.file.path,
            reservedDates: reservedDates ? JSON.parse(reservedDates) : [],
        });

        await hall.save();
        res.status(201).json(hall);
    } catch (error) {
        console.error("Erreur lors de la création du hall:", error.message);
        res.status(500).json({ message: "Erreur lors de la création du hall." });
    }
};

// Lister tous les halls
export const getAllHalls = async (req, res) => {
    try {
        const halls = await Hall.find();
        res.status(200).json(halls);
    } catch (error) {
        console.error("Erreur lors de la récupération des halls:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des halls." });
    }
};

// Récupérer un hall par ID
export const getHallById = async (req, res) => {
    try {
        const { id } = req.params;
        const hall = await Hall.findById(id);

        if (!hall) {
            return res.status(404).json({ message: "Hall non trouvé." });
        }

        res.json(hall);
    } catch (error) {
        console.error("Erreur lors de la récupération du hall:", error);
        res.status(500).json({ message: "Erreur lors de la récupération du hall." });
    }
};

// Modifier un hall
export const updateHall = async (req, res) => {
    try {
        const hallData = { ...req.body };
        const { name, location, capacity, price, description, reservedDates } = hallData;

        if (!name || !location || !capacity || !price || !description) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        if (req.file) {
            hallData.image = req.file.path; // Mettre à jour l'image si elle est fournie
        }

        // Parser reservedDates si présent
        if (reservedDates) {
            hallData.reservedDates = JSON.parse(reservedDates);
        }

        const hall = await Hall.findByIdAndUpdate(req.params.id, hallData, { new: true, runValidators: true });

        if (!hall) {
            return res.status(404).json({ message: "Hall non trouvé." });
        }

        res.status(200).json(hall);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du hall:", error);
        res.status(400).json({ message: "Erreur lors de la mise à jour du hall." });
    }
};

// Supprimer un hall par ID
export const deleteHall = async (req, res) => {
    try {
        const hall = await Hall.findByIdAndDelete(req.params.id);

        if (!hall) {
            return res.status(404).json({ message: "Hall non trouvé." });
        }

        res.status(204).send(); // Utilisez 204 No Content pour une suppression réussie
    } catch (error) {
        console.error("Erreur lors de la suppression du hall:", error);
        res.status(400).json({ message: "Erreur lors de la suppression du hall." });
    }
};