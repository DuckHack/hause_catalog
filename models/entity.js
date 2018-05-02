
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var entitySchema = new Schema({
	user_name:	{type: String, required: true, max: 100},
	passwd:		{type: String, required: true, max: 50},
	email:		{type: String, max: 50},

});

module.exports = mongoose.model('Entity', entitySchema);
