// ImageUploadModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createImage, deleteImage, likeImage, modifyImage } from './api/imageApi';
import { useNavigate } from 'react-router-dom';

function ImageUploadModal(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const history = useNavigate();

  
  const handleUpload = async () => {
    try {
      const result = await createImage(selectedImage, description);
      console.log('Image ajoutée avec succès', result);
      setSelectedImage(null);
      setDescription('');
      history(0);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'image :', error);
    }
  };

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une nouvelle image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" accept="image/*" name='image' onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          Télécharger
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageUploadModal;
