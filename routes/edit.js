const express = require('express');
const router = express.Router();

const edit_controller = require('../controllers/editController');

//GET edit page
router.get('/', edit_controller.edit);
//GET edit page after success editing
router.get('/suc', edit_controller.edit_suc);
//POST new building details
router.post('/edit_building', edit_controller.edit_building);

module.exports = router;
