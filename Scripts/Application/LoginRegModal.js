app.component("loginregModal",{
	templateUrl: "Views/LoginRegModal.html",
	controllerAs: "LoginRegModal",
	controller: "LoginRegModalCtrl"

});



app.controller('LoginRegModalCtrl',function($scope, getcustcredentials){

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
