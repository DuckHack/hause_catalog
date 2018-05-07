
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const Entity = require('../models/entity');

exports.logging = function(req, res) {
	res.render('logging', { title: 'Logging page'});
};

exports.validate_user = [
    // Validate that the name field is not empty.
	body('userName', 'User name required').isLength({ min: 3 }).trim(),
	body('emailAdress', 'Email adress required').isLength({ min: 3 }).trim(),
	//body('emailAdress', '').isEmail().trim(),
	body('password', 'Password required').isLength({ min: 3 }).trim(),    
	// Sanitize (trim and escape) the name field.
	sanitizeBody('userName').trim().escape(),
	sanitizeBody('emailAdress').trim().escape(),
	sanitizeBody('password').trim().escape(),

    // Process request after validation and sanitization.
	(req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
            	// There are errors. Render the form again with sanitized values/error messages.
			res.send(errors.array());			
			//res.render('logging', { title: 'Create Genre', genre: genre, errors: errors.array()});
			return;
		}
		else {
			// Data from form is valid.
			// Check if user already exist
			Entity.findOne({ 'user_name': req.body.userName })
				.exec( function(err, found_entity) {
					if (err) { return next(err); }

					if (found_entity) {
						console.log(req.body.password + 'Req pass');	
						console.log(found_entity.passwd + ' Ent pass');
					// Genre exists, redirect to its detail page.
						if(found_entity.passwd !== req.body.password){
							res.render('logging', { title: 'Invalid password'});						
						}
						else{
							res.redirect('/edit');
						}
					}
					else {
						if (err) { return next(err); }
						res.render('logging', { title: 'Invalid user'});					
					}

                 		});
		}
	}
];
