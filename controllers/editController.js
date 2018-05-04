
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const fileUpload = require('express-fileupload');


var Building = require('../models/building');
var Seller = require('../models/seller');

exports.edit = function(req, res) {
	//res.send('respond with a resource');

	Seller.find({}, 'company_name')
		.exec(function (err, seller_list) {
			if (err) { return next(err); }
				//Successful, so render
				console.log(seller_list);
				res.render('edit', { title: 'Edit page', seller_list: seller_list });
		});

	//res.render('edit', { title: 'Edit page'});
};

exports.edit_building = [
    // Validate that the name field is not empty.
	body('name', 'Building name required').isLength({ min: 3 }).trim(),
	body('area', 'Area size required').isLength({ min: 3 }).trim(),
//	body('emailAdress', '').isEmail().trim(),
	body('price', 'Price required').isLength({ min: 3 }).trim(),
	body('beadrooms_number', 'Number of beadrooms required').isLength({ min: 1 }).trim(),
	body('bathrooms_number', 'Number of bathrooms required').isLength({ min: 1 }).trim(),    
	// Sanitize (trim and escape) the name field.
	sanitizeBody('name').trim().escape(),
	sanitizeBody('area').trim().escape(),
	sanitizeBody('price').trim().escape(),
	sanitizeBody('beadrooms_number').trim().escape(),
	sanitizeBody('bathrooms_number').trim().escape(),

    // Process request after validation and sanitization.
	(req, res, next) => {

		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create a genre object with escaped and trimmed data.
		var building = new Building(
			{name: req.body.name,
			area: req.body.area,
			price: req.body.price,
			beadrooms_number: req.body.beadrooms_number,
			bathrooms_number: req.body.bathrooms_number}
		);
		console.log(building);
		console.log(req.files)
		if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
			res.send('Error');			
			//res.render('logging', { title: 'Create Genre', genre: genre, errors: errors.array()});
			return;
		}
		else {
			// Data from form is valid.
			Building.findOne({ 'name': req.body.name })
				.exec( function(err, found_building) {
					if (err) { return next(err); }
					if (found_building) {
					// Building with the same name is already in db
					// return editing page with massage
						res.render('edit', {title: "Can't add the building, it's already in db"});
					}
					else {
						if (err) { return next(err); }
						res.render('edit', { title: 'ALL SYSTEMS GO'});					
						// Genre saved. Redirect to genre detail page.
						//res.redirect(genre.url);
					}
				});
		}
	}
];

