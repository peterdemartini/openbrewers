'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Stage Schema
 */

var IngredientSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  type : {
  	type : String,
  	required : true
  },
  quantity : {
  	type : Number,
  	default : 1
  }
});

/**
 * Methods
 */
IngredientSchema.methods = {

};

mongoose.model('Ingredient', IngredientSchema);
