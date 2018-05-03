var express = require('express');
var router = express.Router();

var details_controller = require('../controllers/detailsController');

//GET about page
router.get('/', details_controller.details);

router.get('/:id', details_controller.details_param);

module.exports = router;
