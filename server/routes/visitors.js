const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

router.get('/', async (req, res) => {
    try {
        let visitorData = await Visitor.findOne();
        if (!visitorData) {
            visitorData = new Visitor();
            await visitorData.save();
        }
        res.json({ count: visitorData.count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        let visitorData = await Visitor.findOne();
        if (!visitorData) {
            visitorData = new Visitor();
        }
        visitorData.count += 1;
        visitorData.lastUpdated = new Date();
        await visitorData.save();
        res.json({ count: visitorData.count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
