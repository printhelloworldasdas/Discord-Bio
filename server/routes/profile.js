const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            const newProfile = new Profile();
            await newProfile.save();
            return res.json(newProfile);
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
