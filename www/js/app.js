// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.booking', {
      url: '/booking',
      views: {
        'booking-tab' : {
          templateUrl: 'templates/booking.html',
          controller: 'ListController'
        }
      }
    })
    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab' : {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html'
        }
      }
    })
    $urlRouterProvider.otherwise('/tab/home');
})

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
}]);
