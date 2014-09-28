'use strict';

/**
 * Module dependencies.
 */
require('./stage');

var mongoose = require('mongoose'),
  Stage = mongoose.model('Stage'),
  Schema = mongoose.Schema;

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
  type : {
    type : Schema.ObjectId,
    ref : 'BeerType'
  },
  abv : {
    type: Number
  },
  originalGravity : {
    type : Number
  },
  finalGravity : {
    type : Number
  },
  stages : [ Stage ],
  instructions : {
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
