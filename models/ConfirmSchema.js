
const mongoose = require('mongoose');
 

const activationEmailSchema = new mongoose.Schema({
  token: String,
  createdAt: { type: Date, default: Date.now }, 
  userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
}, {timestamps: true});

const ActivationEmail = mongoose.model('ActivationEmail', activationEmailSchema);

module.exports = ActivationEmail; 