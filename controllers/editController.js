const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const multer  = require('multer');
const fs = require('fs');

const Building = require('../models/building');
const Seller = require('../models/seller');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
	var dir = './public/images/' + req.body.name;
	//if folder doesn't exist - create
	if (!fs.existsSync(dir)){
	    	fs.mkdirSync(dir);
	}
	cb(null, dir)

  },
  filename: function (req, file, cb) {
	console.log(file.fieldname + '-' + Date.now());
	cb(null, file.originalname)
  }
})
 
const upload = multer({ storage: storage }).array('images', 9);




exports.edit_suc = function(req, res){
	Seller.find({}, 'company_name')
		.exec(function (err, seller_list) {
			if (err) { return next(err); }
			//Successful, so render
			res.render('edit', { title: 'Edit page', status: 'ALL SYSTEMS GO',  seller_list: seller_list });
		});
};


exports.edit = function(req, res) {
	Seller.find({}, 'company_name')
		.exec(function (err, seller_list) {
			if (err) { return next(err); }
			//Successful, so render
			res.render('edit', { title: 'Edit page', seller_list: seller_list });
		});
};

exports.edit_building = [

	(req, res, next) => {
		upload(req, res, function (err) {
			if (err) {return;}
		
		    // Validate that the name field is not empty.
/*
			body('name', 'Building name required').isLength({ min: 3 }).trim();
			body('area', 'Area size required').isLength({ min: 3 }).trim();
//			body('emailAdress', '').isEmail().trim(),
			body('price', 'Price required').isLength({ min: 3 }).trim();
			body('beadrooms_number', 'Number of beadrooms required').isLength({ min: 1 }).trim();
			body('bathrooms_number', 'Number of bathrooms required').isLength({ min: 1 }).trim();    
			// Sanitize (trim and escape) the name field.
			sanitizeBody('name').trim().escape();
			sanitizeBody('area').trim().escape();
			sanitizeBody('price').trim().escape();
			sanitizeBody('beadrooms_number').trim().escape();
			sanitizeBody('bathrooms_number').trim().escape();
*/
//			console.log(req.body);
//			console.log("Everything went fine");
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
		            // There are errors. Render the form again with sanitized values/error messages.
				res.send(errors.array());			
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
							// return edit page with massage
							res.render('edit', {title: "Can't add the building, it's already in db"});
						}
						else {
							if (err) { return next(err); }
						
							Seller.findOne({ 'company_name': req.body.seller })
								.exec( function(err, found_seller){
									if (err) { return next(err);}
									var building = new Building(
									{seller: found_seller,
										name: req.body.name,
										area: req.body.area,
										price: req.body.price,
										beadrooms_number: req.body.beadrooms_number,
										bathrooms_number: req.body.bathrooms_number
									});
									//console.log(building);
									building.save(function (err) {
										if (err) { return next(err); }
										// Building saved. Redirect to genre edit page.
										res.redirect('/edit/suc');
									});
								});
						}
					});
			}
		})
	}
];
