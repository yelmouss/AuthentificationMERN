// imagemodifymodal

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { modifyImage } from './api/imageApi';
import { useNavigate } from 'react-router-dom';

function ImageModifyModal(props) {
  const [description, setDescription] = useState(props.image.description);
  const [selectedImage, setSelectedImage] = useState(null); // State pour l'image sélectionnée
  const history = useNavigate();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  

  const handleModify = async () => {
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("description", description);

      await modifyImage(props.image._id, formData);
      props.onModifySuccess();
      history(0)
    } catch (error) {
      console.error('Erreur lors de la modification de l\'image :', error);
    }
  };


  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier l'image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" accept="image/*" name='image' onChange={handleImageChange} />
        <textarea
          type="text"
          placeholder="Description"
          value={description} // Utilisez la description du state local
          onChange={handleDescriptionChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleModify}>
          Modifier
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ImageModifyModal;
