var watson = require('watson-developer-cloud');
var conversation = watson.conversation({
  username: '376867d2-99de-4e84-a642-67f612aab01f',
  password: 'iRJXj4faSOLP',
  version: 'v1',
  version_date: '2016-09-20'
});

var workspaceId = "5fb0e253-646a-4f81-8a0a-ff9c3c5f258c";
var context = {};
var questions = [];

module.exports = function(router,db){
	router.post("/askfirst",
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res, next) {	
		context = {"username": 'Abrar'};
		conversation.message({
		  workspace_id: workspaceId,
		  input:{'text' : " "},
		  context: context
		},function(err, response) {
		  if (err)
		  {	
			console.log('error:', err);
		  }
		 else
		  {
		  context = response.context;
		  res.send(JSON.stringify(response.output));
		  }
		});
});
router.post("/askwatson",
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res, next) {	
		conversation.message({
		  workspace_id: workspaceId,
		  input:{'text' : req.body.question},
		  context: context 
		},function(err, response) {
		  if (err)
		  {	
			console.log('error:', err);
		  }	
		  else
		  {
			 switch(response.context.start)
			 {
				case 0 : 
							questions = [];
							questions.push({ "start" : response.context.start , "question" : req.body.question , "answer" : response.output.text } );	 		
							response.context.start = response.context.start + 1;
							break;
				
				case 999 :  
							questions.push({ "start" : response.context.start , "question" : req.body.question , "answer" : response.output.text } );	 		
							db.collection('unansweredflow').insert({questions});
							questions = [];
							response.context.start = 0;
							break;
						   
				default :  
							questions.push({ "start" : response.context.start , "question" : req.body.question , "answer" : response.output.text } );						   
							response.context.start = response.context.start + 1;
							break;
			 }
			  context = response.context;
			  res.send(JSON.stringify(response.output));
		  }
		});
	});

router.post('/display', function(req, res, next) {	
	db.collection('chat').find().then(function(response) {	
      res.send(response);     
    });
});


router.get('/mostaccessed', function(req, res, next) {	
	db.collection("chat").aggregate( [ { $group : { _id : "$intents.intent" ,count:{$sum:1}} } ] ).then(function(response) {
	response.sort(function(a, b){
		return b.count - a.count;
	});
	res.send(response) ;    
    });
});

router.post('/previous', function(req, res, next) {	
	db.collection('unansweredflow').find().then(function(response) {
      res.send(response);     
    });
});

router.post('/updateEntity', function(req, res, next) {	
	 db.collection('chat').update({'_id':req.body._id},{$set:{'entities':req.body.entities}},function(err, updated) {
                  if( err || !updated ) console.log("Not updated");
                  else res.send("Updated");
                });			
});
router.post('/updateIntent', function(req, res, next) {	
	 db.collection('chat').update({'_id':req.body._id},{$set:{'intents':req.body.intents}},function(err, updated) {
                  if( err || !updated ) console.log("Not updated");
                  else res.send("Updated");
                });			
});
 
router.get('/deleteusers', function(req, res, next) {	
	db.collection('users').drop();
	db.collection('users').ensureIndex( { username: 1 }, { unique: true } );
	res.send("done");
});
router.get('/deletechat', function(req, res, next) {	
	db.collection('chat').drop();
	res.send("done")
});
router.get('/deletequestions', function(req, res, next) {	
	db.collection('newquestions').drop();
	res.send("done")
});

router.get('/saveconversation',function(req,res,next){
	
	db.collection('chat').find().then(function(response) {	
      res.send(response);     
    });
});
router.get('/savenewquestions',function(req,res,next){
	db.collection('newquestions').find().then(function(response) {	
      res.send(response);     
    });
});

}