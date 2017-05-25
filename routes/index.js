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

var ibmdb = require('ibm_db');


//DashDB Connection
var db2 = {
        db: "BLUDB",
        hostname: "dashdb-entry-yp-dal09-10.services.dal.bluemix.net",
        port: 50000,
        username: "dash7239",
        password: "S0Zj$N$kc8Xy"
     };

var connString = "DRIVER={DB2};DATABASE=" + db2.db + ";UID=" + db2.username + ";PWD=" + db2.password + ";HOSTNAME=" + db2.hostname + ";port=" + db2.port;

router.get('/getTweet', function(req, res) {
    ibmdb.open(connString, function(err, conn) {
			if (err ) {
			 res.send("error occurred " + err.message);
			}
			else {
				conn.query("SELECT * " +
						"from TWITTER_SENTIMENT_COUNT " +
						"where ORG = 'JPMorgan'", function(err, results) {
				if ( !err ) { 
					res.send(results);
					
				} else {
				   res.send("error occurred " + err.message);
				}
				conn.close(function(){
					console.log("Connection Closed");
					});
				});
			}
		} );
});



router.get('/',
  function(req, res) {
    res.render('home');
  });

router.get('/initialize',
  function(req, res) {
	db.collection('mycollection').drop();
	db.collection('counters').drop();
   	 db.collection('counters').insert({
	      _id : '5901e810cbe8f800530f03df',
	      seq: 0
	   }).then(function(response){
	 	res.send(response);
	 });
  });
 
router.get('/save', function(req,res){
	db.collection('counters').findOneAndUpdate(
        {_id : '5901e810cbe8f800530f03df' },
        { $inc: { seq: 1 } },
	  {
		returnNewDocument: true
	  }
    ).then(function(result) {
		db.collection('mycollection').insert({"candidate_id" : result.seq});
		
	});
	res.send("done");
});
  
  
router.get('/disp',
  function(req, res) {
   	db.collection('mycollection').find().then(function(response){
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

router.get('/restWEX',function(req,res){
	http.get('http://01hw424836:9080/vivisimo/cgi-bin/velocity.exe?v.function=query-search&v.indent=true&query=press%20releases&sources=Sample_Collection1202631&v.app=api-rest&v.username=api-user&v.password=1FcUs,D$',function(response){
	response.on('data', function (chunk) {
    res.send(chunk);
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
