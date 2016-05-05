'use strict';

var socket = io();

angular.module('app', []);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});

angular.module('app').controller('index', ['$scope', '$http', function($scope, $http){

  $scope.sensors = {};

  function refresh(){
  	if (!$scope.$$phase) {
		  $scope.$apply();
		}
  }

  $scope.getAll = function(){
    $http.get('/sensor').success(function(data){
      if(!data.error){
      	data.data.forEach(function(sensor){
      		socket.emit('rawdata', sensor.name);
      		$scope.sensors[sensor.name] = {};
      		$scope.sensors[sensor.name].description = sensor.description;
      		$scope.sensors[sensor.name].datavalue = '0';
      		$scope.sensors[sensor.name].unit = sensor.unit;;
      	});
      }
    });
  };

  $scope.getAll();

  socket.on('news', function(data){
  	if(angular.isObject($scope.sensors[data.name])){
  		$scope.sensors[data.name].datavalue = data.datavalue;
  		refresh();
  	}
  });

}])