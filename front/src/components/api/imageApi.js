// Imagetapi.js

import axios from 'axios';

export const setAuthHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

 // Fonction pour créer une nouvelle image
 export const createImage = async (selectedImage, description) => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:8000/api/createImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


    // Fonction pour supprimer une image
   export  const deleteImage = async (imageId) => {
        try {
          const response = await axios.delete(`http://localhost:8000/api/deleteImage/${imageId}`);
          return response.data;
        } catch (error) {
          throw error;
        }
      };
    


  
        // Fonction pour modifier une image
  export const modifyImage = async (imageId, selectedImage, description) => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('description', description);

    try {
      const response = await axios.put(`http://localhost:8000/api/modifyImage/${imageId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  // Fonction pour liker/disliker une image
  export const likeImage = async (imageId, likeValue, userId) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/likeImage/${imageId}`, {
        like: likeValue,
        userId: userId,
      });
      return response.data;
      
    } catch (error) {
      throw error;
    }
  };
