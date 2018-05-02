
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var sellerSchema = new Schema({
	company_name:	{type: String, required: true, max: 100},
	phone_number:	{type: String, required: true, max: 50},
	email:		{type: String, max: 50},

});

module.exports = mongoose.model('Seller', sellerSchema);
