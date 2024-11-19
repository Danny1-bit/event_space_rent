import HallReservation from '../model/hallReservationModel.js';
import { sendEmail } from '../mailer.js';

// Créer une nouvelle réservation
export const createReservation = async (req, res) => {
    const { hallId, firstName, lastName, email, phone, eventType, startDate, endDate, guests, notes, daysCount } = req.body;

    // Assurez-vous que le userId est fourni par le middleware d'authentification ou de session
    const userId = req.user._id; // Par exemple, si vous avez un middleware qui attache l'utilisateur à la requête

    try {
        const newReservation = new HallReservation({
            hallId,
            userId,
            firstName,
            lastName,
            email,
            phone,
            eventType,
            startDate,
            endDate,
            guests,
            notes,
            daysCount,
        });

        await newReservation.save();
        res.status(201).json({ message: 'Réservation créée avec succès!', reservation: newReservation });
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de la réservation', error: error.message });
    }
};
// Récupération de toutes les réservations avec filtrage
export const getAllReservations = async (req, res) => {
  const { hallName, eventType, startDate, endDate, clientName } = req.query;
  
  const query = {};

  if (hallName) {
    query['hallId.name'] = { $regex: hallName, $options: 'i' }; // Recherche insensible à la casse
  }

  if (eventType) {
    query.eventType = { $regex: eventType, $options: 'i' };
  }

  if (clientName) {
    const [firstName, lastName] = clientName.split(" ");
    query.$or = [
      { firstName: { $regex: firstName, $options: 'i' } },
      { lastName: { $regex: lastName, $options: 'i' } }
    ];
  }

  if (startDate) {
    query.startDate = { $gte: new Date(startDate) }; // Date de début doit être supérieure ou égale
  }

  if (endDate) {
    query.endDate = { $lte: new Date(endDate) }; // Date de fin doit être inférieure ou égale
  }

  try {
    const reservations = await HallReservation.find(query).populate('hallId');
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations' });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservation = await HallReservation.findById(req.params.id).populate('hallId');
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error: error.message });
  }
};

export const updateReservationStatus = async (req, res) => {
  try {
    const reservation = await HallReservation.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    sendEmail(reservation.email, `Statut de réservation mis à jour`, 
      `Le statut de votre réservation a été mis à jour à ${req.body.status}.`);
    res.status(200).json(reservation);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la réservation', error: error.message });
  }
};


export const updateReservation = async (req, res) => {
  try {
    const { startDate, endDate, ...rest } = req.body;

    // Optionnel : Vous pouvez recalculer `daysCount` si nécessaire
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const reservation = await HallReservation.findByIdAndUpdate(
      req.params.id,
      { ...rest, startDate, endDate, daysCount },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la réservation', error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservation = await HallReservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.status(200).json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur lors de la suppression de la réservation", error: error.message });
  }
};
// import HallReservation from '../model/hallReservationModel.js';
// import { sendEmail } from '../mailer.js';

// // Fonction pour créer une nouvelle réservation
// export const createReservation = async (req, res) => {
//   console.log("Données reçues :", req.body);
//   try {
//     const { startDate, endDate, ...rest } = req.body;

//     // Récupérer l'ID de l'utilisateur authentifié
//     const userId = req.user._id; // Assurez-vous que req.user est défini par l'authentification

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = end.getTime() - start.getTime();
//     const daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     const reservationData = {
//       ...rest,
//       startDate,
//       endDate,
//       daysCount,
//       userId, // Ajoutez userId au modèle de réservation
//     };

//     const reservation = new HallReservation(reservationData);
//     await reservation.save();

//     // L'envoi d'un email de confirmation a été supprimé
//     // sendEmail(reservation.email, 'Confirmation de réservation', 'Votre réservation a été créée avec succès.');

//     res.status(201).json(reservation);
//   } catch (error) {
//     console.error("Erreur :", error);
//     res.status(400).json({ message: 'Erreur lors de la création de la réservation', error: error.message });
//   }
// };
// // Récupération de toutes les réservations avec filtrage
// export const getAllReservations = async (req, res) => {
//   const { hallName, eventType, startDate, endDate, clientName } = req.query;
  
//   const query = {};

//   if (hallName) {
//     query['hallId.name'] = { $regex: hallName, $options: 'i' }; // Recherche insensible à la casse
//   }

//   if (eventType) {
//     query.eventType = { $regex: eventType, $options: 'i' };
//   }

//   if (clientName) {
//     const [firstName, lastName] = clientName.split(" ");
//     query.$or = [
//       { firstName: { $regex: firstName, $options: 'i' } },
//       { lastName: { $regex: lastName, $options: 'i' } }
//     ];
//   }

//   if (startDate) {
//     query.startDate = { $gte: new Date(startDate) }; // Date de début doit être supérieure ou égale
//   }

//   if (endDate) {
//     query.endDate = { $lte: new Date(endDate) }; // Date de fin doit être inférieure ou égale
//   }

//   try {
//     const reservations = await HallReservation.find(query).populate('hallId');
//     res.status(200).json(reservations);
//   } catch (error) {
//     console.error("Erreur :", error);
//     res.status(500).json({ message: 'Erreur lors de la récupération des réservations' });
//   }
// };

// // Récupérer une réservation par son ID
// export const getReservationById = async (req, res) => {
//   try {
//     const reservation = await HallReservation.findById(req.params.id).populate('hallId');
//     if (!reservation) {
//       return res.status(404).json({ message: 'Réservation non trouvée' });
//     }
//     res.status(200).json(reservation);
//   } catch (error) {
//     console.error("Erreur :", error);
//     res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error: error.message });
//   }
// };

// // Mettre à jour le statut d'une réservation
// export const updateReservationStatus = async (req, res) => {
//   try {
//     const reservation = await HallReservation.findByIdAndUpdate(
//       req.params.id,
//       { $set: { status: req.body.status } },
//       { new: true }
//     );
//     if (!reservation) {
//       return res.status(404).json({ message: 'Réservation non trouvée' });
//     }
//     sendEmail(reservation.email, `Statut de réservation mis à jour`, 
//       `Le statut de votre réservation a été mis à jour à ${req.body.status}.`);
//     res.status(200).json(reservation);
//   } catch (error) {
//     console.error("Erreur :", error);
//     res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la réservation', error: error.message });
//   }
// };

// // Mettre à jour une réservation
// export const updateReservation = async (req, res) => {
//   try {
//     const { startDate, endDate, ...rest } = req.body;

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = end.getTime() - start.getTime();
//     const daysCount = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     const reservation = await HallReservation.findByIdAndUpdate(
//       req.params.id,
//       { ...rest, startDate, endDate, daysCount },
//       { new: true }
//     );

//     if (!reservation) {
//       return res.status(404).json({ message: 'Réservation non trouvée' });
//     }

//     res.status(200).json(reservation);
//   } catch (error) {
//     console.error("Erreur :", error);
//     res.status(500).json({ message: 'Erreur lors de la mise à jour de la réservation', error: error.message });
//   }
// };

// // Supprimer une réservation
// export const deleteReservation = async (req, res) => {
//   try {
//     const reservation = await HallReservation.findByIdAndDelete(req.params.id);
//     if (!reservation) {
//       return res.status(404).json({ message: "Réservation non trouvée" });
//     }
//     res.status(200).json({ message: "Réservation supprimée avec succès" });
//   } catch (error) {
//     console.error("Erreur :", error);
//     res.status(500).json({ message: "Erreur lors de la suppression de la réservation", error: error.message });
//   }
// };
