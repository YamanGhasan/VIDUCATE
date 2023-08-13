const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userJWTSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
});

const UserJWT = mongoose.model('UserJWT', userJWTSchema);

module.exports = UserJWT;