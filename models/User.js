const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
        maxlength: 25
    },
    lastName: {
        type: String,
        required: false,
        maxlength: 25
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: false,
        unique: true,
        maxlength: 50
    },
    image: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    score: {
        type: Number,
        default: 4,
        min: 0,
        max: 100,
      },
      isSubscriber: {
        type: Boolean,
        default: false,
      },
});
const User = mongoose.model('User', userSchema);
module.exports = User 