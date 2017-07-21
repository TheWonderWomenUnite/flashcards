var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var User = require('../models/user');
var Deck = require('../models/deck');

// A general get function to return all decks
router.get('/', function (req, res, next) {
    // id is the user id
    
    Deck.find()
        .exec(function (err, decks) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: decks
            });
        });
});

// for a given user, find all of this users decks
router.get('/userDecks/:userId', function (req, res, next) {

    var userId = req.params.userId;
    console.log("Going to call find with string "+textObj);
    Deck.find({user: userId}, function (err, decks) {
            if (err) {
                console.log("Got an error from the find");
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log("Didnt get an error on the find");
            console.log(decks);
            res.status(200).json({
                message: 'Success',
                obj: decks
            });
        });
});

// If you want to get passed this, you must be logged in
router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next(); // This user is logged in, let the post request continue
    }); 
});

// Find all unowned decks
router.get('/unownedDecks/', function (req, res, next) {
    // id is the user id
    
    Deck.find({userOwned: false}, function (err, decks) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: decks
            });
        });
});

// This is how you save a new deck
router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err) {

            // If there is an error, return from this function immediately with
            // the error code
            return res.status(500).json({
                title: 'An error occurred',
                error: err
                });
            }
    
        // Create the new message, add the user info to the message before you save it
        var deck = new Deck({
            content: req.body.content,
            user: user
        });

        deck.save(function(err, result) {
            if (err) {

                // If there is an error, return from this function immediately with
                // the error code
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            // Message successfully saved, add this message to this user's message array
            // and save the user with the new message array
            user.decks.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved Deck',
                obj: result
            });
        });
    }); 
});


// Use this route to update deck details like name, category, or userOwned
// this does not affect the cards for this deck
router.patch('/:id', function(req, res, next) {

    // Get the token so we only allow the user that owns this message 
    // to modify it
    var decoded = jwt.decode(req.query.token);

    Deck.findById(req.params.id, function(err, deck) {
        if (err) {
        // If there is an error trying to get the message from the server, 
        // return from this function immediately with the error code
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            }); 
        }
        if (!deck) {
            // The message couldn't be found, return with an error
            return res.status(500).json({
                title: 'No Deck Found',
                error: {message: 'Deck not found'}
            }); 
        }
        if (deck.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}

            });
        }

        deck.name = req.body.name;
        deck.userOwned = req.body.userOwned;
        deck.category = req.body.category;
        deck.save(function(err, result) {
            if (err) {
                // If there is an error, return from this function immediately with
                // the error code
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Deck',
                obj: result
            });
        });
    });
});

// Use this route to delete decks, this deletes all cards in this
// deck 
router.delete('/:id', function(req, res, next) {
    // Get the token so we only allow the user that owns this message 
    // to delete it
    var decoded = jwt.decode(req.query.token);

    Deck.findById(req.params.id, function(err, deck) {
    if (err) {
        // If there is an error trying to get the message from the server, 
        // return from this function immediately with the error code
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        }); 
    }
    if (!deck) {
        // The message couldn't be found, return with an error
        return res.status(500).json({
            title: 'No deck Found',
            error: {message: 'Deck not found'}
        }); 
    }
    
    if (deck.user != decoded.user._id) {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: {message: 'Users do not match'}
        });
    }
    deck.remove(function(err, result) {
        if (err) {
            // If there is an error, return from this function immediately with
            // the error code
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        // Don't we need to remove the deck from the user? 
        res.status(200).json({
            message: 'Deleted Deck',
            obj: result
            });
        });
    });
});


module.exports = router;
// a comment