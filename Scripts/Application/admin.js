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
					}).otherwise({
					  redirectTo: '/orderslist'
				  });
			}
		 );

			app.controller('AdminHomeCtrl',function($scope){
			$scope.user = localStorage.getItem('uname');
			})
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
					alert(JSON.stringify(res));
				}).error(function e1(res) {
				});

			}
			});
