
var Entity = require('../models/entity');

exports.logging = function(req, res) {
	//res.send('respond with a resource');
	res.render('logging', { title: 'Logging page'});
};

