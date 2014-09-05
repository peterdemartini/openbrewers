'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/**
 * Validations
 */

/**
 * User Schema
 */

var RecipeSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: [{
    type: Date,
    default: Date.now
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Methods
 */
RecipeSchema.methods = {

};

mongoose.model('Recipe', RecipeSchema);
