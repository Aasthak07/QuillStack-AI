const express = require('express');
const Model = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Reusable middleware: collect validation errors and respond early
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
};

// Signup validation rules
const signupRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Login validation rules
const loginRules = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required'),
];

router.post('/add', signupRules, validate, (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            const { _id, name, email } = result;
            const payload = { _id, name, email };
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Error generating token' });
                } else {
                    res.status(200).json({ token });
                }
            });
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({ message: 'Email already exists' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
});


router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});


router.post('/authenticate', loginRules, validate, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Model.findOne({ email });

        if (user) {
            const isMatch = await user.comparePassword(password);
            if (isMatch) {
                const { _id, name, email: userEmail } = user;
                const payload = { _id, name, email: userEmail };

                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: 'Error generating token' });
                    }
                    res.status(200).json({ token });
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;