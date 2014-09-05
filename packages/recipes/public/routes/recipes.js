'use strict';

//Setting up route
angular.module('mean.recipes').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all recipes', {
        url: '/recipes',
        templateUrl: 'recipes/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create recipe', {
        url: '/recipes/create',
        templateUrl: 'recipes/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit recipe', {
        url: '/recipes/:recipeId/edit',
        templateUrl: 'recipes/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('recipe by id', {
        url: '/recipes/:recipeId',
        templateUrl: 'recipes/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);