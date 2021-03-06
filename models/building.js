
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var buildingSchema = new Schema({
    	seller			: {type: Schema.ObjectId, ref: 'Seller', required: true},
	name			: {type: String, required: true},			
	area			: {type: Number, required: true},
	land_area		: {type: Number, default: 0.0},
	price			: {type: Number, required: true},
	beadrooms_number	: {type: Number, required: true},
	bathrooms_number	: {type: Number, required: true},
	publication_date	: {type: String, default: '2012-12-21'},
});

buildingSchema
	.virtual('url')
	.get(function(){
		return '/details/' + this._id;
});

module.exports = mongoose.model('Building', buildingSchema);
	
