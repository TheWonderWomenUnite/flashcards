var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Card = require('../models/card');
var Deck = require('../models/deck');

// for a given deck, find all of this decks cards
router.get(':deckId', function (req, res, next) {
    // id is the user id
    var deckId = req.params.deckId;
    Card.find('deck': deckId)
        .exec(function (err, cards) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: cards
            });
        });
});

// This is how you save a new card
router.post(':deckId', function (req, res, next) {
    Deck.findById(req.params.deckId, function(err, deck) {
        if (err) {

            // If there is an error, return from this function immediately with
            // the error code
            return res.status(500).json({
                title: 'An error occurred',
                error: err
                });
            }
    
        // Create the new deck, add the user info to the deck
        var card = new Card({
            side1: req.body.side1,
            side2: req.body.side2,
            deck: deck._id
        });

        card.save(function(err, result) {
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
            deck.cards.push(result);
            deck.save();
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

    Card.findById(req.params.id, function(err, card) {
        if (err) {
        // If there is an error trying to get the message from the server, 
        // return from this function immediately with the error code
        console.log("Returned error from findById");
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            }); 
        }
        if (!card) {
            // The message couldn't be found, return with an error
            console.log("No card found by findById");
            return res.status(500).json({
                title: 'No Card Found',
                error: {message: 'Card not found'}
            }); 
        }

        console.log("Found a valid card");
        card.side1 = req.body.side1;
        card.side2 = req.body.side2;
        card.save(function(err, result) {
            if (err) {
                // If there is an error, return from this function immediately with
                // the error code
                console.log("Got an error from the save");
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            res.status(200).json({
                message: 'Updated Card',
                obj: result
            });
        });
    });
});

// Use this route to delete decks, this deletes all cards in this
// deck 
router.delete('/:id', function(req, res, next) {

    Card.findById(req.params.id, function(err, card) {
    if (err) {
        // If there is an error trying to get the message from the server, 
        // return from this function immediately with the error code
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        }); 
    }
    if (!card) {
        // The message couldn't be found, return with an error
        return res.status(500).json({
            title: 'No deck Found',
            error: {message: 'Card not found'}
        }); 
    }
    
    card.remove(function(err, result) {
        if (err) {
            // If there is an error, return from this function immediately with
            // the error code
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });

        }

        // Use result.deckId to remove the reference to this card in the deck
         res.status(200).json({
            message: 'Deleted Deck',
            obj: result
            });
        });
    });
});

module.exports = router;
// a comment