import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Récupérez le jeton d'authentification depuis le localStorage (où vous l'avez stocké après la connexion)
    const token = localStorage.getItem('token');

    // Définissez le jeton d'authentification dans les en-têtes Axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Effectuez un appel API pour obtenir la liste des images depuis votre backend
    axios.get('http://localhost:8000/api/images')
      .then((response) => {
        setImages(response.data); // Mettez à jour le state avec les données des images
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des images :', error);
      });
  }, []);

  return (
    <div>
      <h2>Galerie d'images</h2>
      <div className="image-list">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <img src={image.imageUrl} alt={image.description} />
            <p>{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
