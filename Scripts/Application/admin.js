			var app = angular.module("AdminModule",['ngRoute']);
		app.config(
			function config($routeProvider) {
				$routeProvider.when('/orderslist', {
						templateUrl: '../adminviews/orderslist.html',
						controller : 'orderslistctrl'
					}).
					when('/addevents',{
					templateUrl: '../adminviews/addevents.html',
					controller : 'addEventsCtrl'
					}).
					when('/eventslist',{
					templateUrl: '../adminviews/eventslist.html',
					controller : 'eventslistctrl'
					}).otherwise({
					  redirectTo: '/orderslist'
				  });
			}
		 );

			app.controller('AdminHomeCtrl',function($scope,$window){
			$scope.user = localStorage.getItem('uname');
			$scope.logoutvar = localStorage.getItem('logout');
			console.log($scope.logoutvar);
			$scope.logout = function ()
			{
				localStorage.setItem('uname','');
				localStorage.setItem('logout',true);
				$scope.logoutvar = localStorage.getItem('logout');
				console.log($scope.logoutvar);
				$window.location.href = "../login.html";
			}
			})

			app.controller('eventslistctrl',function($scope,geteventsfact){
				geteventsfact.eventslistfun().success(function s1(res){
					$scope.event_det = res;
				}).error(function e1(res){
					console.log(res);
				})
				})

			app.factory("geteventsfact",function($http){
							var fun = {};
				fun.eventslistfun = function () {
					return $http.get('../services/events');
				}
				return fun;
			})
			app.filter('floor', function() {
			    return function(input) {
			        return Math.floor(input);
			    };
			});
			app.filter('startFrom', function() {
			    return function(input, start) {
						if (!input || !input.length) { return; }
			        start = +start; //parse to int
			        return input.slice(start);
			    }
			});
			app.controller('orderslistctrl',function($scope,$window,getordersfact,approveorderfact){

					$scope.change = function(status,ordernum)
					{
						approveorderfact.approveorderfun(ordernum,status).success(function s1(res) {
							$window.location.reload();
							}).error(function e1(res) {
								console.log(JSON.stringify(res));
							});
								}
			getordersfact.orderslistfun().success(function s1(res) {
				$scope.sortReverse  = false;
				$scope.currval = 0;
				$scope.Details = res;
					var details = res;
					$scope.orderCount = res.length;
					$scope.approvedorderCount = 0;
					for ( i=0 ; i<details.length ; i++)
					{
					if(details[i].approved == "Y") {
							$scope.approvedorderCount++;
	}
	}
		$scope.rejectedordersCount = 0;
					for ( i=0 ; i<details.length ; i++)
					{
					if(details[i].approved == "N") {
					$scope.rejectedordersCount++;
	}
	}
		$scope.unseenordersCount = 0;
					for ( i=0 ; i<details.length ; i++)
					{
			if(details[i].approved == null) {
					$scope.unseenordersCount++;
	}
	}
				}).error(function e1(res) {
				});

			})


			app.factory("getordersfact",function($http){
							var fun = {};
				fun.orderslistfun = function () {
					return $http.get('../services/getorderslist');
				}
				return fun;
			})
			app.factory("approveorderfact",function($http)
			{

				var fun = {};
				fun.approveorderfun = function (ordernum,status) {
					console.log(ordernum);
					console.log(status);
					return $http.get("../services/updateStatus?ordernumber="+ordernum+"&status='"+status+"'");
				}
				return fun;
			})

			app.factory("addEventsFact",function($http)
			{var fun = {};
				fun.inserteventsfun = function (events) {
					return $http.post('../services/insertEvents',events);
				}
				return fun;
			})

			app.controller("addEventsCtrl",function($scope,addEventsFact)
			{
			$scope.saveEvents = function(events){
			events.created_by = localStorage.getItem('uname');
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			if(dd<10){
				dd='0'+dd;
			}
			if(mm<10){
				mm='0'+mm;
			}
			var today = yyyy+'-'+mm+'-'+dd;
			events.created_date = today;
			addEventsFact.inserteventsfun(events).success(function s1(res) {
					$scope.Details = res;
					$scope.success = true;
					console.log($scope.success);
				}).error(function e1(res) {
				$scope.error = true;
				console.log($scope.success);
				});

			}
			});
