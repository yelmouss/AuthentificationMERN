const axios = require("axios");
require("dotenv").config();

// URL de l'API Instagram
const instagramApiUrl = "https://graph.instagram.com";

// Noms des champs
const fields = {
  id: "id",
  caption: "caption",
  data: "data",
  permalink: "permalink",
  mediaType: "media_type",
  mediaUrl: "media_url",
  thumbnailUrl: "thumbnail_url",
  username: "username",
};

exports.getIgPhoto = async (req, res) => {
  try {
    const response = await axios.get(
      `${instagramApiUrl}/me/media?fields=${Object.values(fields).join(",")}&access_token=${process.env.IG_TOKEN}`
    );
    res.json(response.data.data);
  } catch (error) {
    handleInstagramError(res, error);
  }
};

exports.getIgCount = async (req, res) => {
  try {
    const response = await axios.get(
      `${instagramApiUrl}/me/media?fields=${Object.values(fields).join(",")}&access_token=${process.env.IG_TOKEN}`
    );
    const photos = response.data.data;
    const photoCount = photos.length;
    
    const photosWithCaptions = photos.filter(
      (photo) => photo[fields.caption] && photo[fields.caption].length > 0
    );

    const photoIMG = photos.filter(
      (photo) =>
        photo[fields.mediaType] === "IMAGE" ||
        photo[fields.mediaType] === "CAROUSEL_ALBUM"
    );

    const photoVideo = photos.filter(
      (photo) => photo[fields.mediaType] === "VIDEO"
    );

    const photoCountWithCaptions = photosWithCaptions.length;
    res.json({
      count: photoCount,
      withCaption: photoCountWithCaptions,
      photoIMG: photoIMG.length,
      photoVideo: photoVideo.length,
    });
  } catch (error) {
    handleInstagramError(res, error);
  }
};

exports.getIgFollowers = async (req, res) => {
  try {
    const response = await axios.get(
      `${instagramApiUrl}/v12.0/me?fields=id,username,account_type,media_count,media,follows_count&access_token=${process.env.IG_TOKEN}`
    );
    const followersCount = response.data;
    res.json({ followersCount });
  } catch (error) {
    handleInstagramError(res, error);
  }
};

// Fonction de gestion des erreurs Instagram
function handleInstagramError(res, error) {
  console.error(error);
  res.status(500).json({
    error: "Erreur lors de la récupération des données d'Instagram" + error,
  });
}
