'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Recipe = mongoose.model('Recipe');

/**
 * Globals
 */
var user;
var recipe;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Recipe:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        recipe = new Recipe({
          title: 'Recipe Title',
          content: 'Recipe Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return recipe.save(function(err) {
          should.not.exist(err);
          recipe.title.should.equal('Recipe Title');
          recipe.description.should.equal('Recipe Description');
          recipe.user.should.not.have.length(0);
          recipe.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        recipe.title = '';

        return recipe.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        recipe.content = '';

        return recipe.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        recipe.user = {};

        return recipe.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      recipe.remove();
      user.remove();
      done();
    });
  });
});