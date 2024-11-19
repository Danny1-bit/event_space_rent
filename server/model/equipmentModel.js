import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  availability: { type: Boolean, default: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  state: { type: String, enum: ['New', 'Used', 'Needs Repair'], required: true },
  dateAdded: { type: Date, default: Date.now },
});

const Equipment = mongoose.model('Equipment', equipmentSchema);
export default Equipment;