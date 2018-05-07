//??
const Building = require('../models/building');

//Home paged
exports.index = function(req, res, next) {
	Building.find({}, 'name seller')
		.populate('seller')
		.exec(function (err, list_buildings) {
			if (err) { return next(err); }
      			//Successful, so render
			//console.log(list_buildings);
			res.render('index', { name: 'Buildings List', building_list: list_buildings });
		}); 
};
