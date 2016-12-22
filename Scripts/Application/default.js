app.controller('defaultController', function ($scope, $location, $route,getEventsfact) {

    $scope.Route = function (path) {
        $location.path(path);
    }

    $scope.links = [
        { src: "Images/booking-Photographer.jpg", alt: "", caption: "" },
        { src: "Images/onMountain.jpg", alt: "", caption: "" },
        { src: "Images/holdingHand.jpg", alt: "", caption: "" },
        { src: "Images/average_wedding_cost.jpg", alt: "", caption: "" },
        { src: "Images/Table.jpg", alt: "", caption: "" },

    ];
    $scope.route = $route;
  getEventsfact.getAllUsedVehicles().success(function s1(res) {
        $scope.Details = res;
 	}).error(function e1(res) {
        $location.path('/error');
    });
	
	

});




 app.directive('carousel', function($timeout) {
         return {
            restrict: 'E',
            scope: {
              links: '='
            },
            templateUrl: 'Views/carousel.html',
            link: function(scope, element) {
             
            }
         }
      });
	  
	  



app.factory("getEventsfact", function ($http) {
    var fun = {};
    fun.getAllUsedVehicles = function () {
        return $http.get('services/LoginDemo?uname="admin"&password="admin"');
    }  
	return fun;

});


app.controller("bookonlinectrl",function()
{
console.log('sdn');
});
