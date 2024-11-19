import SpaceReservation from "../model/spaceReservationModel.js";

// Récupérer tous les clients basés sur les réservations
export const getAllClients = async (req, res) => {
    try {
        // Récupération des réservations
        const reservations = await SpaceReservation.find();

        // Créer un objet pour stocker les informations des clients et le nombre de réservations
        const clientMap = {};

        reservations.forEach(reservation => {
            const clientId = reservation.userId.toString();
            if (!clientMap[clientId]) {
                clientMap[clientId] = {
                    _id: clientId,
                    firstName: reservation.firstName,
                    lastName: reservation.lastName,
                    email: reservation.email,
                    phone: reservation.phone,
                    reservationsCount: 1, // Initialiser le compteur de réservations
                };
            } else {
                clientMap[clientId].reservationsCount += 1; // Incrémenter le compteur
            }
        });

        // Convertir l'objet en tableau
        const uniqueClients = Object.values(clientMap);
        
        res.status(200).json(uniqueClients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un client par ID et ses réservations
export const deleteClientById = async (req, res) => {
    const { id } = req.params;
    try {
        // Supprime toutes les réservations pour ce client
        await SpaceReservation.deleteMany({ userId: id });
        res.status(200).json({ message: "Client and their reservations deleted successfully" });
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour les informations d'un client
export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;

    try {
        // Met à jour toutes les réservations pour ce client
        await SpaceReservation.updateMany(
            { userId: id },
            { firstName, lastName, email, phone }
        );
        res.status(200).json({ message: "Client updated successfully" });
    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ message: error.message });
    }
};