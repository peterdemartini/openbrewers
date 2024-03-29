'use strict';

(function() {
  // Recipes Controller Spec
  describe('Open Brewers controllers', function() {
    describe('RecipesController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.recipes');
      });

      // Initialize the controller and a mock scope
      var RecipesController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        RecipesController = $controller('RecipesController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one recipe object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('recipes').respond([{
            title: 'Brew Recipes',
            description: 'Homebrew rules!',
            abv: 0.07,
            originalGravity: 1070,
            finalGravity: 1015,
            stages : [],
            instructions : 'Do it right'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.recipes).toEqualData([{
            title: 'Brew Recipes',
            description: 'Homebrew rules!',
            abv: 0.07,
            originalGravity: 1070,
            finalGravity: 1015,
            stages : [],
            instructions : 'Do it right'
          }]);

        });

      it('$scope.findOne() should create an array with one recipe object fetched ' +
        'from XHR using a recipeId URL parameter', function() {
          // fixture URL parament
          $stateParams.recipeId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testRecipesData = function() {
            return {
              title: 'Brew Recipes',
              description: 'Homebrew rules!',
              abv: 0.07,
              originalGravity: 1070,
              finalGravity: 1015,
              stages : [],
              instructions : 'Do it right'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/recipes\/([0-9a-fA-F]{24})$/).respond(testRecipesData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.recipe).toEqualData(testRecipesData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postRecipesData = function() {
            return {
              title: 'Brew Recipes',
              description: 'Homebrew rules!',
              abv: 0.07,
              originalGravity: 1070,
              finalGravity: 1015,
              stages : [],
              instructions : 'Do it right'
            };
          };

          // fixture expected response data
          var responseRecipesData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'Brew Recipes',
              description: 'Homebrew rules!',
              abv: 0.07,
              originalGravity: 1070,
              finalGravity: 1015,
              stages : [],
              instructions : 'Do it right'
            };
          };

          // fixture mock form input values
          scope.title = 'Brew Recipes';
          scope.description = 'Homebrew rules!';
          scope.abv = 0.07;
          scope.originalGravity = 1070;
          scope.finalGravity = 1015;
          scope.stages = [];
          scope.instructions = 'Do it right';

          // test post request is sent
          $httpBackend.expectPOST('recipes', postRecipesData()).respond(responseRecipesData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.description).toEqual('');
          expect(scope.abv).toEqual(0);
          expect(scope.originalGravity).toEqual(0);
          expect(scope.finalGravity).toEqual(0);
          expect(scope.stages).toEqual([]);
          expect(scope.instructions).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/recipes/' + responseRecipesData()._id);
        });

      it('$scope.update(true) should update a valid recipe', inject(function(Recipes) {

        var putRecipesData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'Brew Recipes',
            descirption: 'Homebrew rules!',
            abv: 0.07,
            originalGravity: 1070,
            finalGravity: 1015,
            stages : [],
            instructions : 'Do it right'
          };
        };

        // mock recipe object from form
        var recipe = new Recipes(putRecipesData());

        // mock recipe in scope
        scope.recipe = recipe;

        // test PUT happens correctly
        $httpBackend.expectPUT(/recipes\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/recipes\/([0-9a-fA-F]{24})$/, putRecipesData()).respond();

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/recipes/' + putRecipesData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid recipeId ' +
        'and remove the recipe from the scope', inject(function(Recipes) {

          // fixture rideshare
          var recipe = new Recipes({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.recipes = [];
          scope.recipes.push(recipe);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/recipes\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(recipe);
          $httpBackend.flush();

          // test after successful delete URL location recipes list
          //expect($location.path()).toBe('/recipes');
          expect(scope.recipes.length).toBe(0);

        }));
    });
  });
})();