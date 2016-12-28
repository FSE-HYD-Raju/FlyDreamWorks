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



app.controller('LoginRegModalCtrl',function($scope, getcustcredentials, addCustsFact){
	var LoginRegModal = this;

	LoginRegModal.username = "";
	LoginRegModal.password = "";
  LoginRegModal.UserDetails = null;
	LoginRegModal.logintab;
	LoginRegModal.custlogin = function()
	{
		$('.modal').modal('hide');
		var data = {};
		data.email_id = LoginRegModal.username;
		data.password = LoginRegModal.password;
    checkLogin(data);
	}

	var checkLogin = function(data){
		getcustcredentials.custlogindets(data).then(function s1(res) {
			LoginRegModal.UserDetails = res.data[0];
			localStorage.setItem("UserDetails", JSON.stringify(res.data[0]));
			console.log(JSON.stringify(res.data));
		}, function e1(res) {
			console.log("error");
		});
	}




	LoginRegModal.saveCustomer = function(){
		$scope.confirm_password="";
		$('.modal').modal('hide');
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
		LoginRegModal.UserDetails = "";
		localStorage.setItem("UserDetails", "");
    cleardata();
	}
});



app.factory("addCustsFact",function($http){
	var fun = {};
	fun.insertcustsfun = function (customers) {
		return $http.post('/FlyDreamWorks/services/insertCustomer',customers);
	}
	return fun;
});
