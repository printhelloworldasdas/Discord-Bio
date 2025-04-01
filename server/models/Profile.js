const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
    platform: String,
    url: String
});

const profileSchema = new mongoose.Schema({
    username: { type: String, default: 'Username' },
    discordTag: { type: String, default: '#0000' },
    status: { type: String, default: 'online', enum: ['online', 'idle', 'dnd', 'offline'] },
    bio: { type: String, default: 'This is a custom bio.' },
    socialLinks: [socialLinkSchema],
    videoBackground: { type: String, default: 'default.mp4' },
    backgroundMusic: { type: String, default: 'default.mp3' },
    colorScheme: {
        primary: { type: String, default: '#7289da' },
        secondary: { type: String, default: '#424549' },
        text: { type: String, default: '#ffffff' }
    }
});

module.exports = mongoose.model('Profile', profileSchema);
