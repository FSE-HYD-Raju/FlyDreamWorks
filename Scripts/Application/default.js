


app.controller('defaultController', function ($scope, $location, $route, $rootScope, StorageUtil) {

  // $scope.Init = function () {
  //    StorageUtil.clear();
  //  }
  // $scope.Init();
  $scope.Route = function (path) {
    $location.path(path);
  }
  if(!StorageUtil.getItem("UserDetails")){
    StorageUtil.setItem("UserDetails", 0);
  }
  $scope.links = [
    { src: "Images/booking-Photographer.jpg", alt: "", caption: "" },
    { src: "Images/onMountain.jpg", alt: "", caption: "" },
    { src: "Images/holdingHand.jpg", alt: "", caption: "" },
    { src: "Images/average_wedding_cost.jpg", alt: "", caption: "" },
    { src: "Images/Table.jpg", alt: "", caption: "" },
  ];
  $scope.route = $route;

  $rootScope.$on("$locationChangeStart", function (event, next, current) {
  var index = next.indexOf("bookOnline");
    if (StorageUtil.getItem("UserDetails") == "0" && index >= 0 ) {
      $scope.Route('/home');

    }
    console.log(next);
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

      $(document).ready(function() {
        $('.carousel').carousel({
          interval: 2000
        })
      });

    }



  }
});






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

app.controller('customerLoginCtrl',function($scope,getcustcredentials, StorageUtil){

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

app.controller("addCustsCtrl",function($scope,addCustsFact, StorageUtil)
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
