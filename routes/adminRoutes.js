const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");

// Route pour ajouter un utilisateur en tant qu'administrateur
router.post("/addAdminUser", isAdminMiddleware, userController.addAdminUser);

// Route pour modifier un utilisateur en tant qu'administrateur
router.put("/editAdminUser/:userId", isAdminMiddleware, userController.editAdminUser);

// Route pour supprimer un utilisateur en tant qu'administrateur
router.delete("/deleteAdminUser/:userId", isAdminMiddleware, userController.deleteAdminUser);

// Route pour lister tous les utilisateurs en tant qu'administrateur
router.get("/listAdminUsers",  userController.listAdminUsers);

// Route pour vérifier si un utilisateur est administrateur
router.get("/isAdmin/:userId", userController.checkIsAdmin);

module.exports = router;
