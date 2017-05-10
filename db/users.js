var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('mongodb://mohammed_abrar95:BPEJTwZgEYgKwixL@myapplicationdatabase-shard-00-00-gmb8r.mongodb.net:27017,myapplicationdatabase-shard-00-01-gmb8r.mongodb.net:27017,myapplicationdatabase-shard-00-02-gmb8r.mongodb.net:27017/MyDatabase?ssl=true&replicaSet=MyApplicationDatabase-shard-0&authSource=admin');
var db = monk('localhost:27017/MyApplicationDatabase');
var records = [];
//db.collection('users').insert({ _id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] });	
 /*var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];*/

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id;
	db.collection('users').find({'_id' : idx }).then(function(response) {
		if(response)
		{
			
			cb(null,response[0]);
		}
		else
		{
			cb(null,null);
		}
		
    });
  });
}

exports.findByUsername = function(username, cb) {
  db.collection('users').find({"username" : username}).then(function(response) {
       records = response; 		
		process.nextTick(function() {
		for (var i = 0, len = records.length; i < len; i++) {
		  var record = records[i];
		  if (record.username === username) {
			return cb(null, record);
		  }
		}
		
		return cb(null, null);
	  });
   });
  
}
exports.closedb = function(){
	db.close();
}
