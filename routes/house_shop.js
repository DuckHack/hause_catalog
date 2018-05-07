const express = require('express');
const router = express.Router();

// Require controller modules.
const building_controller = require('../controllers/buildingController');

// GET catalog home page.
router.get('/', building_controller.index);

module.exports = router;
