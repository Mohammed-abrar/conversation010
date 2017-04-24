//twitter routes

var twitter = require('twitter');

var twit = new twitter({
    consumer_key: 'iFcVBNTnjNERLLBQXTf7aHVGz',
   
 	consumer_secret: 'RceJq93nX2qxsFZhyDYF3xf7d3ECAiXiSTjyHIcrDkaT6jnO1F',
   
 	access_token_key: '393412092-ZERaKUtJBPFAKLcau7HaOvPwP612cXhMGD5VDZfM',

   	access_token_secret: 'coRMWFVJXue89NbV0MPmpGtm3cY5dT9prX2jDkPVeqiea'

});

module.exports = function(router,db){


router.get('/posttwit', function (req, res){
	  
	twit.post('statuses/update', {status: 'Posting from nodejs code'},  function(error, tweet, response){
	  if(error){
		console.log(error);
	  }
	res.send(response);  // Raw response object.
	});
});
router.get('/view' , function(req,res){
   var tweets = []; 	
	db.collection('twit1').find().then(function(response) {
		res.send(response);
		  for(var item of response[0].statuses) {
			   tweets.push({"text" :item.text });
				 console.log(item.text);
		  }
		  console.log(tweets);		 
	});	
});




router.post('/accessTweets', function (req, res){
	var tweets = [];
	var tweetsObject = [];
	twit.get('search/tweets',{q : req.body.tweetInput},function(error, response){
		tweets.push(response);
		for(var item of tweets[0].statuses) {
			   tweetsObject.push({"text" :item.text });
		  }
		res.send(tweetsObject);
	}); 
});


}