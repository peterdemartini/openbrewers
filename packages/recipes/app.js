'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Recipes = new Module('recipes');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Recipes.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Recipes.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Recipes.menus.add({
    title: 'Recipes',
    link: 'recipes',
    roles: [],
    menu: 'main'
  });

  Recipes.menus.add({
    title: 'Create Recipes',
    link: 'recipes/create',
    roles: ['authenticated'],
    menu: 'main'
  });

  return Recipes;
});
