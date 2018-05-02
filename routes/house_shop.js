var express = require('express');
var router = express.Router();

// Require controller modules.
var building_controller = require('../controllers/buildingController');
var seller_controller = require('../controllers/sellerController');


/// BUILDING ROUTES ///

// GET catalog home page.
router.get('/', building_controller.index);


module.exports = router;
