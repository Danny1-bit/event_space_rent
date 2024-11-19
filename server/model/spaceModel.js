import mongoose from "mongoose";

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
    max: 10000,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000,
  },
  photos: {
    type: [String], // Tableau de chaînes pour les noms de fichiers des photos
  },
});

spaceSchema.index({ name: 'text', description: 'text' });

const Space = mongoose.model("Space", spaceSchema);

export default Space;
