
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  // Vérifiez si un token a été fourni dans les en-têtes
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  // Utilisation d'une promesse pour vérifier le token
  new Promise((resolve, reject) => {
    // Vérifiez le token ici (par exemple, en utilisant la bibliothèque jsonwebtoken)
    // Si le token est valide et contient les informations d'administrateur, resolvez la promesse
    // Sinon, rejetez la promesse avec une erreur
    // Exemple avec jsonwebtoken (vous devrez ajuster cela à votre code)
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(new Error("Invalid token")); // Token invalide
      } else {
        // Vérifiez si l'utilisateur est un administrateur en fonction du contenu du token
        if (decoded.isAdmin) {
          resolve();
        } else {
          reject(new Error("Access denied. You are not an administrator."));
        }
      }
    });
  })
    .then(() => {
      next(); // Si la promesse est résolue, passez à la prochaine étape
    })
    .catch((error) => {
      res.status(403).json({ message: error.message }); // Si la promesse est rejetée, renvoyez une réponse d'erreur avec le message d'erreur
    });
};
