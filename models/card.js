// This is the card model for the server side app
// side1 - the (for now) text on side 1 of this card
// side2 - the (for now) text on side 2 of this card
// deck - reference to the deck this card belongs to

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	side1: {type: String, required: true},
	side2: {type: String, required: true},
	deck: {type: Schema.Types.ObectId, ref: 'Deck'}
});

module.exports = mongoose.model('Card', schema);