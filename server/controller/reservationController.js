import HallReservation from '../model/hallReservationModel.js';
import SpaceReservation from '../model/spaceReservationModel.js';

export const getClientReservations = async (req, res) => {
  try {
    // Récupérer les réservations en fonction de l'ID de l'utilisateur authentifié
    const hallReservations = await HallReservation.find({ userId: req.user._id });
    const spaceReservations = await SpaceReservation.find({ userId: req.user._id });
    
    res.json({ hallReservations, spaceReservations });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
};