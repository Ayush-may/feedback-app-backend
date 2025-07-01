// const mongoose = require('mongoose');

// const FeedbackSchema = new mongoose.Schema({
//     userId: mongoose.Schema.Types.ObjectId,
//     user_input: String,
//     feedback: String,
//     createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Feedback', FeedbackSchema);


const dynamoose = require('../dynamoose')

const FeedbackSchema = new dynamoose.Schema({
    _id: {
        type: String,
        hashKey: true,
    },
    userId: {
        type: String,
        index: {
            global: true,
            name: "userId-index"
        }
    },
    user_input: String,
    feedback: String,
    createdAt: {
        type: Number,
        default: Date.now(),
        sortKey: true
    }
})

module.exports = dynamoose.model('feedbackapp_feedbacks', FeedbackSchema)