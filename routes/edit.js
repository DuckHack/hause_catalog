var express = require('express');
var router = express.Router();

var edit_controller = require('../controllers/editController');

//GET about page
router.get('/', edit_controller.edit);

router.post('/edit_building', edit_controller.edit_building);

module.exports = router;
