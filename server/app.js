require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');

const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/discordbio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Routes
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin');
const visitorRoutes = require('./routes/visitors');

app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/visitors', visitorRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
