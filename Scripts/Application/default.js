
(function(){
	
	
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
	  
app.controller('eventsPageCtrl',function($scope,geteventsfact, $location){
		geteventsfact.eventslistfun().success(function s1(res) {
				$scope.Events = res;				
				console.log(JSON.stringify(res));
			}).error(function e1(res) {
			});
      $scope.eventSelected = function(event){
	    localStorage.setItem("SelectedEvent", JSON.stringify(event));
	  $scope.Route('eventDetailsPage');
	  }		  
		
});
	  
	  
app.factory("geteventsfact",function($http){
						var fun = {};
			fun.eventslistfun = function () {
				return $http.get('services/events');
			}  
			return fun;
		});
		
		
app.controller('eventDetailsPageCtrl',function($scope,geteventsfact, $location){
		$scope.Event = JSON.parse(localStorage.getItem("SelectedEvent"));
		console.log($scope.Event);
});

app.component("loginTab",{
	templateUrl: "Views/LoginRegTab.html",
	controllerAs: "customerLoginCtrl",
	
});




}());











