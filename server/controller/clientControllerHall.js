import HallReservation from "../model/hallReservationModel.js";

// Fonction pour récupérer tous les clients
export const getAllClients = async (req, res) => {
  try {
    // Récupérer tous les clients avec le nombre de réservations
    const clients = await HallReservation.aggregate([
      {
        $group: {
          _id: { firstName: "$firstName", lastName: "$lastName", email: "$email", phone: "$phone" },
          reservationsCount: { $sum: 1 } // Compte le nombre de réservations par client
        }
      },
      {
        $project: {
          firstName: "$_id.firstName",
          lastName: "$_id.lastName",
          email: "$_id.email",
          phone: "$_id.phone",
          reservationsCount: 1,
          _id: 0 // Ne pas inclure _id dans le résultat final
        }
      }
    ]);
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching hall clients:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour supprimer un client par ID (et ses réservations)
export const deleteClientById = async (req, res) => {
  const { id } = req.params;
  try {
    await HallReservation.findByIdAndDelete(id);
    res.status(200).json({ message: "Client deleted successfully." });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: error.message });
  }
};

// Fonction pour mettre à jour les informations d'un client
export const updateClient = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedClient = await HallReservation.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Server error while updating client" });
  }
};