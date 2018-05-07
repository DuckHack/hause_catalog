const express = require('express');
const router = express.Router();

const logging_controller = require('../controllers/loggingController');

//GET logging page
router.get('/', logging_controller.logging);
//POST users data
router.post('/validate', logging_controller.validate_user)

module.exports = router;
