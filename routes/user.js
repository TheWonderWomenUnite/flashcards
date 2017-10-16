// Routes for authentication

var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

// A general get function to return all users
router.get('/', function (req, res, next) {
    
    User.find()
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    title: 'Error finding users',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: users
            });
        });
});

// Use this route to get the user object for this userId
router.get('/:userId', function (req, res, next) {

    var userId = req.params.userId;
    User.findById(userId, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        res.status(200).json({
            message: 'Success',
            obj: user
        });
    });
});    

router.post('/', function (req, res, next) {
    var user = new User({
    	firstName: req.body.firstName,
    	lastName: req.body.lastName,
    	password: bcrypt.hashSync(req.body.password, 10),
    	email: req.body.email
    });

    user.save(function(err, result) {
    	if (err) {

    		// If there is an error, return from this function immediately with
    		// the error code
    		return res.status(500).json({
    			title: 'An error occurred',
    			error: err
    		});
    	}
    	res.status(201).json({
    		message: 'Saved User',
    		obj: result
    	});
    });
});

router.post('/signin', function (req, res, next) {
	User.findOne({email: req.body.email}, function(err, user) {
    	if (err) {

    		// If there is an error, return from this function immediately with
    		// the error code
    		return res.status(500).json({
    			title: 'An error occurred',
    			error: err
    		});
    	}
    	if (!user) {
    		return res.status(401).json({
    			title: 'Login Failed',
    			error: {message: 'Invalid login credentials'}
    		});
    	}
    	if (!bcrypt.compareSync(req.body.password, user.password)) {
    		return res.status(401).json({
    			title: 'Login Failed',
    			error: {message: 'Invalid login credentials'}
    		}); 
    	}
    	var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
   		res.status(200).json({
    			message: 'Successful Login',
				token: token,
    			user: user
    		}); 
    });
});

module.exports = router;
// a comment