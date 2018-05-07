const express = require('express');
const router = express.Router();

const about_controller = require('../controllers/aboutController');

//GET about page
router.get('/', about_controller.about);

module.exports = router;
