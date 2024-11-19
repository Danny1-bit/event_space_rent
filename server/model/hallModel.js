// // hallModel.js
// import mongoose from "mongoose";

// const hallSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   capacity: {
//     type: Number,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   reservedDates: {
//     type: [Date],
//     default: [],
//   },
// });

// const Hall = mongoose.model("Hall", hallSchema);

// export default Hall;
// models/hallModel.js
import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  reservedDates: { type: [Date], default: [] }, // Store reserved dates
  image: { type: String, required: true },
});

export default mongoose.model("Hall", hallSchema);