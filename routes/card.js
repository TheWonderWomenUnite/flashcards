var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Card = require('../models/card');
var Deck = require('../models/deck');

// A general get function to return all cards
router.get('/', function (req, res, next) {

    Card.find()
        .exec(function (err, cards) {
            if (err) {
                return res.status(500).json({
                    title: 'Error finding cards',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: cards
            });
        });
});

// for a given deckId, find all of this deck's cards
router.get('/:deckId', function (req, res, next) {
    var deckId = req.params.deckId;
    console.log("card route: Going to call find with deckId "+deckId);
    Card.find({deck: deckId}, function (err, cards) {
        if (err) {
            return res.status(500).json({
                title: 'Error finding cards for this deck',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: cards
        });
    });
    
});

// For a given deckId, add a new card
router.post('/:deckId', function (req, res, next) {
    Deck.findById(req.params.deckId, function(err, deck) {
        if (err) {

            // If there is an error finding the deck record, return from this 
            // function with error code
            return res.status(500).json({
                title: 'Error finding deck record',
                error: err
                });
            }
    
        // Create the new card object
        var card = new Card({
            side1: req.body.side1,
            side2: req.body.side2,
            deck: deck._id
        });

        card.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error saving card',
                    error: err
                });
            }

            // Card successfully saved, add the reference to this card 
            // to the deck array
            deck.cards.push(result);
            deck.save();
            res.status(201).json({
                message: 'Success',
                obj: result
            });
        });
    }); 
});

// Use this route to update a card 
router.patch('/:id', function(req, res, next) {

    Card.findById(req.params.id, function(err, card) {
        if (err) {
            return res.status(500).json({
                title: 'Error finding card',
                error: err
            }); 
        }
        if (!card) {
            // The card couldn't be found, return with an error
            return res.status(500).json({
                title: 'No Card Found',
                error: {message: 'Card not found'}
            }); 
        }

        card.side1 = req.body.side1;
        card.side2 = req.body.side2;
        card.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Error saving card',
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

// Use this route to delete a card, ID is the id of the card
router.delete('/:id', function(req, res, next) {

    Card.findById(req.params.id, function(err, card) {
    if (err) {
        return res.status(500).json({
            title: 'Error finding card',
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
                title: 'Error removing card',
                error: err
            });

        }

        // Remove the reference for this card from its deck
        // Moved from the post middleware
        Deck.findOne({ _id: card.deck}, function(err, deck) {
            if (err) {
                return res.status(500).json({
                title: 'Error removing card',
                error: err
            });

            }
            deck.cards.pull(card);
            deck.save();
        });
        // Use result.deckId to remove the reference to this card in the deck
         res.status(200).json({
            message: 'Success',
            obj: result
            });
        });
    });
});

module.exports = router;
// a comment