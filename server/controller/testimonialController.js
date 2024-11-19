import Testimonial from '../model/testimonialModel.js';
import { errorHandleMiddleware } from '../middleware/errorHandleMiddleware.js';
import ErrorHandler from '../middleware/errorMiddleware.js';

// Ajouter un témoignage
export const addTestimonialController = async (req, res, next) => {
  try {
    const { content } = req.body;

    // Vérifiez que l'utilisateur est connecté
    if (!req.user) {
      return next(new ErrorHandler("Utilisateur non authentifié", 401));
    }

    if (!content) {
      return next(new ErrorHandler("Le contenu du témoignage est obligatoire", 400));
    }

    // Créez un nouveau témoignage sans aucune restriction sur le nombre
    const newTestimonial = new Testimonial({
      author: `${req.user.firstName} ${req.user.lastName}`, // Utilisez les détails de l'utilisateur connecté
      content
    });

    await newTestimonial.save();

    return res.status(201).json({ message: 'Témoignage ajouté avec succès', testimonial: newTestimonial });
  } catch (error) {
    next(error); // Passez l'erreur au middleware d'erreur
  }
};

// Obtenir tous les témoignages
export const getTestimonialsController = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find();
    if (!testimonials || testimonials.length === 0) {
      return next(new ErrorHandler("Aucun témoignage trouvé", 404));
    }
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    next(error);
  }
};

// Mettre à jour un témoignage
export const updateTestimonialController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body; // Renommé pour correspondre à la structure

    if (!content) {
      return next(new ErrorHandler("Le contenu du témoignage est obligatoire", 400));
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedTestimonial) {
      return next(new ErrorHandler("Témoignage non trouvé", 404));
    }

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    next(error);
  }
};

// Supprimer un témoignage
export const deleteTestimonialController = errorHandleMiddleware(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("ID du témoignage non fourni", 400));
  }

  const testimonial = await Testimonial.findByIdAndDelete(id);

  if (!testimonial) {
    return next(new ErrorHandler("Témoignage non trouvé", 404));
  }

  res.status(204).send();
});