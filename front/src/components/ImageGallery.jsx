import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {  deleteImage, likeImage, modifyImage } from './api/imageApi';
import ImageUploadModal from './ImageUploadModal';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const history = useNavigate();
  const [imagesLiked, setImagesLiked] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);



  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:8000/api/images')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des images :', error);
      });
  }, []);

 

  // Fonction pour gérer les likes
  const handleLike = async (imageId, likeValue) => {
    if (imagesLiked.includes(imageId)) {
      return;
    }

    try {
      const result = await likeImage(imageId, likeValue, userId);
      console.log('Image aimée avec succès', result);

      // Mettez à jour les likes et dislikes dans le tableau d'images

      history(0);
    } catch (error) {
      console.error('Erreur lors de l\'action "Like" :', error);
    }
  };



  const handleImageUpload = () => {
    setShowUploadModal(true);
  };

  const handleUploadSuccess = () => {
    // Handle a successful upload here if needed
    // You can update the images list or perform other actions
    // For example, fetch the updated images list
    // and setImages(response.data);
    setShowUploadModal(false);
  };


  const handleImageModify = async (imageId) => {
    try {
      const result = await modifyImage(imageId, selectedImage, description);
      console.log('Image modifiée avec succès', result);
      setSelectedImage(null);
      setDescription('');
      history(0);
    } catch (error) {
      console.error('Erreur lors de la modification de l\'image :', error);
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      const result = await deleteImage(imageId);
      console.log('Image supprimée avec succès', result);
      history(0);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'image :', error);
    }
  };
  // Fonction pour déterminer si l'utilisateur a aimé ou disliké une image
  const getUserLikeStatus = (image) => {
    const userLiked = image.usersLiked.includes(userId);
    const userDisliked = image.usersDisliked.includes(userId);

    if (userLiked) {
      return 'liked'; // Utilisateur a aimé l'image
    } else if (userDisliked) {
      return 'disliked'; // Utilisateur a disliké l'image
    } else {
      return ''; // L'utilisateur n'a ni aimé ni disliké l'image
    }
  };

  return (
    <div className='container text-center p-5'>
      <div>
        <h3>Ajouter une nouvelle image</h3>


        <button onClick={handleImageUpload}>Ajouter une nouvelle image</button>

        <ImageUploadModal
          show={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      </div>
      <h2>Galerie d'images</h2>
      <div className="image-list ">

        <Masonry columnsCount={4}>
          {images.map((image) => (

            <div key={image._id} className="image-item p-2">

              <img src={image.imageUrl} alt={image.description} className='imagegallery' />
              <p>{image.description}</p>
              <div>
                <span
                  onClick={() => handleLike(image._id, 1)} className='btn'
                >
                  {getUserLikeStatus(image) === 'liked' ? '❤️' : '👍'}
                </span>
                <span>{image.likes} Likes</span>
                <br />
                <span
                  onClick={() => handleLike(image._id, -1)} className='btn'
                >
                  {getUserLikeStatus(image) === 'disliked' ? '👎' : '👎'}
                </span>
                <span>{image.dislikes} Dislikes</span>
              </div>
              {image.userId === userId && (
                <div>
                  <button onClick={() => handleImageModify(image._id)} className='btn'>Modifier</button>
                  <button onClick={() => handleImageDelete(image._id)} className='btn'>Supprimer</button>
                </div>
              )}
            </div>

          ))}
        </Masonry>

      </div>

    </div>
  );
}

export default ImageGallery;
