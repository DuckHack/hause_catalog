//??
var Building = require('../models/building');
var Seller = require('../models/seller');

//show list of buildings

exports.details = function(req, res) {
	res.render('details', { name: 'Details page'});
};

/*
exports.details_param = function(req, res, next) {
	console.log(req.params.id);
		console.log('Stop1');
    async.parallel({
        building: function(callback) {
	console.log('Stop2');
            Building.findById(req.params.id)
              .populate('seller')
              .exec(callback);
        },
        building_instance: function(callback) {

          Building.find({ 'building': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.building==null) { // No results.
            var err = new Error('Building not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
	console.log('Stop3');
	res.render('details', { name: 'Details page'});
    });

};
*/
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
