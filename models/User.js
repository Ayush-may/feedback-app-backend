const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

UserSchema.virtual('feedbacks', {
    ref: "Feedback",
    foreignField: "userId",
    localField: "_id"
})
UserSchema.set('toObject', { virtuals: true });

UserSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);
