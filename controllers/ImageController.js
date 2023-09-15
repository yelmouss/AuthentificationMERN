//imagecontroller.js
const Image = require("../models/Image");
const fs = require("fs");

const path = require("path");

exports.createPhoto = (req, res, next) => {
  const { description, title } = req.body; // Récupérez la description du champ du formulaire
  const fileNameWithoutExtension = path.parse(req.file.filename).name; // Obtenez le nom de base du fichier sans l'extension
  // const imageUrl = `${req.protocol}://${req.get('host')}/images/${fileNameWithoutExtension}`;
  const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`; // Ne pas ajouter l'extension ici

  // Créez une nouvelle instance de l'objet Image en utilisant les données reçues
  const image = new Image({
    userId: req.auth.userId, // Vous devez déterminer l'ID de l'utilisateur ici
    title,
    description,
    imageUrl,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  // Enregistrez l'image dans la base de données
  image
    .save()
    .then(() => {
      res.status(201).json({ message: "Image postée !" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.getOnePhoto = (req, res, next) => {
  Image.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error: "error" }));
};

exports.getAllPhoto = (req, res, next) => {
  Image.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.modifyPhoto = async (req, res, next) => {
  const { description } = req.body;

  try {
    const image = await Image.findOne({ _id: req.params.id });

    if (!image) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }

    if (image.userId !== req.auth.userId) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }

    // Mettez à jour la description si elle a été modifiée
    if (description) {
      image.description = description;
    }

    // Mettez à jour l'image si une nouvelle a été téléchargée
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      image.imageUrl = imageUrl;
    }

    await image.save();

    res.status(200).json({ message: 'Image modifiée avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deletePhoto = (req, res, next) => {
  Image.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        res.status(404).json({ error: "Image non existante" });
      }
      if (sauce.userId !== req.auth.userId) {
        res.status(403).json({ error: "Requête non authorisée" });
      }
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Image.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Deleted!" }))
          .catch((error) => res.status(400).json({ error: error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.likePhoto = async (req, res, next) => {
  const { id: imageId } = req.params;
  const { like: likeValue, userId } = req.body;

  try {
    const image = await Image.findOne({ _id: imageId });

    if (!image) {
      return res.status(404).json({ error: 'Image non trouvée' });
    }

    // Vérifiez si l'utilisateur a déjà aimé ou disliké l'image
    const userLiked = image.usersLiked.includes(userId);
    const userDisliked = image.usersDisliked.includes(userId);

    if (likeValue === 1) {
      if (userLiked) {
        // L'utilisateur a déjà aimé l'image, supprimez le like
        image.likes -= 1;
        image.usersLiked = image.usersLiked.filter((id) => id !== userId);
      } else {
        // L'utilisateur n'a pas aimé l'image, ajoutez le like
        image.likes += 1;
        image.usersLiked.push(userId);

        // Si l'utilisateur avait disliké l'image auparavant, supprimez le dislike
        if (userDisliked) {
          image.dislikes -= 1;
          image.usersDisliked = image.usersDisliked.filter((id) => id !== userId);
        }
      }
    } else if (likeValue === -1) {
      if (userDisliked) {
        // L'utilisateur a déjà disliké l'image, supprimez le dislike
        image.dislikes -= 1;
        image.usersDisliked = image.usersDisliked.filter((id) => id !== userId);
      } else {
        // L'utilisateur n'a pas disliké l'image, ajoutez le dislike
        image.dislikes += 1;
        image.usersDisliked.push(userId);

        // Si l'utilisateur avait aimé l'image auparavant, supprimez le like
        if (userLiked) {
          image.likes -= 1;
          image.usersLiked = image.usersLiked.filter((id) => id !== userId);
        }
      }
    } else {
      // Si likeValue n'est ni 1 ni -1, supprimez le like ou le dislike de l'utilisateur s'il existe
      if (userLiked) {
        image.likes -= 1;
        image.usersLiked = image.usersLiked.filter((id) => id !== userId);
      } else if (userDisliked) {
        image.dislikes -= 1;
        image.usersDisliked = image.usersDisliked.filter((id) => id !== userId);
      }
    }

    // Enregistrez les modifications dans la base de données
    await image.save();

    res.status(200).json({ message: 'Action "Like" effectuée avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
