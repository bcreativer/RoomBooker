angular.module('starter.controller', ['ngCordova','ngCordovaOauth'])
.controller('CalendarController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.calendar = data.calendar;

    $scope.onItemDelete = function(dayIndex, item) {
      $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
    }

    $scope.doRefresh = function() {
      $http.get('js/data.json').success(function(data) {
        $scope.calendar = data.calendar;
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    $scope.toggleStar = function(booking) {
      booking.star = !booking.star;
    }

  });
}])

.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.bookings = data.bookings;

    $scope.onBookingDelete = function(booking) {
      $scope.bookings.splice($scope.bookings.indexOf(booking), 1);
    }

    $scope.doRefresh = function() {
      $http.get('js/data.json').success(function(data) {
        $scope.bookings = data.bookings;
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    $scope.toggleStar = function(booking) {
      booking.star = !booking.star;
    }

    $scope.moveItem = function(booking, fromIndex, toIndex) {
      $scope.bookings.splice(fromIndex, 1);
      $scope.bookings.splice(toIndex, 0, booking);
    }
  });
}])

.controller('LoginwithFacebook', function($scope, $cordovaOauth) {
  $scope.LoginwithFacebook = function() {
    console.log("clicked");
    $cordovaOauth.facebook("F1731780740410543", ["email"]).then(function(result) {
      alert("Auth Success..!!" + result);
    }, function(error) {
      alert("Auth Failed..!!" + error);
    });
  };
});
