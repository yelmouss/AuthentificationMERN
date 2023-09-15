// ImageUploadModal.js
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createImage, deleteImage, likeImage, modifyImage } from './api/imageApi';
import { useNavigate } from 'react-router-dom';

function ImageUploadModal(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setSelectedImage(e.target.files[0]);
    } else if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const history = useNavigate();

  const handleUpload = async () => {
    try {
      const result = await createImage(selectedImage, description, title);
      console.log('Image ajoutée avec succès', result);
      setSelectedImage(null);
      setDescription('');
      setTitle('');
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
        <input type="file" accept="image/*" name='image' onChange={handleInputChange} />
        <input type="text" name='title' value={title} placeholder="Titre de l'image" onChange={handleInputChange} />
        <textarea
          name='description'
          placeholder="Description"
          value={description}
          onChange={handleInputChange}
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
