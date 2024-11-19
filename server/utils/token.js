export const jsontoken = (user, message, statusCode, res) => { 
  const token = user.generateJsonWebToken();

  // Déterminer le nom du cookie basé sur le rôle de l'utilisateur
  let cookieName = "userToken"; // Par défaut

  if (user.role === "Admin") {
    cookieName = "adminToken"; // Token pour l'administrateur
  } else if (user.role === "Client") {
    cookieName = "clientToken"; // Token pour les clients
  } else {
    throw new Error("Invalid user role");
  }

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Utiliser HTTPS en production
      sameSite: "Lax", // Pour éviter les attaques CSRF
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};