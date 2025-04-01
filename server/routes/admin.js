const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        req.session.admin = true;
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Get profile data (admin)
router.get('/profile', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne();
        res.json(profile || {});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update profile
router.post('/profile', auth, async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate({}, req.body, { 
            new: true,
            upsert: true 
        });
        res.json({ success: true, profile });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
