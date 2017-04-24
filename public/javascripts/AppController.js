app.config(function($routeProvider) {
			$routeProvider
			.when("/chatbot", {
				templateUrl : "/views/chatbot.html",
				controller: 'myctr'
			})
			.when("/previous", {
				templateUrl : "/views/previous.html",
				controller: 'previous'
			})
			.when("/display", {
				templateUrl : "/views/display.html",
				controller: 'display'
			})
			.when("/profile", {
				templateUrl : "/views/profile.html",
				controller: 'profile'
			})
			
			.when("/twitter", {
				templateUrl : "/views/twitter.html",
				controller: 'twitterController'
			})
		}); 

app.controller('myctr', function($scope, $http) {
		 $scope.myData = []; 
		 $scope.myFunction = function()
		 {
			 $http.post("/askfirst").then(function(response){
				$scope.myData.push(response.data);	
			 });
		 }
		 $scope.send = function(){	
		 $scope.myData.push({"question" : $scope.formdata.question});
		  $http.post("/askwatson",$scope.formdata).then(function (response) {		  
			  $scope.myData.push(response.data);
			  $scope.formdata.question = " ";
		  });
	 }
});
		
app.controller('display', function($scope, $http) {	 	 	
		 
		 $scope.labels = [];
		 $scope.data = [];
		
		
		$http.post("/display").then(function (response) {		  		  
			  $scope.myData = response.data;
		  });
		$http.get("/mostaccessed").then(function (response) {		  
			 $scope.mostaccessed = response.data;
			 for(var i = 0 ; i <= response.data.length;i++)
			 {
				 	$scope.labels.push(response.data[i]._id[0]);
					$scope.data.push(response.data[i].count);
			 }
			 
		 });
		
		$scope.editItem = function (item) {
			item.editing = true;
		}

		$scope.doneEditing = function (item) {
		  item.editing = false;
		  $http.post("/updateEntity",item).then(function (response) {		  		  	
		 
			});					
		};
		
		$scope.editIntent = function (item) {
			item.IntentEditing = true;
		}
		
		$scope.doneintentEditing = function (item) {
			  item.IntentEditing = false;
			  $http.post("/updateIntent",item).then(function (response) {		  		  	
			
			  });	
			  					
		};
		 
});

app.controller('previous', function($scope, $http) {	 	 	
		  $http.post("/previous").then(function (response) {		  
			  $scope.prevqsn = response.data;
		  });
});

app.controller('profile', function($scope, $http) { 	
		  $http.get("/profile").then(function (response) {		  
			  $scope.user = response.data;
		  });
	
});
app.controller('twitterController', function($scope, $http) { 	
		 
		var joy = 0;
		var fear = 0;
		var sadness = 0;
		var disgust = 0;
		var anger = 0;
		$scope.tweetdata = [];
		$scope.labels = ["joy","fear","sadness","disgust","anger"];
		$scope.accessTweets = function(){	
		  $http.post("/accessTweets",$scope.formdata).then(function (response) {		  
			 $scope.tweets =  response.data;
			 $http.post("/analyse",{params:{tweets:$scope.tweets}}).then(function(response) {		  
			 $scope.data = response.data;
			 for(var i = 0 ; i <= response.data.length ;i++)
			 {
				joy = joy + response.data[i].emotion.document.emotion.joy;
				fear = fear + response.data[i].emotion.document.emotion.fear;
				sadness = sadness + response.data[i].emotion.document.emotion.sadness;
				disgust = disgust + response.data[i].emotion.document.emotion.disgust;
				anger = anger + response.data[i].emotion.document.emotion.anger;			
				if(i == response.data.length-1)
				{
					joy = joy/response.data.length*100;					
					fear = fear/response.data.length*100;					
					sadness = sadness/response.data.length*100;					
					disgust = disgust/response.data.length*100;					
					anger = anger/response.data.length*100;			
					$scope.graphdata = [joy,fear,sadness,disgust,anger];
					
				}
			}
			});
		  });
		}
});