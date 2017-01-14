var app = angular.module('App', ['ngRoute','ngAnimate',  'ui.bootstrap']);

app.factory('StorageUtil', function () {
    var factory = {};

    factory.getItem = function (item) {
        return sessionStorage.getItem(item);
    }
    factory.setItem = function (item, itemValue) {
        sessionStorage.setItem(item, itemValue);
    }
    factory.removeItem = function (item) {
        sessionStorage.removeItem(item);
    }
    factory.removeAll = function () {
        sessionStorage.clear();
    }
    factory.removeAllExceptItem = function (item) {
        var i;
        var str = '';
        for (i = 0; i < sessionStorage.length; i++) {
            if (sessionStorage.l(i) != item)
                sessionStorage.removeItem(sessionStorage.l(i));
        }
    }
    return factory;
});


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
    controller: 'addOrdersCtrl',
    activetab: 'BookNow',
  }).when('/BookNow',{
    templateUrl: 'Views/Events.html',
    controller : 'eventsPageCtrl',
    activetab: 'BookNow',
  }).when('/eventDetailsPage',{
    templateUrl: 'Views/eventDetailsPage.html',
    controller : 'eventDetailsPageCtrl',
    activetab: 'BookNow',
  }).when('/custRegister',{
    templateUrl: 'Views/registerPage.html',
    controller: 'addCustsCtrl'
  }).when('/SuccessPage',{
    templateUrl: 'Views/successPage.html',
    controller: 'successPageCtrl',
    activetab: 'BookNow',
  }).otherwise({
    redirectTo: 'home'
  });

}]);
