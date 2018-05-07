const express = require('express');
const router = express.Router();

const details_controller = require('../controllers/detailsController');

//GET details page
router.get('/:id', details_controller.details_param);

module.exports = router;
