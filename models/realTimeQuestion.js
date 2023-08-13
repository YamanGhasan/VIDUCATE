const mongoose = require('mongoose') ;
   
const realTimeQuestionSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  },
  questions: [{
    question: {
      type: String,
      required: true,
    },
    answers: [{
      answer: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        require: true,
        default: false,
      },
      _id: false
    }],
    score: {
      type: Number,
      default: 10,
    },
    duration: {
      type: Number,
      default: 10,
    },
    questionTime: {
      type: Number,
      require: true,
    }
  }],
});
  
const RealTimeQuestion = mongoose.model("RealTimeQuestion", realTimeQuestionSchema);
  
module.exports = RealTimeQuestion;