
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

var SearchCodesSchema = new mongoose.Schema({
  _id: String,
  tconst:String,
  primaryTitle:String,
  originalTitle:String,
  isAdult:Number,
  startYear:String,
  endYear:String,
  runtimeMinutes:String,
  genres:String,
}, schemaOptions);

var collectionName = 'test';
var serchCodes = mongoose.model('searchCodes', SearchCodesSchema,collectionName);
module.exports = serchCodes;
