// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";
// import userRoutes from "./routes/userRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
// import spaceRoutes from "./routes/spaceRoutes.js";
// import spaceReservationRoutes from "./routes/spaceReservationRoutes.js";
// import hallRoutes from "./routes/hallRoutes.js";
// import clientHallRoutes from './routes/clientHallRoutes.js';
// import clientRoutes from "./routes/clientRoutes.js";
// import hallReservationRoutes from './routes/hallReservationRoutes.js';
// import invoiceRoutes from "./routes/invoiceRoutes.js";
// import reservationRoutes from './routes/reservationRoutes.js';
// import hallReservRoutes from './routes/hallReservRoutes.js';
// import modifSpaceRoutes from './routes/modifSpaceRoutes.js';
// import serviceRoutes from './routes/serviceRoutes.js';
// import equipmentRoutes from "./routes/equipmentRoutes.js";
// import { errorMiddleware } from "./middleware/errorMiddleware.js";

// // Configuration de l'environnement
// dotenv.config();

// // Vérification des variables d'environnement requises
// const requiredEnvVars = ['MONGO_URL', 'EMAIL_USER', 'EMAIL_PASS', 'FRONTEND_URL', 'DASHBOARD_URL'];
// requiredEnvVars.forEach((varName) => {
//     if (!process.env[varName]) {
//         console.error(`Error: Missing required environment variable: ${varName}`);
//         process.exit(1);
//     }
// });

// // Création de l'application Express
// const app = express();

// // Middleware de sécurité
// app.use(helmet());

// // Middleware CORS
// app.use(cors({
//     origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
// }));

// // Middleware pour le parsing JSON et Form Data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Logger des requêtes
// const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
// app.use(morgan(morganFormat));

// // Middleware pour parser les cookies
// app.use(cookieParser());

// // Servir des fichiers statiques
// app.use('/uploads', express.static('uploads'));

// // Connexion à la base de données
// mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => console.log("Database Connection Successful"))
//     .catch((error) => console.error("Database Error:", error));

// // Routes
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/message", messageRoutes);
// app.use("/api/v1/halls", hallRoutes);
// app.use('/api/v1/space', spaceRoutes); 
// app.use("/api/v1/space-reservations", spaceReservationRoutes);
// app.use('/api/v1/hall-reservations', hallReservationRoutes);
// app.use("/api/v1/client", clientRoutes);
// app.use("/api/v1/invoices", invoiceRoutes);
// app.use("/api/v1/client-hall", clientHallRoutes);
// app.use('/api/v1/reservations', reservationRoutes);
// app.use('/api/v1/reservation', hallReservRoutes);
// app.use('/api/v1/reserv', modifSpaceRoutes);
// app.use("/api/v1/service", serviceRoutes);
// app.use("/api/equipments", equipmentRoutes);

// // Middleware d'erreur
// app.use(errorMiddleware);

// // Catch-all pour 404 Not Found
// app.use((req, res) => {
//     res.status(404).json({ message: "Not Found" });
// });

// // Démarrer le serveur
// const PORT = process.env.PORT || 3030;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import spaceRoutes from "./routes/spaceRoutes.js";
import spaceReservationRoutes from "./routes/spaceReservationRoutes.js";
import hallRoutes from "./routes/hallRoutes.js";
import clientHallRoutes from './routes/clientHallRoutes.js';
import clientRoutes from "./routes/clientRoutes.js";
import hallReservationRoutes from './routes/hallReservationRoutes.js';
import invoiceRoutes from "./routes/invoiceRoutes.js";
import reservationRoutes from './routes/reservationRoutes.js';
import hallReservRoutes from './routes/hallReservRoutes.js';
import modifSpaceRoutes from './routes/modifSpaceRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import imageUploadRoute from "./routes/imageUploadRoute.js";
import testimonialRoutes from './routes/testimonialRoutes.js'; 
import { errorMiddleware } from "./middleware/errorMiddleware.js";

// Configuration de l'environnement
dotenv.config();

// Vérification des variables d'environnement requises
const requiredEnvVars = ['MONGO_URL', 'EMAIL_USER', 'EMAIL_PASS', 'FRONTEND_URL', 'DASHBOARD_URL'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`Error: Missing required environment variable: ${varName}`);
        process.exit(1);
    }
});

// Création de l'application Express
const app = express();

// Middleware de sécurité
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Middleware CORS
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

// Middleware CORS supplémentaire pour définir les en-têtes CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Middleware pour le parsing JSON et Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger des requêtes
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat));

// Middleware pour parser les cookies
app.use(cookieParser());

// Servir des fichiers statiques
app.use('/uploads', express.static('uploads'));

// Connexion à la base de données
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Database Connection Successful"))
    .catch((error) => console.error("Database Error:", error));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/halls", hallRoutes);
app.use('/api/v1/space', spaceRoutes); 
app.use("/api/v1/space-reservations", spaceReservationRoutes);
app.use('/api/v1/hall-reservations', hallReservationRoutes);
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/client-hall", clientHallRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/reservation', hallReservRoutes);
app.use('/api/v1/reserv', modifSpaceRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use('/api/v1/equipments', equipmentRoutes);
app.use("/api/images", imageUploadRoute);
app.use('/api/v1/equipments', equipmentRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);

// Middleware d'erreur
app.use(errorMiddleware);

// Catch-all pour 404 Not Found
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
