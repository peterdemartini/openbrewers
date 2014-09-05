'use strict';

var recipes = require('../controllers/recipes');

var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.recipe.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

// The Package is past automatically as first parameter
module.exports = function(Recipes, app, auth, database) {
  app.route('/recipes')
    .get(recipes.all)
    .post(auth.requiresLogin, recipes.create);
  app.route('/recipes/:recipeId')
    .get(recipes.show)
    .put(auth.requiresLogin, hasAuthorization, recipes.update)
    .delete(auth.requiresLogin, hasAuthorization, recipes.destroy);

  // Finish with setting up the recipeId param
  app.param('recipeId', recipes.recipe);
};