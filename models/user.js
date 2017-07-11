// This is the user model for the server side app to deal with the message table
// firstName - the User's first name
// lastName - the User's last name
// password - the User's password
// email - the user's password, must be unique and enforced
// user-deck - Reference to all of the decks for this user

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Deck = require('./deck');
var UserDeck = require('./userdeck');


// We need this to validate the uniqueness of the email field,
// we did npm install on it to include it in the app
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	decks: [{type: Schema.Types.ObjectId, ref: 'Deck'}],
	userdecks: [{type: Schema.Types.ObjectId, ref: 'UserDeck'}]
});

// This is how we use the validator
schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);