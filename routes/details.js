var express = require('express');
var router = express.Router();

var details_controller = require('../controllers/detailsController');

//GET about page
router.get('/', details_controller.details);

router.get('/:name', details_controller.details_param);

module.exports = router;
