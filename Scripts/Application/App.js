var app = angular.module('App', ['ngRoute']);



app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'Views/Home.html',
            controller: 'defaultController',
            activetab: 'home'
        }).when('/about', {
            templateUrl: 'Views/About.html',
            activetab: 'about'

        }).when('/contact', {
            templateUrl: 'Views/Contact.html',
            activetab: 'contact'

        }).when('/bookOnline', {
            templateUrl: 'Views/BookOnline.html',
            activetab: 'bookOnline',
			controller: 'bookonlinectrl'
        }).
        otherwise({
            redirectTo: 'home'
        });
}]);





