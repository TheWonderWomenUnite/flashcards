var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var User = require('../models/user');
var Deck = require('../models/deck');

// A general get function to return all decks
router.get('/', function (req, res, next) {
    
    Deck.find()
        .exec(function (err, decks) {
            if (err) {
                return res.status(500).json({
                    title: 'Error finding decks',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: decks
            });
        });
});

// for a given user Id, find all of this user's decks
router.get('/userDecks/:userId', function (req, res, next) {

    var userId = req.params.userId;
    Deck.find({user: userId}, function (err, decks) {
        if (err) {
            return res.status(500).json({
                title: 'Error finding decks',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: decks
        });
    });
});

// Find all decks with userOwned: false
router.get('/unownedDecks/', function (req, res, next) {

    Deck.find({userOwned: false}, function (err, decks) {
        if (err) {
            return res.status(500).json({
                title: 'Error finding decks',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: decks
        });
    });
});

// If you want to get passed this, you must be logged in
/*
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
*/ 

// Save a new deck for the currently logged in user
router.post('/', function (req, res, next) {

    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'Error finding user',
                error: err
                });
            }
    
        // Create the new deck, add the user id to the deck
        var deck = new Deck({
            name: req.body.name,
            userOwned: req.body.userOwned,
            category: req.body.category,
            lastPlayed: null,
            progressBar: 0,
            favorite: false,
            user: user._id
        });

        deck.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error saving deck',
                    error: err
                });
            }

        user.decks.push(result);
        user.save();
        res.status(201).json({
            message: 'Success',
            obj: result
            });
        });
    }); 
});

// Clone a deck 
router.post('/clone/:id', function(req, res, next) {

    // First get the user
    var decoded = jwt.decode(req.query.token);
    
    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({ 
                title: 'Error finding user', 
                error: err });
        }

        // Now get the deck
        Deck.findById(req.params.id, function(err, deck) {     
            if (err) {
                return res.status(500).json({ 
                    title: 'Error finding deck', 
                    error: err });
            }
            
            // The deck to be cloned was found and now we can copy it
            var newDeck = new Deck({
                name: deck.name,
                userOwned: true, 
                category: deck.category,
                lastPlayed: null,
                progressBar: 0,
                favorite: false,
                user: user._id 
            });
            newDeck.save(function(err, deck) {
                if (err) {
                    return res.status(500).json({ 
                        title: 'Error saving deck', 
                        error: err 
                    });
                }    

                // Update the user 
                user.decks.push(deck);
                user.save();
            
                // Now copy the cards
                for (let card of deck.cards) {
                    var newCard = new Card({
                        side1: card.side1,
                        side2: card.side2,
                        deck: deck._id
                    });
                    newDeck.cards.push(newCard);
                    newDeck.save();
                }

                res.status(201).json({
                    message: 'Success',
                    obj: result
                });
            }); // end of newDeck.save
        }); // end of Deck.findById
    }); // end of User.findById
}); // end of router.Post

// Use this route to update deck details like name, category, userOwned, 
// lastPlayed, progressBar, and favorite.
// This does not affect the cards for this deck
router.patch('/:id', function(req, res, next) {

    var decoded = jwt.decode(req.query.token);
    Deck.findById(req.params.id, function(err, deck) {
        if (err) {
            return res.status(500).json({
                title: 'Error finding deck',
                error: err
            }); 
        }
        if (!deck) {
            return res.status(500).json({
                title: 'No Deck Found',
                error: {message: 'Deck not found'}
            }); 
        }
        /*
        if (deck.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        */

        deck.name = req.body.name;
        deck.userOwned = req.body.userOwned;
        deck.category = req.body.category;
        deck.lastPlayed = req.body.lastPlayed;
        deck.progressBar = req.body.progressBar;
        deck.favorite = req.body.favorite;
        deck.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error saving deck',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Success',
                obj: result
            });
        });
    });
});

// Use this route to delete a deck
router.delete('/:id', function(req, res, next) {

    var decoded = jwt.decode(req.query.token);
    Deck.findById(req.params.id, function(err, deck) {
        if (err) {
            return res.status(500).json({
                title: 'Error finding deck',
                error: err
            }); 
        }
        if (!deck) {
            // The deck couldn't be found, return with an error
            return res.status(500).json({
                title: 'No deck Found',
                error: {message: 'Deck not found'}
            }); 
        }    

        /*
        // If this is an unowned deck then you don't need to do this
        if (deck.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        */

        deck.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error removing deck',
                    error: err
                });

            }
           if (deck.userOwned) {
                User.findById(deck.user, function(err, user) {
                    user.decks.pull(deck);
                    user.save();
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: result
                });
        });
     });   
        
});

module.exports = router;