const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    username: String,
    createdAt: String,
    updatedAt: String,
    comments: [{
        content: String,
        username: String,
        createdAt: String
    }],
    likes: [{
        username: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('Post', postSchema); 