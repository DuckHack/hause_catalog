//??
const Building = require('../models/building');
const Seller = require('../models/seller');

exports.details_param = function(req, res, next) {
	Building.findById(req.params.id)
		.populate('seller')
		.exec(function (err, building_details) {
			if (err) { return next(err); }
		      //Successful, so render
			res.render('details', { name: 'Details page', building: building_details });
		}); 

};
