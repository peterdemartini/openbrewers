'use strict';

angular.module('mean.recipes').factory('Recipes', ['$resource',
  function($resource) {
    return $resource('recipes/:recipeId', {
      recipeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);