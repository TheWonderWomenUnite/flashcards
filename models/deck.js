// This is the deck model for the server side app
// name - name of this deck
// userOwned - Whether this is a deck in the common area or is owned by a user
// category - The category that this card belongs to, say "Mathematics" or 
// some string that the user made up
// user - reference to the user that owns this deck
// cards - the reference to the cards in this deck

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');
var Card = require('./card');

var schema = new Schema({
	name: {type: String, required: true},
	userOwned: {type: Boolean, required: true},
	category: {type: String, required: true},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
	});

module.exports = mongoose.model('Deck', schema);