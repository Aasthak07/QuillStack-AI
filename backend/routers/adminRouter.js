const express = require('express');
const Model = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

// Middleware to check if user is admin
const verifyAdmin = async (req, res, next) => {
    try {
        const user = await Model.findById(req.user._id);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }
        req.adminUser = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Admin login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await Model.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Check if password matches (assuming password is stored as plain text for now)
        // In production, you should hash passwords
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Check if user is admin
        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }
        
        // Generate JWT token
        const { _id, name, email: userEmail } = user;
        const payload = { _id, name, email: userEmail };
        
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error generating token' });
            } else {
                res.status(200).json({ 
                    success: true,
                    token,
                    user: {
                        _id,
                        name,
                        email: userEmail,
                        isAdmin: user.isAdmin
                    }
                });
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get admin dashboard stats
router.get('/stats', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const totalUsers = await Model.countDocuments();
        const adminUsers = await Model.countDocuments({ isAdmin: true });
        const regularUsers = totalUsers - adminUsers;
        
        res.status(200).json({
            totalUsers,
            adminUsers,
            regularUsers,
            statsDate: new Date()
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all users (admin only)
router.get('/users', verifyToken, verifyAdmin, (req, res) => {
    Model.find({}, { password: 0 }) // Exclude password field
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// Get user by ID (admin only)
router.get('/users/:id', verifyToken, verifyAdmin, (req, res) => {
    Model.findById(req.params.id, { password: 0 })
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// Update user (admin only)
router.put('/users/:id', verifyToken, verifyAdmin, (req, res) => {
    const { name, email, isAdmin } = req.body;
    const updateData = {};
    
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (isAdmin !== undefined) updateData.isAdmin = isAdmin;
    
    Model.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true })
        .select('-password')
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.status(400).json({ message: 'Email already exists' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
});

// Delete user (admin only)
router.delete('/users/:id', verifyToken, verifyAdmin, (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        });
});

// Check if current user is admin
router.get('/check', verifyToken, async (req, res) => {
    try {
        const user = await Model.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ 
            isAdmin: user.isAdmin,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; 