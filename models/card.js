// This is the card model for the server side app
// side1 - the (for now) text on side 1 of this card
// side2 - the (for now) text on side 2 of this card
// deck - reference to the deck this card belongs to

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Deck = require('./deck');

var schema = new Schema({
	side1: {type: String, required: true},
	side2: {type: String, required: true},
	deck: {type: Schema.Types.ObjectId, ref: 'Deck'}
});

// When you remove a card, remove the reference to the card
// from the deck it belongs to
schema.post('remove', function(card) {
	//Deck.findOne({ _id: card.deck}, function(err, deck) {
	//	deck.cards.pull(card);
	//	deck.save();
	//});
});

module.exports = mongoose.model('Card', schema);