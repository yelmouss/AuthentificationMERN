// userApi.js
import axios from "axios";

const token = localStorage.getItem("token"); // Récupérez le token depuis le stockage local ou d'où vous le stockez

const headers = {
  Authorization: `Bearer ${token}`,
};

const deleteUser = async (userId) => {
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/deleteAdminUser/${userId}`, {
      headers,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la suppression de l'utilisateur.");
  }
};

const editUser = async (userId, data) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/editAdminUser/${userId}`, data, {
      headers,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la mise à jour de l'utilisateur.");
  }
};

// Vous pouvez ajouter d'autres fonctions liées aux utilisateurs ici

export {
  deleteUser,
  editUser,
  // Ajoutez d'autres fonctions ici
};
