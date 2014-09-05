'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Recipe = mongoose.model('Recipe'),
  _ = require('lodash');


/**
 * Find recipe by id
 */
exports.recipe = function(req, res, next, id) {
  Recipe.load(id, function(err, recipe) {
    if (err) return next(err);
    if (!recipe) return next(new Error('Failed to load recipe ' + id));
    req.recipe = recipe;
    next();
  });
};

/**
 * Create an recipe
 */
exports.create = function(req, res) {
  var recipe = new Recipe(req.body);
  recipe.user = req.user;

  recipe.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the recipe'
      });
    }
    res.json(recipe);

  });
};

/**
 * Update an recipe
 */
exports.update = function(req, res) {
  var recipe = req.recipe;

  recipe = _.extend(recipe, req.body);

  recipe.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the recipe'
      });
    }
    res.json(recipe);

  });
};

/**
 * Delete an recipe
 */
exports.destroy = function(req, res) {
  var recipe = req.recipe;

  recipe.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the recipe'
      });
    }
    res.json(recipe);

  });
};

/**
 * Show an recipe
 */
exports.show = function(req, res) {
  res.json(req.recipe);
};

/**
 * List of Recipes
 */
exports.all = function(req, res) {
  Recipe.find().sort('-created').populate('user', 'title').exec(function(err, recipes) {

    if (err) {
      return res.json(500, {
        error: 'Cannot list the recipes'
      });
    }
    res.json(recipes);

  });
};