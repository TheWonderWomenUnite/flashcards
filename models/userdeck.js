// This is the user-deck model for the server side app
// lastPlayed - last time the user played this deck
// progressBar - The progress bar for this deck for this user, how well they know the info
// deck - reference to the deck
// user - reference to the user that owns this deck

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Deck = require('./deck');
var User = require('./user');

var schema = new Schema({
	lastPlayed: {type: Date, required: true},
	progressBar: {type: String, required: true},
	deck: {type: Schema.Types.ObjectId, ref: 'Deck'},
	user: {type: Schema.Types.ObjectId, ref: 'User'}
});

// When you remove a userdeck doc, remove the reference to it 
// in the user parent doc

schema.post('remove', function(userdeck) {

	User.findById(userdeck.user, function(err, user) {
		user.userdecks.pull(userdeck);
		user.save();
	});

});

module.exports = mongoose.model('UserDeck', schema);