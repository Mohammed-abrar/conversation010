mainapp.config(function($routeProvider) {
			$routeProvider
			.when("/login", {
				templateUrl : "/views/login.html",
			})
			.when("/register", {
				templateUrl : "/views/register.html",
			})		
			.when("/about", {
				templateUrl : "/views/about.html",
			});
	}); 

mainapp.controller('register', function($scope, $http) {
		  $scope.register = function()
		  {
			  $http.post("/register",$scope.formdata).then(function (response) {		  
				  
				  $scope.msg = response.data;
				 $scope.reset();
			  });
		  }
		   $scope.reset = function()
		   {
			 $scope.formdata.username = "";
			 $scope.formdata.password = "";
			 $scope.formdata.confirmpassword = "";
			 $scope.formdata.displayname = "";
			 $scope.formdata.email = "";
		   }
		  
		   $scope.checkuser = function()
		   {	
				$http.post("/checkuser",$scope.formdata).then(function (response) {		  
				  $scope.usermsg = response.data;
			  });
				
		   } 
});