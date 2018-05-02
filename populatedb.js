#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
console.log('Stop1');
var async = require('async')
console.log('Stop2');
var Building = require('./models/building')
console.log('Stop3');
var Seller = require('./models/seller')
console.log('Stop4');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var buildings = []
var sellers = []
console.log('Stop5');
function buildingCreate(seller, name, area, land_area, price, beadrooms_number, bathrooms_number, publication_date, cb) {
  buildingdetail = {
			seller:seller,
			name:name,
			area:area, 
			land_area: land_area,
			price: price,
			beadrooms_number: beadrooms_number,
 			bathrooms_number: bathrooms_number,
			publication_date: publication_date,
		}
  
  var building = new Building(buildingdetail);
       
  building.save(function (err) {
    if (err) {
	console.log(err)
      cb(err, null)
      return
    }
    console.log('New building: ' + building);
    buildings.push(building)
    cb(null, building)
  }  );
}


function sellerCreate(company_name, phone_number, email, cb) {
  sellerdetail = { 
    company_name: company_name,
    phone_number: phone_number,
    email: email
  }
    
  var seller = new Seller(sellerdetail);    
  seller.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('new Seller: ' + seller);
    sellers.push(seller)
    cb(null, seller)
  }  );
}


function creteSellers(cb) {
    async.parallel([
        function(callback) {
          sellerCreate('vienna immobilien', '+43 1 478496949', 'vienna.immobilen@gmail.com', callback);
        },
        function(callback) {
          sellerCreate('ADRIONIKA INTERNATIONAL CONSULTANCY & COORDINATION', '+385 913573071', 'AICC@gamil.com', callback);
        },
        function(callback) {
          sellerCreate('Kühhas Consulting GmbH', '+43 664 200 2575', 'Consulting.GmbH@ya.com', callback);
        },
        ],
        // optional callback
        cb);
}

function creteBuildings(cb) {
    async.parallel([
        function(callback) {
          buildingCreate( sellers[0], 'Apartment for Jaguar',116, 12, 675000, 1, 2, '2018-01-03', callback);
        },
        function(callback) {
          buildingCreate( sellers[0], 'True North' ,73, 5, 350000, 1, 1, '2017-10-13', callback);
        },
        function(callback) {
          buildingCreate( sellers[0], 'GADGET HOUSE', 350, 120, 20000000, 3, 3, '2015-08-11', callback);
        },
        ],
        // optional callback
        cb);
}




async.series([
    creteSellers,
    creteBuildings
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: ');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




