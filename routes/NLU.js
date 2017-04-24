
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
	 'username': 'fccf9e25-edc0-4561-8438-26b1f2f7ae22',
	 'password': 'FRWktVn8MBdD',
     'version_date': '2017-02-27'
});


module.exports = function(router,db){
	
	router.post('/analyse', function (req, res){
	 var data = [];
	 var length = req.body.params.tweets.length;
	 var count = 0;
	 var tweettext = [];
	 for(var item of req.body.params.tweets)
	 {
		tweettext.push(item.text);
		 var parameters = {
		  'text': item.text,
		  'features': {
			  'emotion' : {},
			  'sentiment': {}
			
			}
		}
	
	if(count <= 5)
	{
	natural_language_understanding.analyze(parameters, function(err, response) {
	  if (err)
		console.log('error:', err);
	  else
	  {
		  
		  data.push({"text" : tweettext[count] , "sentiment" : response.sentiment , "emotion" : response.emotion });
		  count++;
		  console.log(JSON.stringify(data)); 
		  if(count == length || count == 5)
			{
				res.send(data);
			}
		  
	  }	
		});
	}
}
});
}