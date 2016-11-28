
'use strict';

	var mainApp = angular.module('MEANapp', ['ngRoute']);

	mainApp.config(['$routeProvider', function ($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller:'homeController'
				// controllerAs: 'vm'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);


