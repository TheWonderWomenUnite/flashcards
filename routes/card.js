var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var Card = require('../models/card');

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

module.exports = router;
// a comment