// import jwt from "jsonwebtoken";
// import User from "../model/userModel.js";
// import { errorHandleMiddleware } from "./errorHandleMiddleware.js";
// import ErrorHandler from "./errorMiddleware.js";

// // Middleware pour authentifier les clients
// export const clientTokenAuth = errorHandleMiddleware(async (req, res, next) => {
//   const token = req.cookies.clientToken; // Token pour les clients
//   console.log("Received client token:", token);
//   if (!token) {
//     return next(new ErrorHandler("Client is not authenticated", 401));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(decoded.id);
    
//     if (!req.user) {
//       return next(new ErrorHandler("User not found", 404));
//     }

//     if (req.user.role !== "Client") {
//       return next(new ErrorHandler("Client is NOT authorized", 403));
//     }

//     next();
//   } catch (error) {
//     return next(new ErrorHandler("Token is not valid", 401));
//   }
// });

// // Middleware pour authentifier les administrateurs
// export const adminTokenAuth = errorHandleMiddleware(async (req, res, next) => {
//   const token = req.cookies.adminToken;
//   if (!token) {
//     return next(new ErrorHandler("Admin is not authenticated", 401));
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(decoded.id);
    
//     if (!req.user) {
//       return next(new ErrorHandler("User not found", 404));
//     }

//     if (req.user.role !== "Admin") {
//       return next(new ErrorHandler("Admin is NOT authorized", 403));
//     }

//     next();
//   } catch (error) {
//     return next(new ErrorHandler("Token is not valid", 401));
//   }
// });
// Importations nécessaires
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { errorHandleMiddleware } from "./errorHandleMiddleware.js";
import ErrorHandler from "./errorMiddleware.js";

// Middleware pour authentifier les clients
export const clientTokenAuth = errorHandleMiddleware(async (req, res, next) => {
  const token = req.cookies.clientToken; // Token pour les clients

  console.log("Received client token:", token); // Debugging

  if (!token) {
    // Si aucun token n'est fourni
    return next(new ErrorHandler("Client is not authenticated", 401));
  }

  try {
    // Décodage du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    // Vérification de l'existence de l'utilisateur
    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Vérification du rôle de l'utilisateur
    if (req.user.role !== "Client") {
      return next(new ErrorHandler("Client is NOT authorized", 403));
    }

    // Si tout est en ordre, passer au middleware suivant
    next();
  } catch (error) {
    // Gestion des erreurs de token invalide
    return next(new ErrorHandler("Token is not valid", 401));
  }
});

// Middleware pour authentifier les administrateurs
export const adminTokenAuth = errorHandleMiddleware(async (req, res, next) => {
  const token = req.cookies.adminToken; // Token pour les administrateurs

  if (!token) {
    // Si aucun token n'est fourni
    return next(new ErrorHandler("Admin is not authenticated", 401));
  }

  try {
    // Décodage du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    // Vérification de l'existence de l'utilisateur
    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Vérification du rôle de l'utilisateur
    if (req.user.role !== "Admin") {
      return next(new ErrorHandler("Admin is NOT authorized", 403));
    }

    // Si tout est en ordre, passer au middleware suivant
    next();
  } catch (error) {
    // Gestion des erreurs de token invalide
    return next(new ErrorHandler("Token is not valid", 401));
  }
});
