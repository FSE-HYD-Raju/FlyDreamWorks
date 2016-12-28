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
			controller: 'defaultController',
			activetab: 'bookOnline',
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
