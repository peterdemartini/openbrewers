'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Ingredient = mongoose.model('Ingredient'),
  Schema = mongoose.Schema;

/**
 * Stage Schema
 */

var StageSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  ingredients : [Ingredient],
  notes : {
    type : String
  }
});

/**
 * Methods
 */
StageSchema.methods = {

};

mongoose.model('Stage', StageSchema);
