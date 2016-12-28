


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


<<<<<<< HEAD
=======
app.factory("getcustcredentials",function($http){
						var fun = {};
			fun.custlogindets = function (rec) {
				return $http.get('services/CustomerLogin?uname="'+rec.uname+'"&password="'+rec.pwd+'"');
			}  
			return fun;
		});


		
app.component("loginTab",{
	templateUrl: "Views/LoginRegTab.html",
	controllerAs: "loginModel",
	controller: "customerLoginCtrl"
	
});

app.controller('customerLoginCtrl',function($scope,getcustcredentials){


this.username = "";
this.password = "";

this.custlogin = function()
{
        // data.uname = $scope.uname;
		// data.pwd = $scope.pwd;
		var data = {};
		data.uname = this.username;
		data.pwd = this.password;
 getcustcredentials.custlogindets(data).success(function s1(res) {
				 $scope.Custcred = res;				
				 console.log(JSON.stringify(res));
			 }).error(function e1(res) {
			 });
}
});


app.factory("addCustsFact",function($http)
		{var fun = {};
			fun.insertcustsfun = function (customers) {
				return $http.post('/FlyDreamWorks/services/insertCustomer',customers);
			}  
			return fun;
		})
		
		app.controller("addCustsCtrl",function($scope,addCustsFact)
		{
		$scope.saveCustomer = function(customer){
		alert(JSON.stringify(customer));
		 addCustsFact.insertcustsfun(customer).success(function s1(res) {
				 $scope.Details = res;
				alert(JSON.stringify(res));
			 }).error(function e1(res) {
			 });

		}
		});
		
		
app.factory("addOrdersFact",function($http)
		{var fun = {};
			fun.insertordersfun = function (order) {
				return $http.post('/FlyDreamWorks/services/insertOrders',order);
			}  
			return fun;
		})
		
app.controller("addOrdersCtrl",function($scope,addOrdersFact)
		{
		$scope.saveOrders = function(order){
		 order.event_id = 1;
		order.cust_id = 1;
		alert(JSON.stringify(order));
		 addOrdersFact.insertordersfun(order).success(function s1(res) {
				 $scope.Details = res;
				 alert(JSON.stringify(res));
			 }).error(function e1(res) {
			 });
		 }
		});








>>>>>>> d8d018d6291b3d539b717e35bd5cea804b0a7b40


// app.component("loginTab",{
// 	templateUrl: "Views/LoginRegTab.html",
// 	controllerAs: "loginModel",
// 	controller: "customerLoginCtrl"
//
// });
//
// app.controller('customerLoginCtrl',function($scope,getcustcredentials){
//
//
// this.username = "";
// this.password = "";
//
// this.custlogin = function()
// {
//         // data.uname = $scope.uname;
// 		// data.pwd = $scope.pwd;
// 		var data = {};
// 		data.uname = this.username;
// 		data.pwd = this.password;
//  getcustcredentials.custlogindets(data).success(function s1(res) {
// 				 $scope.Custcred = res;
// 				 console.log(JSON.stringify(res));
// 			 }).error(function e1(res) {
// 			 });
// }
// });
// app.factory("addCustsFact",function($http)
// 		{var fun = {};
// 			fun.insertcustsfun = function (customers) {
// 				return $http.post('/FlyDreamWorks/services/insertCustomer',customers);
// 			}
// 			return fun;
// 		})
//
// 		app.controller("addCustsCtrl",function($scope,addCustsFact)
// 		{
// 		$scope.saveCustomer = function(customer){
// 		alert(JSON.stringify(customer));
// 		 addCustsFact.insertcustsfun(customer).success(function s1(res) {
// 				 $scope.Details = res;
// 				alert(JSON.stringify(res));
// 			 }).error(function e1(res) {
// 			 });
//
// 		}
// 		});
