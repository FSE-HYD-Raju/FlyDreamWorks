

app.controller('eventsPageCtrl',function($scope,geteventsfact, $location, StorageUtil){
	geteventsfact.eventslistfun().success(function s1(res) {
		$scope.Events = res;
		console.log(JSON.stringify(res));
	}).error(function e1(res) {
	});
	$scope.eventSelected = function(event){
		StorageUtil.setItem("SelectedEvent", JSON.stringify(event));
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


app.controller('eventDetailsPageCtrl',function($scope, $location, StorageUtil){
	$scope.Event = JSON.parse(StorageUtil.getItem("SelectedEvent"));
	console.log($scope.Event);

	$scope.makeABooking = function(){
		$scope.userDetails = StorageUtil.getItem("UserDetails");
		console.log($scope.userDetails);
		// if($scope.userDetails != "0"){
		// 	$scope.Route('bookOnline');
		// } else {
		// 	$('#loginModal').modal('show');
		// }
		$scope.Route('bookOnline');
	}

});


app.factory("addOrdersFact",function($http)
{
	var fun = {};
	fun.insertordersfun = function (order) {
		return $http.post('services/insertOrders',order);
	}
	return fun;
});


app.controller("addOrdersCtrl",function($scope,addOrdersFact, StorageUtil, addCustsFact, getcustcredentials, $rootScope)
{
	console.log(JSON.parse(StorageUtil.getItem("SelectedEvent")).event_id);
	console.log("user "+JSON.parse(StorageUtil.getItem("UserDetails")).cust_id);
  $scope.UserDetails = JSON.parse(StorageUtil.getItem("UserDetails"));

	$rootScope.$on('UserLoginChanged', function(event, UserDetails){
  $scope.UserDetails = UserDetails;
});
	$scope.order = {};
	$scope.order.event_date = new Date().toISOString().substring(0, 10);
	$scope.order.event_time = new Date().toTimeString().split(' ')[0];

	//  date code
	$('#datetimepicker12').datetimepicker({
		inline: true,
		sideBySide: true,
		minDate: moment()
		// minDate:new date()
	});
	$("#datetimepicker12").on("dp.change", function (e) {

		var d = new Date(e.date._d);
		console.log(d.toISOString().substring(0, 10));
		$scope.$apply(function(){
			$scope.order.event_date = d.toISOString().substring(0, 10) ;
			console.log(d.toTimeString().split(' ')[0]);
			$scope.order.event_time = d.toTimeString().split(' ')[0] ;
		})

	});


	$scope.customer = {};

	var checkLogin = function(data){
		getcustcredentials.custlogindets(data).then(function s1(res) {
			console.log(JSON.stringify(res.data));
			if(res.data != "") {
				$scope.order.cust_id = res.data[0].cust_id;

        console.log("cn "+$scope.order.cust_id);
			} else {
				// $scope.LoginFailed = true;
				$scope.order.cust_id = null;
			}

		}, function e1(res) {
			console.log("error");
		});
	}


	$scope.saveOrders = function(){
		if (StorageUtil.getItem("UserDetails") == "0"){

			$scope.customer.cust_name ;
			$scope.customer.email_id  ;
			$scope.customer.password = "" ;
      $scope.customer.phoneNumber;
			addCustsFact.insertcustsfun($scope.customer).then(function s1(res) {
				console.log(JSON.stringify(res));
        checkLogin($scope.customer);
			}, function e1(res) {
				console.log("error");
			});


		} else {
			$scope.order.cust_id = JSON.parse(StorageUtil.getItem("UserDetails")).cust_id;
		}

		$scope.order.event_id = JSON.parse(StorageUtil.getItem("SelectedEvent")).event_id;
		console.log(JSON.stringify($scope.order));
		insertOrder($scope.order);
	}

	var insertOrder = function(order){
		addOrdersFact.insertordersfun(order).then(function(res) {
			$scope.Details = res;
			console.log("order placed" +JSON.stringify(res));
			$scope.Route('SuccessPage');
		},function(res) {
			console.log("Error in inserting order");
		});
	}

  $scope.successs = function(){
		$scope.Route('SuccessPage');
		
	}

	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.clear = function() {
		$scope.dt = null;
	};

	$scope.options = {
		customClass: getDayClass,
		minDate: new Date(),
		showWeeks: true
	};

	// Disable weekend selection
	function disabled(data) {
		var date = data.date,
		mode = data.mode;
		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	}

	$scope.toggleMin = function() {
		$scope.options.minDate = $scope.options.minDate ? null : new Date();
	};

	$scope.toggleMin();

	$scope.setDate = function(year, month, day) {
		$scope.dt = new Date(year, month, day);
	};

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date(tomorrow);
	afterTomorrow.setDate(tomorrow.getDate() + 1);
	$scope.events = [
		{
			date: tomorrow,
			status: 'full'
		},
		{
			date: afterTomorrow,
			status: 'partially'
		}
	];

	function getDayClass(data) {
		var date = data.date,
		mode = data.mode;
		if (mode === 'day') {
			var dayToCheck = new Date(date).setHours(0,0,0,0);

			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}

		return '';
	}

});
