import HallReservation from '../model/hallReservationModel.js';

// Get reservation by ID
export const getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await HallReservation.findById(id).populate('hallId').populate('userId');
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error: error.message });
    }
};

// Update reservation by ID
export const updateReservationById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const reservation = await HallReservation.findByIdAndUpdate(id, updateData, { new: true });
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json({ message: 'Réservation mise à jour avec succès!', reservation });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de la réservation', error: error.message });
    }
};

// Delete reservation by ID
export const deleteReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await HallReservation.findByIdAndDelete(id);
        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json({ message: 'Réservation supprimée avec succès!' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error: error.message });
    }
};
