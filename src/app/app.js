angular.module('myApp',["ng.deviceDetector"])
.controller('myCtrl',['deviceDetector',function(deviceDetector){
	var vm = this;
	vm.data = deviceDetector;
	vm.allData = JSON.stringify(vm.data, null, 2);
}])