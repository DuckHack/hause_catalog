//??
var Seller = require('../models/seller');


//show list of buildings
exports.seller_list = function(req, res){
	res.send('seller_list');
};

//show building details
exports.seller_detail = function(req, res){
	res.send('seller_detail');
};

//Display Building create form on GET
exports.seller_create_get = function(req, res){
	res.send('seller_create_get');
};

//Handle Building create on POST
exports.seller_create_post = function(req, res){
	res.send('seller_create_post');
}

//Display Building delete form on GET
exports.seller_delete_get = function(req, res){
	res.send('seller_delete_get');
};

//Handle Building delete on POST
exports.seller_delete_post = function(req, res){
	res.send('seller_delete_post');
};

//Display Building update on get
exports.seller_update_get = function(req, res){
	res.send('seller_update_get');
};

//Handle Building update on POST
exports.seller_update_post = function(req, res){
	res.send('seller_update_post');
};
