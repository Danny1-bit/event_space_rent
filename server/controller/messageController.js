import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import Message from "../model/messageModel.js";

// Create message
export const createMessageController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    console.log("Données reçues:", req.body); // Ajoutez ceci pour voir les données reçues

    // Validation des données
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const newMessage = new Message({ firstName, lastName, email, phone, message });
    await newMessage.save();

    return res.status(201).json({ message: 'Message envoyé avec succès !' });
  } catch (error) {
    console.error("Erreur lors de la création du message:", error); // Ajoutez ceci pour voir l'erreur
    next(error);
  }
};


// Get all messages
export const getAllMessageController = async (req, res) => {
  try {
    const messages = await Message.find(); // Récupérer tous les messages
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "No Messages Found" });
    }
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve messages" });
  }
};

// Delete message
export const deleteMessageController = errorHandleMiddleware(
  async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      return next(new ErrorHandler("Message Id Not Found", 400));
    }

    try {
      const message = await Message.findByIdAndDelete(id);
      if (!message) {
        return next(new ErrorHandler("Message Not Found", 404));
      }
      res.status(204).send(); // No Content
    } catch (error) {
      return next(new ErrorHandler("Failed to delete message", 500));
    }
  }
);
