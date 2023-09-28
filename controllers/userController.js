const User = require("../models/User");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");

// Ajouter un utilisateur en tant qu'administrateur
exports.addAdminUser = async (req, res) => {
  try {
    const { username, password, FullName } = req.body;
    const isAdmin = true; // L'utilisateur ajouté est un administrateur

    // Créer un nouvel utilisateur avec le champ isAdmin défini
    const user = new User({ username, password, FullName, isAdmin });
    await user.save();

    res.json({ message: "Admin user added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Modifier un utilisateur en tant qu'administrateur
exports.editAdminUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, password, FullName } = req.body;

    // Rechercher l'utilisateur par son ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mettre à jour les champs nécessaires
    user.username = username;
    user.password = password;
    user.FullName = FullName;

    // Sauvegarder les modifications
    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Supprimer un utilisateur en tant qu'administrateur
exports.deleteAdminUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Supprimer l'utilisateur par son ID
    await User.findByIdAndRemove(userId);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Lister tous les utilisateurs en tant qu'administrateur
exports.listAdminUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs
    const users = await User.find();

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Vérifier si l'utilisateur est administrateur
exports.checkIsAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recherchez l'utilisateur par ID dans la base de données
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Renvoyez true si l'utilisateur est un administrateur, sinon renvoyez false
    res.json({ isAdmin: user.isAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

