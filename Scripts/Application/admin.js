		var app = angular.module("AdminModule",['ngRoute']);	
	app.config(
		function config($routeProvider) {
			$routeProvider.when('/orderslist', {
					templateUrl: '../adminviews/orderslist.html',
					controller : 'orderslistctrl'
				}).
				otherwise({
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
				localStorage.setItem('uname',res[0].user_name);
				$window.location.href = '/FlyDreamsProject/adminviews/adminhome.html';		
			}).error(function e1(res) {
			});
		}
		});

		app.controller('AdminHomeCtrl',function($scope){
		$scope.user = localStorage.getItem('uname');
		})
		app.controller('orderslistctrl',function($scope,getordersfact,approveorderfact){
		getordersfact.orderslistfun().success(function s1(res) {
				$scope.Details = res;
				alert(JSON.stringify(res));
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