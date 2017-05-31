(function() {
  'use strict';

  angular
    .module('robbi')
    .run(runBlock)



  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');

  }


})();
