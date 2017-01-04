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

		app.controller("loginctrl",function($scope,$window,getLoginDetails){
		var data = {};

			data.uname = "vishnu";
		 data.pwd = "vishnu";
		$scope.login = function()
		{
		data.uname = $scope.uname;
		data.pwd = $scope.pwd;
			getLoginDetails.login(data).success(function s1(res) {
				$scope.Details = res;
				StorageUtil.setItem('uname',res[0].user_name);
				$window.location.href = '/FlyDreamWorks/adminviews/adminhome.html';
			}).error(function e1(res) {

			});
		}
		});

		app.controller('AdminHomeCtrl',function($scope){
		$scope.user = StorageUtil.getItem('uname');
		})
		app.controller('orderslistctrl',function($scope,getordersfact,approveorderfact){
			$scope.cardClass = 'card';

		getordersfact.orderslistfun().success(function s1(res) {
				$scope.Details = res;
				var details = $scope.Details;
				$scope.orderCount = 0;
				angular.forEach(details,function(val,key){
					if(val.event_name){
						$scope.orderCount++;
					}
				});
				$scope.flip = function() {
         $('.card').toggleClass('flipped');
      };



			//	alert(JSON.stringify(res));
			}).error(function e1(res) {
			});

		$scope.approveorder = function(input)
		{
		approveorderfact.approveorderfun(input).success(function s1(res) {
				$scope.Details = res;
				alert(JSON.stringify(res));

			}).error(function e1(res) {
			});
		}
		})
		app.factory("getLoginDetails", function ($http) {
			var fun = {};
			fun.login = function (rec) {
				return $http.get('services/LoginDemo?uname="'+rec.uname+'"&password="'+rec.pwd+'"');
			}
			return fun;

		});

		app.factory("getordersfact",function($http){
						var fun = {};
			fun.orderslistfun = function () {
				return $http.get('../services/getorderslist');
			}
			return fun;
		})
		app.factory("approveorderfact",function($http)
		{var fun = {};
			fun.approveorderfun = function (ordernum) {
				return $http.get('../services/updateStatus?ordernumber='+ordernum);
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
		events.created_by = StorageUtil.getItem('uname');
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
		alert(JSON.stringify(events));
		addEventsFact.inserteventsfun(events).success(function s1(res) {
				$scope.Details = res;
				alert(JSON.stringify(res));
			}).error(function e1(res) {
			});

		}
		});
