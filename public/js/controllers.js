'use strict';
	mainApp.controller('mainController', function ($scope, $http){
		
		var users = [];
		$scope.userInfo;

		$scope.getUsers = function(){
			$http.get('/api/users').then(function (response){
				$scope.users = response.data;
				console.log("object form controller GET USER" );
				console.log($scope.users);
				var i;
				for (i = 0; i < $scope.users.length; i++){
					console.log($scope.users[i])
					if( $scope.users[i].email == "undefined email"){
						$scope.users[i].email = "(-)"
					}
					if( $scope.users[i].lastName == "undefined lastName"){
						$scope.users[i].lastName = "(-)";
					}
				}
			});
		}

		$scope.Add = function(){
			console.log("object form controller ADD USER" );
			console.log($scope.user );
			if( typeof $scope.user.email == "undefined" || $scope.user.email == ""){
				$scope.user.email = "undefined email";
			}
			if( typeof $scope.user.lastName == "undefined" || $scope.user.lastName == ""){
				$scope.user.lastName = "undefined lastName";
			}
			$http.post('/api/users', $scope.user).success(function (response){
				console.log("Contact" + " " + $scope.user.name + " " + "has been added");
			});
			$('#userName, #userLastName, #userNumber, #userEmail').val('');
			$scope.getUsers();
		}

		$scope.viewInfo = function (user){
			$scope.userInfo = user;
			console.log($scope.userInfo);
		}


	});
	

	mainApp.controller('homeController', function ($scope, $http){
		
		$scope.title = "CONTACT LIST";

		$scope.getUsers();

		// verificar esto
		
		$scope.addUserMain = function(user){
			$scope.clearUserData = user;
			$scope.clearUserData.name = "";
			$scope.clearUserData.lastName = "";
			$scope.clearUserData.number = "";
			$scope.clearUserData.email = "";
		} 

		$scope.delete = function (user){
			console.log(user);
			$http.delete('/api/users/' + user._id).success(function (response){
				console.log("user with id" + " " + user._id + " " + "deleted");
			});
			$scope.getUsers();
		}

		$scope.update = function (user){
			console.log(user);
			$http.put('/api/users/'+ user._id, user).success(function (response){
				console.log("user with id" + " " + user._id + " " + "has been updated");
				$scope.getUsers();
				
			});
		}
	});



