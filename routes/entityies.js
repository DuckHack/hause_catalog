var express = require('express');
var router = express.Router();

var logging_controller = require('../controllers/loggingController');

/* GET users listing. */
router.get('/', logging_controller.logging);
/*
router.get('/', function(req, res, next){
  res.send('respond with a resource');
});
*/
module.exports = router;
