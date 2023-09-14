const express = require('express');
const router = express.Router();

const ImageController = require('../controllers/ImageController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, ImageController.createPhoto);
// router.get('/:id', auth, ImageController.getOnePhoto);
router.get('/images',  auth, ImageController.getAllPhoto);
// router.put('/:id', auth, multer, ImageController.modifyPhoto);
// router.delete('/:id', auth, ImageController.deletePhoto);
// router.post('/:id/like', auth, ImageController.likePhoto);

module.exports = router;