app.component("loginregModal",{
	templateUrl: "Views/LoginRegModal.html",
	controllerAs: "LoginRegModal",
	controller: "LoginRegModalCtrl"

});

app.factory("getcustcredentials",function($http){
	var fun = {};
	fun.custlogindets = function (rec) {
		return $http.get('services/CustomerLogin?email="'+ rec.email_id+'"&password="'+ rec.password+'"');
	}
	return fun;
});



app.controller('LoginRegModalCtrl',function($scope, getcustcredentials, addCustsFact, StorageUtil, $location, $rootScope, $route){
	var LoginRegModal = this;


	LoginRegModal.username = "";
	LoginRegModal.password = "";
	LoginRegModal.UserDetails = null;
	LoginRegModal.logintab = true;
  LoginRegModal.confirm_password="";

	if(StorageUtil.getItem("UserDetails") != "0"){
		LoginRegModal.UserDetails = JSON.parse(StorageUtil.getItem("UserDetails"));

	}


	LoginRegModal.custlogin = function(){
		var data = {};
		data.email_id = LoginRegModal.username;
		data.password = LoginRegModal.password;
		checkLogin(data);
	}
	$scope.LoginFailed = false;

	var checkLogin = function(data){
		getcustcredentials.custlogindets(data).then(function s1(res) {
			console.log(JSON.stringify(res.data));
			if(res.data != "") {
				LoginRegModal.UserDetails = res.data[0];
				StorageUtil.setItem("UserDetails", JSON.stringify(res.data[0]));
				console.log(JSON.stringify(res.data));
				$('#loginModal').modal('hide');
				$scope.LoginFailed = false;
        $rootScope.$emit('UserLoginChanged', LoginRegModal.UserDetails);
			} else {
				$scope.LoginFailed = true;
			}

		}, function e1(res) {
			console.log("error");
		});
	}




	LoginRegModal.saveCustomer = function(){
		LoginRegModal.confirm_password="";
		$('#loginModal').modal('hide');
		var customer = {};
		customer.cust_name = LoginRegModal.Regusername;
		customer.email_id = LoginRegModal.Regemail;
		customer.password = LoginRegModal.Regpassword;


		addCustsFact.insertcustsfun(customer).then(function s1(res) {
			LoginRegModal.RegResponse = res.data;
			console.log(JSON.stringify(res));
			checkLogin(customer);

		}, function e1(res) {
			console.log("error");
		});
	}

	var cleardata = function(){
		LoginRegModal.Regusername = null;
		LoginRegModal.Regemail = null;
		LoginRegModal.Regpassword = null;
		LoginRegModal.username = '';
		LoginRegModal.password = null;

	}

	LoginRegModal.logout = function(){
		LoginRegModal.UserDetails = 0;
		StorageUtil.setItem("UserDetails", 0);
		cleardata();
		// $location.path('/home');
$rootScope.$emit('UserLoginChanged', LoginRegModal.UserDetails);
	};
});



app.factory("addCustsFact",function($http){
	var fun = {};
	fun.insertcustsfun = function (customers) {
		return $http.post('/FlyDreamWorks/services/insertCustomer',customers);
	}
	return fun;
});
