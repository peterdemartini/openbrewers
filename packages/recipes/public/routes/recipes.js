'use strict';

angular.module('mean.recipes').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('recipes example page', {
      url: '/recipes/example',
      templateUrl: 'recipes/views/index.html'
    });
  }
]);
