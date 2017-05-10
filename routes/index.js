var request = require("request");
var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var mongo = require('mongodb');
var monk = require('monk');
var http = require('http');
var ObjectID = require('mongodb').ObjectID;
//var db = monk('localhost:27017/MyApplicationDatabase');
var db = monk('mongodb://mohammed_abrar95:BPEJTwZgEYgKwixL@myapplicationdatabase-shard-00-00-gmb8r.mongodb.net:27017,myapplicationdatabase-shard-00-01-gmb8r.mongodb.net:27017,myapplicationdatabase-shard-00-02-gmb8r.mongodb.net:27017/MyDatabase?ssl=true&replicaSet=MyApplicationDatabase-shard-0&authSource=admin');
router.get('/',
  function(req, res) {
    res.render('home');
  });

router.get('/initialize',
  function(req, res) {
	db.collection('counters').drop();
   	 db.collection('counters').insert({
	      _id : "FieldShoudBeHexDecimalString",
	      seq: 0
	   }).then(function(response){
	 	res.send(response);
	 });
  });
 
function getNextSequence(name) {
   var ret = db.collection('counters').findOneAndUpdate(
           { userid : name },
           { $inc: { seq: 1 } }
   );

   return ret.seq;
}

router.get('/autosave',
  function(req, res) {
   	db.collection('datatable').insert({
	candidate_id : getNextSequence("FieldShoudBeHexDecimalString"),
	name : "xyz"
	}).then(function(response){
		res.send("done");
	});
  });
router.get('/disp',
  function(req, res) {
   	db.collection('datatable').find().then(function(response){
		res.send(response);
	});
  });

router.get('/rest',function(req,res){
	http.get('http://01hw424836:8393/api/v10/analysis/text?collection=col_53367&text=bread&output=application/json',function(response){
	console.log('STATUS: ' + response.statusCode);
    console.log('HEADERS: ' + JSON.stringify(response.headers));
	response.setEncoding('utf8');
	response.on('data', function (chunk) {
    res.send('BODY: ' + chunk);
  });
});
});

router.get('/rest1',function(req,res1){
	var options = {
  hostname: '01hw424836',
  port: 8393,
  path: '/api/v10/analysis/text?collection=col_53367&text=bread&output=application/json',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  }
};
http.request(options, function(res) {
  console.log('Status: ' + res.statusCode);
  console.log('Headers: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (body) {
    res1.send('Body: ' + body);
  });
});
});

	

require("./Ruchi.js")(router,db);
require("./twitter.js")(router,db);
require("./conversation.js")(router,db);
require("./authenticate.js")(router,db);
require("./NLU.js")(router,db);
module.exports = router;
