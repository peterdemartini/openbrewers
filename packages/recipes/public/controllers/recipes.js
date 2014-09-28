'use strict';

angular.module('mean.recipes')
  .controller('RecipesController', ['$scope', '$stateParams', '$location', 'Global', 'Recipes',
  function($scope, $stateParams, $location, Global, Recipes) {
    $scope.global = Global;

    $scope.hasAuthorization = function(recipe) {
      if (!recipe || !recipe.user) return false;
      return $scope.global.isAdmin || recipe.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var recipe = new Recipes({
          title: this.title,
          description: this.description,
          type: this.type,
          abv: this.abv,
          originalGravity: this.originalGravity,
          finalGravity: this.finalGravity,
          stages: this.stages || [],
          instructions: this.instructions
        });
        recipe.$save(function(response) {
          $location.path('recipes/' + response._id);
        });

        this.title = '';
        this.description = '';
        this.type = '';
        this.abv = 0;
        this.originalGravity = 0;
        this.finalGravity = 0;
        this.stages = [];
        this.instructions = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(recipe) {
      if (recipe) {
        recipe.$remove();

        for (var i in $scope.recipes) {
          if ($scope.recipes[i] === recipe) {
            $scope.recipes.splice(i, 1);
          }
        }
      } else {
        $scope.recipe.$remove(function(response) {
          $location.path('recipes');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var recipe = $scope.recipe;
        if (!recipe.updated) {
          recipe.updated = [];
        }
        recipe.updated.push(new Date().getTime());

        recipe.$update(function() {
          $location.path('recipes/' + recipe._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Recipes.query(function(recipes) {
        $scope.recipes = recipes;
      });
    };

    $scope.findOne = function() {
      Recipes.get({
        recipeId: $stateParams.recipeId
      }, function(recipe) {
        $scope.recipe = recipe;
      });
    };
}]);