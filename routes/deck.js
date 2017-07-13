var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var User = require('../models/user');
var Deck = require('../models/deck');
/*
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
*/
// for a given user, find all of this users decks

router.get('/userDecks/:userId', function (req, res, next) {
    // id is the user id
    var userId = req.params.userId;

    var textObj = "{ " + 
                  '"user": ObjectId("' +
                  userId +
                  '")' +
                  " }";

    // User.findOne({email: req.body.email}, function(err, user) {
                 
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
    /*
    Deck.find(textObj)
        .exec(function (err, decks) {
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
        */
});

// for a given user, find all of this users decks
/*
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
*/
module.exports = router;
// a comment