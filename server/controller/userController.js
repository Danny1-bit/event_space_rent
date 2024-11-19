import { errorHandleMiddleware } from "../middleware/errorHandleMiddleware.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import User from "../model/userModel.js";
import { jsontoken } from "../utils/token.js";

// Créer un nouvel utilisateur (Client)
export const createUserController = errorHandleMiddleware(
  async (req, res, next) => {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return next(new ErrorHandler("Please fill out the entire form.", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("User already registered. Please login.", 400));
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: "Client", // Rôle par défaut pour l'inscription
    });

    jsontoken(user, "User created successfully", 201, res);
  }
);

// Connexion utilisateur (Admin ou Client)
export const loginUserController = errorHandleMiddleware(
  async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return next(new ErrorHandler("Please fill full form", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 404));
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return next(new ErrorHandler("Invalid Email or Password", 404));
    }

    if (role !== user.role) {
      return next(new ErrorHandler("This Email Role and User Role do not match", 404));
    }

    jsontoken(user, "User Login Successfully", 200, res);
  }
);

// Récupérer les détails d'un client connecté
export const getSingleClient = errorHandleMiddleware(async (req, res, next) => {
  if (!req.user) {
      return next(new ErrorHandler("Client not found", 404));
  }
  res.status(200).json({
      success: true,
      user: req.user,
  });
});

// Créer un nouvel admin
export const createAdminController = errorHandleMiddleware(
  async (req, res, next) => {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return next(new ErrorHandler("Please fill full form", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler("This Email Already Registered", 400));
    }

    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: "Admin",
    });

    res.status(201).send({
      success: true,
      message: "Admin registered successfully",
      admin,
    });
  }
);

// Récupérer les détails d'un admin connecté
export const getSingleAdmin = errorHandleMiddleware(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("Admin not found", 404));
  }
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// Déconnexion Admin
export const logOutAdmin = errorHandleMiddleware(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .send({
      success: true,
      message: "Admin logged out successfully",
    });
});

// Connexion Admin
export const loginAdminController = errorHandleMiddleware(
  async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password", 400));
    }

    const admin = await User.findOne({ email, role: "Admin" }).select("+password");
    if (!admin) {
      return next(new ErrorHandler("Invalid Admin Email or Password", 404));
    }

    const passwordMatch = await admin.comparePassword(password);
    if (!passwordMatch) {
      return next(new ErrorHandler("Invalid Admin Email or Password", 404));
    }

    jsontoken(admin, "Admin Login Successfully", 200, res);
  }
);

// Déconnexion Client
export const logOutClient = errorHandleMiddleware(async (req, res, next) => {
  res
    .status(200)
    .cookie("clientToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .send({
      success: true,
      message: "Client logged out successfully",
    });
});

// Mettre à jour les informations de l'utilisateur
export const updateUserController = errorHandleMiddleware(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }

  const { firstName, lastName, email, phone } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.phone = phone || user.phone;

  await user.save();
  res.status(200).json({ success: true, user });
});