// This is the table of default categories
// These will be preloaded with standard categories
// On deck creation have user choose one of these or create a new one

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	category: {type: String, required: true},
	
});

module.exports = mongoose.model('Category', schema);