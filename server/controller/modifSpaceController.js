import Reservation from '../model/spaceReservationModel.js';

// Récupérer une réservation par ID
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la réservation' });
  }
};

// Mettre à jour une réservation par ID
export const updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReservation) return res.status(404).json({ message: 'Réservation non trouvée' });
    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la réservation' });
  }
};

// Supprimer une réservation par ID
export const deleteReservation = async (req, res) => {
    try {
      const reservation = await Reservation.findByIdAndDelete(req.params.id);
      if (!reservation) return res.status(404).json({ message: 'Réservation non trouvée' });
      res.json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de la réservation' });
    }
  };
  