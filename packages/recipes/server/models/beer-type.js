'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Stage Schema
 */

var BeerTypeSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  description : {
    type : String
  }
});

/**
 * Methods
 */
BeerTypeSchema.methods = {

};

mongoose.model('BeerType', BeerTypeSchema);
