// 'use strict';

// angular.module('testBApp')
//   .controller('MainCtrl', ['$scope', '$http', '$location',function ($scope, $http, $location) {
//     $scope.awesomeThings = [];

//     $scope.addThing = function() {
//       if($scope.newThing === '') {
//         return;
//       }
//       $http.post('/api/things', { name: $scope.newThing });
//       $scope.newThing = '';
//     };

//     $scope.deleteThing = function(thing) {
//       $http.delete('/api/things/' + thing._id);
//     };

//     $scope.viewChoice = "start";

//   }]);



  (function() {
  'use strict';

  angular
    .module('robbi')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {

    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1463182999588;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }

})();