//??
var Building = require('../models/building');
var Seller = require('../models/seller');

//show list of buildings

exports.details = function(req, res) {
	res.render('details', { name: 'Details page'});
};


exports.details_param = function(req, res, next) {
	Building.findById(req.params.id)
		.populate('seller')
		.exec(function (err, building_details) {
			if (err) { return next(err); }
      //Successful, so render
				console.log(building_details);
				res.render('details', { name: 'Details page', building: building_details });
		}); 

};
/*
exports.details_param = function(req, res) {
	console.log(req.params)
	res.render('details', { name: 'Details page'});
};
*/
