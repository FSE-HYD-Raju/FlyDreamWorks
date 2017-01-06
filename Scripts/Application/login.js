		var app = angular.module("LoginModule",[]);
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
    $window.location.href = '/FlyDreamWorks/adminviews/adminhome.html';
  }).error(function e1(res) {

  });
}
});
app.factory("getLoginDetails", function ($http) {
  var fun = {};
  fun.login = function (rec) {
    return $http.get('services/LoginDemo?uname="'+rec.uname+'"&password="'+rec.pwd+'"');
  }
  return fun;

});
