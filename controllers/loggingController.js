
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Entity = require('../models/entity');

exports.logging = function(req, res) {
	//res.send('respond with a resource');
	res.render('logging', { title: 'Logging page'});
};

exports.validate_user = [
   
    // Validate that the name field is not empty.
	body('userName', 'Genre name required').isLength({ min: 3 }).trim(),
	body('emailAdress', 'Genre name required').isLength({ min: 3 }).trim(),
	body('password', 'Genre name required').isLength({ min: 3 }).trim(),    
	// Sanitize (trim and escape) the name field.
	sanitizeBody('userName').trim().escape(),
	sanitizeBody('emailAdress').trim().escape(),
	sanitizeBody('password').trim().escape(),

    // Process request after validation and sanitization.
	(req, res, next) => {

		// Extract the validation errors from a request.
		const errors = validationResult(req);
/*
		// Create a genre object with escaped and trimmed data.
		var genre = new Genre(
			{ name: req.body.name }
		);

*/
		if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
			res.send('Error');			
			//res.render('logging', { title: 'Create Genre', genre: genre, errors: errors.array()});
			return;
		}
		else {
			// Data from form is valid.
			// Check if Genre with same name already exists.
			Entity.findOne({ 'user_name': req.body.userName })
				.exec( function(err, found_entity) {
				if (err) { return next(err); }

				if (found_entity) {
					console.log(req.body.password);
				// Genre exists, redirect to its detail page.
/*					
					if(found_entity.passwd !== req.body.password){
						res.render('logging', { title: 'Invalid password'});						
					}
*/
					res.send(found_entity.passwd);					
					//res.redirect(found_genre.url);
				}
				else {
					res.render('logging', { title: 'Invalid user'});
//					genre.save(function (err) {
						if (err) { return next(err); }
							// Genre saved. Redirect to genre detail page.
							//res.redirect(genre.url);
//                        }
//			);

                     }

                 });
        }
    }
];

