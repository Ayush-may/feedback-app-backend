const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    user_input: String,
    feedback: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
