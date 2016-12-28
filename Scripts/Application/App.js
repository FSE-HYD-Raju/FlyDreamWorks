var app = angular.module('App', ['ngRoute']);



app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'Views/Home.html',
            controller: 'defaultController',
            activetab: 'home'
        }).when('/about', {
            templateUrl: 'Views/About.html',
			controller: 'defaultController',
            activetab: 'about'
        }).when('/contact', {
            templateUrl: 'Views/Contact.html',
			controller: 'defaultController',
            activetab: 'contact'
        }).when('/bookOnline', {
            templateUrl: 'Views/BookOnline.html',
<<<<<<< HEAD
			controller: 'defaultController',
			activetab: 'bookOnline',
=======
			controller: 'addOrdersCtrl',
			activetab: 'bookOnline',			
>>>>>>> d8d018d6291b3d539b717e35bd5cea804b0a7b40
        }).when('/events',{
			templateUrl: 'Views/Events.html',
			controller : 'eventsPageCtrl',
			activetab: 'events',
		}).when('/eventDetailsPage',{
			templateUrl: 'Views/eventDetailsPage.html',
			controller : 'eventDetailsPageCtrl',
			activetab: 'events',
		}).when('/custRegister',{
			templateUrl: 'Views/registerPage.html',
			controller: 'addCustsCtrl'
		}).otherwise({
            redirectTo: 'home'
        });
}]);
