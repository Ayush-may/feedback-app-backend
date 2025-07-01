// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });

// UserSchema.virtual('feedbacks', {
//     ref: "Feedback",
//     foreignField: "userId",
//     localField: "_id"
// })
// UserSchema.set('toObject', { virtuals: true });

// UserSchema.set('toJSON', { virtuals: true });

// module.exports = mongoose.model('User', UserSchema);

const dynamoose = require('../dynamoose')

const UserSchema = new dynamoose.Schema({
    _id: {
        type: String,
        hashKey: true
    },
    name: String,
    email: {
        type: String,
        index: {
            global: true,
            name: "email-index"
        }
    },
    password: String
})

const User = dynamoose.model("feedbackapp_users", UserSchema)
module.exports = User;
