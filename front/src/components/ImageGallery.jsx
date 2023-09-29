//imagegallery
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Masonry from "react-responsive-masonry";
import { deleteImage, likeImage } from './api/imageApi';
import ImageUploadModal from './ImageUploadModal';
import ImageModifyModal from './ImageModifyModal';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwt_decode(token);
  const userId = decodedToken.userId;
  const history = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedImageToModify, setSelectedImageToModify] = useState(null);
  const [showUserImages, setShowUserImages] = useState(false);
   // État pour afficher uniquement les images de l'utilisateur

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get(`${process.env.REACT_APP_API_URL}/api/images`)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des images :', error);
      });
  }, []);

  // Fonction pour gérer les likes
  const handleLike = async (imageId, likeValue) => {
    try {
      const result = await likeImage(imageId, likeValue, userId);
      console.log('Image aimée avec succès', result);
      history(0);
    } catch (error) {
      console.error('Erreur lors de l\'action "Like" :', error);
    }
  };

  const handleImageUpload = () => {
    setShowUploadModal(true);
  };

  const handleUploadSuccess = () => {
    setShowUploadModal(false);
  };

  const handleModifyImage = (image) => {
    setSelectedImageToModify(image);
    setShowModifyModal(true);
  };

  const handleModifySuccess = () => {
    setShowModifyModal(false);
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

  const getUserLikeStatus = (image) => {
    const userLiked = image.usersLiked.includes(userId);
    const userDisliked = image.usersDisliked.includes(userId);

    if (userLiked) {
      return 'liked';
    } else if (userDisliked) {
      return 'disliked';
    } else {
      return '';
    }
  };

  // Fonction pour basculer entre l'affichage des images de l'utilisateur et toutes les images
  const toggleUserImages = () => {
    setShowUserImages(!showUserImages);
  };

  // Filtrer les images en fonction de l'état showUserImages
  const filteredImages = showUserImages
    ? images.filter((image) => image.userId === userId)
    : images;

  return (
    <div className='container p-5'>
      <div className='p-5 d-block fs-1 '>
        <h1>Galerie d'images</h1>
        <button onClick={handleImageUpload} className='btn btn-dark m-2'>
          Ajouter une nouvelle image
        </button>
        <button onClick={toggleUserImages} className='btn btn-primary ml-3 m-2'>
          {showUserImages ? 'Afficher toutes les photos' : 'Afficher mes photos uniquement'}
        </button>
        <ImageUploadModal
          show={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      </div>

      <div className="image-list">
        <Masonry columnsCount={4}>
          {filteredImages.map((image) => (
            <div key={image._id} className="image-item p-2 border">
            
            <img src={image.imageUrl} alt={image.description} className='imagegallery' />
              <div>
                <span
                  onClick={() => handleLike(image._id, 1)} className='btn'
                >
                  {image.likes}   {getUserLikeStatus(image) === 'liked' ? '❤️' : '👍'}
                </span>
                <span
                  onClick={() => handleLike(image._id, -1)} className='btn'
                >
                  {image.dislikes}  {getUserLikeStatus(image) === 'disliked' ? '👎' : '👎'}
                </span>
              </div>
              <h6>{image.title}</h6>
              <p>{image.description}</p>

              {image.userId === userId && (
                <div className='text-end'>
                  {/* Bouton pour ouvrir le modal de modification */}
                  <button onClick={() => handleModifyImage(image)} className='btn'>🖊️</button>
                  {selectedImageToModify && (
                    <ImageModifyModal
                      show={showModifyModal}
                      onClose={() => setShowModifyModal(false)}
                      image={selectedImageToModify} // Assurez-vous que l'ID est correctement passé ici
                      onModifySuccess={handleModifySuccess}
                      description={image.description}
                    />
                  )}
                  <button onClick={() => handleImageDelete(image._id)} className='btn'>🗑️</button>
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

