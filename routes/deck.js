var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var User = require('../models/user');
var Deck = require('../models/deck');

// for a given user, find all of this users decks

router.get('/userDecks/:userId', function (req, res, next) {
    // id is the user id
    var userId = req.params.userId;
    Deck.find('user': userId)
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

router.get('/unownedDecks/', function (req, res, next) {
    // id is the user id
    
    Deck.find('userOwned': false)
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

module.exports = router;
// a comment