const express = require("express");
const router = express.Router();
const IgController = require("../controllers/IGController");


router.get('/instagram-data', IgController.getIgPhoto);
router.get('/instagram-getIgCount', IgController.getIgCount);
router.get('/instagram-getIgFollowers', IgController.getIgFollowers);


module.exports = router;