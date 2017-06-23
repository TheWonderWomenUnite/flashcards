// This is the user-deck model for the server side app
// lastPlayed - last time the user played this deck
// progressBar - The progress bar for this deck for this user, how well they know the info
// deck - reference to the deck
// user - reference to the user that owns this deck

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	lastPlayed: {type: date, required: true},
	progressBar: {type: String, required: true},
	deck: {type: Schema.Types.ObjectId, ref: 'Deck'},
	user: {type: Schema.Types.ObectId, ref: 'User'}
});

module.exports = mongoose.model('User-Deck', schema);