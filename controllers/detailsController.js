//??
var Building = require('../models/building');
var Seller = require('../models/seller');

//show list of buildings

exports.details = function(req, res) {
	res.render('details', { name: 'Details page'});
};

exports.details_param = function(req, res) {
	console.log(req.params)
	res.render('details', { name: 'Details page'});
};
