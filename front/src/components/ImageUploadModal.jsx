import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'; // Ajout de la dépendance pour le formulaire
import { createImage } from './api/imageApi';
import { useNavigate } from 'react-router-dom';

function ImageUploadModal(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const history = useNavigate();

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
        <Form.Group>
          <Form.Label>Choisir une image</Form.Label>
          <Form.Control type="file" accept="image/*" name='image' onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Titre de l'image</Form.Label>
          <Form.Control type="text" name='title' value={title} placeholder="Titre de l'image" onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name='description' placeholder="Description" value={description} onChange={handleInputChange} />
        </Form.Group>
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
