app.controller('defaultController', function ($scope, $location, $route) {

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
	  
app.controller('eventslistctrl',function($scope,geteventsfact){
		geteventsfact.eventslistfun().success(function s1(res) {
				$scope.Details = res;
				alert(JSON.stringify(res));
			}).error(function e1(res) {
			});
		}	
		)
	  
	  
app.factory("geteventsfact",function($http){
						var fun = {};
			fun.eventslistfun = function () {
				return $http.get('services/events');
			}  
			return fun;
		})
		