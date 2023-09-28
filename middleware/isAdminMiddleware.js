module.exports = (req, res, next) => {
    const user = req.user; // Supposons que vous stockez l'utilisateur dans req.user lors de l'authentification
    if (user && user.isAdmin) {
      // Si l'utilisateur est un administrateur, passez à la prochaine étape
      next();
    } else {
      // Si l'utilisateur n'est pas un administrateur, renvoyez une réponse d'erreur
      res.status(403).json({ message: "Access denied. You are not an administrator." });
    }
  };
  