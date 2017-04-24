var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');
var mongo = require('mongodb');
var monk = require('monk');

//var db = monk('localhost:27017/MyApplicationDatabase');
var db = monk('mongodb://mohammed_abrar95:BPEJTwZgEYgKwixL@myapplicationdatabase-shard-00-00-gmb8r.mongodb.net:27017,myapplicationdatabase-shard-00-01-gmb8r.mongodb.net:27017,myapplicationdatabase-shard-00-02-gmb8r.mongodb.net:27017/MyDatabase?ssl=true&replicaSet=MyApplicationDatabase-shard-0&authSource=admin');

router.get('/',
  function(req, res) {
    res.render('home');
  });

require("./twitter.js")(router,db);
require("./conversation.js")(router,db);
require("./authenticate.js")(router,db);
require("./NLU.js")(router,db);
module.exports = router;
