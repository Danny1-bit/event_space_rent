import mongoose from "mongoose";

const spaceReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  reservationDate: {
    start: { type: Date, required: true },
    end: { type: Date, required: false },
  },
  daysCount: { type: Number, required: true },
  eventType: { type: String, required: true },
  numberOfPeople: { type: Number, required: true, min: 1 },
  services: [{ 
    name: { type: String, required: true }, 
    selected: { type: Boolean, default: false } 
  }],
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
}, {
  timestamps: true,
});

export default mongoose.model("SpaceReservation", spaceReservationSchema);