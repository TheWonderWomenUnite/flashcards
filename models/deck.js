// This is the deck model for the server side app
// name - name of this deck
// userOwned - Whether this is a deck in the common area or is owned by a user
// category - The category that this card belongs to, say "Mathematics" or 
// some string that the user made up
// lastPlayed - Last time the user played this deck
// progressBar - Value from 0-100, percent that user "knows" the data
// favorite - true or false, whether the user considers this her favorite
// user - reference to the user that owns this deck
// cards - the reference to the cards in this deck
// createdAt - Added to the schema for sorting

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');
var Card = require('./card');

var schema = new Schema({
	name: {type: String, required: true},
	userOwned: {type: Boolean, required: true},
	category: {type: String, required: true},
	lastPlayed: {type: Date},
	progressBar: {type: Number, min: 0, max: 100},
	favorite: {type: Boolean},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	cards: [{type: Schema.Types.ObjectId, ref: 'Card'}]
	}, { timestamps: { createdAt: 'createdAt' }});

// When you remove a deck, you have to remove the ref from the user 
// document and remove the dependant subdocs
schema.post('remove', function(deck) {

	// Only look for the user if this is not an orphan deck
//	if (deck.userOwned) {
//		User.findById(deck.user, function(err, user) {
//			user.decks.pull(deck);
//			user.save();
//		});
//	}

	// Remove the dependant subdocs
	Card.remove({ deck: deck._id }).exec();

});



module.exports = mongoose.model('Deck', schema);