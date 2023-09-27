const axios = require("axios");

exports.getIgPhoto = async (req, res) => {
  try {
    const response = await axios.get(
      "https://graph.instagram.com/me/media?fields=id,caption,data,permalink,username,media_type,media_url,thumbnail_url&access_token=IGQWRNeERKTnFXcm5nM0hoS0d2TXY5TEVVQndPRGVFMXBDNXk0UVJWdXdONGZAUX1hqV1M0Nm1UVTRwTHZAmelUwTzZA4Y0tMZA0tmRkZAkSkpMYVBzdGNkZAnJ1VDNkWGJsQlBDcUtEVmdIbTVmb3FOd3V5WWNoaWNpRzAZD"
    );
    //   const filteredPhotos = response.data.data.filter(photo => photo.media_type === 'IMAGE');
    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des données d'Instagram" + error,
    });
  }
};

exports.getIgCount = async (req, res) => {
  try {
    const response = await axios.get(
      "https://graph.instagram.com/me/media?fields=id,caption,data,permalink,media_type,media_url,username,thumbnail_url&access_token=IGQWRNeERKTnFXcm5nM0hoS0d2TXY5TEVVQndPRGVFMXBDNXk0UVJWdXdONGZAUX1hqV1M0Nm1UVTRwTHZAmelUwTzZA4Y0tMZA0tmRkZAkSkpMYVBzdGNkZAnJ1VDNkWGJsQlBDcUtEVmdIbTVmb3FOd3V5WWNoaWNpRzAZD"
    );
    const photos = response.data.data;
    const photoCount = photos.length;
    // Filtrer les photos avec des légendes non vides
    const photosWithCaptions = photos.filter(
      (photo) => photo.caption && photo.caption.length > 0
    );

    const photoIMG = photos.filter(
      (photo) =>
        photo.media_type === "IMAGE" || photo.media_type === "CAROUSEL_ALBUM"
    );

    const photoVideo = photos.filter((photo) => photo.media_type === "VIDEO");
    // Obtenir le nombre de photos avec des légendes
    const photoCountWithCaptions = photosWithCaptions.length;
    res.json({
      count: photoCount,
      withCaption: photoCountWithCaptions,
      photoIMG: photoIMG.length,
      photoVideo: photoVideo.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des données d'Instagram" + error,
    });
  }
};

exports.getIgFollowers = async (req, res) => {
  try {
    const response = await axios.get(
      "https://graph.instagram.com/v12.0/me?fields=id,username,account_type,media_count,media&access_token=IGQWRNeERKTnFXcm5nM0hoS0d2TXY5TEVVQndPRGVFMXBDNXk0UVJWdXdONGZAUX1hqV1M0Nm1UVTRwTHZAmelUwTzZA4Y0tMZA0tmRkZAkSkpMYVBzdGNkZAnJ1VDNkWGJsQlBDcUtEVmdIbTVmb3FOd3V5WWNoaWNpRzAZD"
    );
    const followersCount = response.data;
    res.json({ followersCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des données d'Instagram" + error,
    });
  }
};

