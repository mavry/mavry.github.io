'use strict';

/* App Module */

var mockedAndroidInterface = {};
angular.module('timeToGo.controllers', []);
angular.module('timeToGo.directives', []);
angular.module('timeToGo.controllers.mock', []);


var moreServices = ( (typeof androidInterface !== 'undefined') && false) ? ['timeToGo.services.Backend','timeToGo.services.GeoLocationForAddressService','timeToGo.services.AddressForGeoLocationService'] : ['timeToGo.services.mock.Backend', 'timeToGo.services.mock.GeoLocationForAddressService','timeToGo.services.AddressForGeoLocationService'];
var angularCoreServices = ['ngRoute'];
var Application = {};
var timeToGoApp = angular.module('timeToGo', 
  ['timeToGo.controllers', 'timeToGo.directives', 'timeToGo.controllers.mock',
  'timeToGo.services.HistoryService', 'timeToGo.services.localStorageService',
  ].concat(moreServices).concat(angularCoreServices) );

timeToGoApp.value('prefix', 'timeToGo');
timeToGoApp.constant('cookie', { expiry:30, path: '/'});
timeToGoApp.constant('notify', { setItem: true, removeItem: false} );

timeToGoApp.config(function($routeProvider ) {	
    $routeProvider.
      when('/home', {templateUrl: 'templates/home/home.html', controller: 'HomeCtrl'}).
      when('/config', {templateUrl: 'templates/config/config.html', controller: 'ConfigCtrl'}).
      when('/notify/:data',  {templateUrl: 'templates/notify/notify.html', controller: 'NotifyCtrl'}).
      when('/timeToGo',  {templateUrl: 'templates/go/go.html', controller: 'GoCtrl'}).
      otherwise({redirectTo: '/home'});
  }
).run(function ($rootScope, HistoryService, $location) {

  HistoryService.init();
  
$rootScope.safeApply = function(fn) {
  var phase = this.$root.$$phase;
  if(phase == '$apply' || phase == '$digest') {
    if(fn && (typeof(fn) === 'function')) {
      fn();
    }
  } else {
    this.$apply(fn);
  }
};




 // $rootScope.fromAndroiad = fromAndroiad;


    // onCreate: function() {
    //     console.log("in onCreate");
    //     $rootScope.waitingForLocation = false;
    // },
    // onStart: function() {},
    // onResume: function() {},
    // onPause: function() {},
    // updateUI: function(travelTime, routeName, updateTime) {},
    // onTimeToGo: function(travelTime, routeName, updateTime) {
    //   $rootScope.go = {
    //     travelTime: travelTime,
    //     routeName: routeName,
    //     arivalTime: moment().add(travelTime, "minutes").format("hh:mm")
    //   }
    //   $location.path("/timeToGo");
    // }, 
    // onDrivingTime: function() {},
    // onCurrentLocation: function(lat, long) {
    //   console.log("in onCurrentLocation");
    //   $rootScope.waitingForLocation = false;
    // },
  // };

  Application = {
    onCreate: function() {
        console.log("on onCreate");
    },
    onStart: function() {
      console.log("on Start");
    },
    onResume: function() {
      console.log("on onResume");
    },
    onPause: function() {
      console.log("on Pause");
    },
    updateUI: function(maxDrivingTime, routeName, lastUpdated) {
      console.log(sprintf("on updateUI with maxDrivingTime=%(maxDrivingTime)s routeName=%(routeName)s", 
        maxDrivingTime, routeName);
    },
    onTimeToGo: function(maxDrivingTime, routeName, lastUpdated) {
      console.log(sprintf("on onTimeToGo with maxDrivingTime=%(maxDrivingTime)s routeName=%(routeName)s", 
        maxDrivingTime, routeName);
    },
    onDrivingTime: function(maxDrivingTime) {
      console.log(sprintf("on onDrivingTime with maxDrivingTime = %(maxDrivingTime)s", maxDrivingTime);
    },
    onCurrentLocation: function(geoLocation) {

      console.log("onCurrentLocation "+geoLocation.lat+" / "+geoLocation.lng);
      $rootScope.safeApply(function(){ 
        $rootScope.currentLocation = geoLocation; 
      });
    }
  };
});




