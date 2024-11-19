import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name is Required"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name is Required"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide a Valid Email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number is Required"],
    maxLength: [15, "Phone Number should not exceed 15 digits"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  role: {
    type: String,
    enum: ["Admin", "Client"],
    default: "Client",
  },
}, { timestamps: true });

// Hashage du mot de passe avant l'enregistrement
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Générer un token JWT
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const User = mongoose.model("User", userSchema);
export default User;