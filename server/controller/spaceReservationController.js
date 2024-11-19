import SpaceReservation from "../model/spaceReservationModel.js";
import Service from "../model/serviceModel.js";
import User from "../model/userModel.js";
import { sendEmail } from '../mailer.js';

// Récupérer toutes les réservations
export const getReservedDates = async (req, res) => {
    try {
        const reservations = await SpaceReservation.find({}, 'reservationDate.start reservationDate.end');
        const reservedDates = reservations.map(reservation => ({
            start: reservation.reservationDate.start,
            end: reservation.reservationDate.end,
        }));
        res.status(200).json(reservedDates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer une nouvelle réservation d'espace
export const createSpaceReservation = async (req, res) => {
    try {
        const { reservationDate, firstName, lastName, email, phone, eventType, services, numberOfPeople } = req.body;
        const userId = req.user._id; // ID de l'utilisateur authentifié

        // Décomposition des dates
        const { start, end } = reservationDate;

        // Validation des champs
        if (!start || !userId || numberOfPeople === undefined || !firstName || !lastName || !email || !phone) {
            return res.status(400).json({ message: "All fields are required except end date!" });
        }

        // Calcul du nombre de jours
        const daysCount = end ? (new Date(end) - new Date(start)) / (1000 * 3600 * 24) + 1 : 1;

        const reservation = new SpaceReservation({
            userId,
            firstName,
            lastName,
            email,
            phone,
            reservationDate: { start, end },
            daysCount,
            eventType,
            numberOfPeople,
            services,
        });

        await reservation.save();
        res.status(201).json({ message: "Reservation created successfully!", reservation });
    } catch (error) {
        console.error("Error creating reservation:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Récupérer tous les services disponibles
export const getServices = async (req, res) => {
    try {
        const services = await Service.find({}, 'name'); // Récupère seulement les noms des services
        res.status(200).json(services);
    } catch (error) {
        console.error("Erreur lors de la récupération des services :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

// Récupérer toutes les réservations
export const getSpaceReservations = async (req, res) => {
    try {
        const reservations = await SpaceReservation.find().populate('userId', 'firstName lastName email');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une réservation par ID
export const getSpaceReservationById = async (req, res) => {
    try {
        const reservation = await SpaceReservation.findById(req.params.id).populate('userId', 'firstName lastName email');
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found!" });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une réservation d'espace par son ID
export const updateSpaceReservation = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["Pending", "Accepted", "Rejected"];
        
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value!" });
        }

        const reservation = await SpaceReservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found!" });
        }

        // Vérifiez si le statut a changé
        const previousStatus = reservation.status;
        if (previousStatus !== status) {
            reservation.status = status;
            await reservation.save();

            // Récupérer les informations de l'utilisateur
            const user = await User.findById(reservation.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }

            // Envoyer un email au client seulement si le statut a changé
            const emailSubject = "Mise à jour de votre réservation";
            const emailText = `Cher ${user.firstName},\n\nVotre réservation a été mise à jour avec le statut : ${status}.\n\nMerci pour votre confiance !`;
            await sendEmail(user.email, emailSubject, emailText);
        }

        res.status(200).json({ message: "Reservation updated successfully!", reservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une réservation d'espace par son ID
export const deleteSpaceReservation = async (req, res) => {
    try {
        const reservation = await SpaceReservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found!" });
        }
        res.status(200).json({ message: "Reservation deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un client par son ID
export const deleteClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "Client not found!" });
        }
        res.status(200).json({ message: "Client deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
