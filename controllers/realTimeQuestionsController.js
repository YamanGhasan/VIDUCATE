const Video = require("../models/videoModel");
const mongoose = require('mongoose');
const RealTimeQuestion = require('../models/realTimeQuestion');
const NodeInputValidator = require('node-input-validator');

const create = async (req, res) => {

  const videoId = req.params.videoId;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    res.render("errorPage", { title: "no such video" });
  } else {
    const video = await Video.findById(videoId);
    console.log(video);
    res.render('pages/realTimeQuestionsCreationPage', {
      video
      
    });
  }
}

const store = async (req, res) => {
  const formattedQuestions = questionsBuilder(req);

  const error = await questionsValidation(formattedQuestions);

  if(error) {
    console.log('contains error');
    console.log(error)
    res.render('errorPage', {title: "can't create these questions", message: "can't create these questions"});
  } else {
    // res.json(formattedQuestions);
    let data = await RealTimeQuestion.create(formattedQuestions);
    res.redirect(`/video/${req.params.videoId}`);
  }
}

/**
 * Build formatted questions object from body of post request 
 * 
 * @param {Express.Request} requestBody 
 * @returns {quetions} contains formatted questions
 */
const questionsBuilder = (request) => {
  const { questions, questionTime, answers, correctAnswer } = request.body;

  let resultantDocument = {};
  resultantDocument['videoId'] = request.params.videoId;
  resultantDocument['questions'] = [];

  questions.forEach((question, index) => {
    resultantDocument['questions'][index] = {};
    resultantDocument['questions'][index].question = question;

    resultantDocument['questions'][index].answers = answers[index].reduce((result, answer) => {
      let newAnswer = {};
      newAnswer['answer'] = answer;

      newAnswer['isCorrect'] = (result.length.toString() == correctAnswer[index]) ? true: false; 

      result.push(newAnswer);
      return result;
    }, []);
    
    resultantDocument['questions'][index]['questionTime'] = Number(questionTime[index]);
  });

  resultantDocument.questions.sort((question1, question2) => question1.questionTime - question2.questionTime);
  
  return resultantDocument;
}

const questionsValidation = async (formattedQuestions) => {
  var error;

  if(!mongoose.Types.ObjectId.isValid(formattedQuestions.videoId)) {
    error = "No such video id";
    return error;
  } 

  const video = await Video.findById(formattedQuestions.videoId);
  const realTimeQuestions = await RealTimeQuestion.findOne({videoId: formattedQuestions.videoId});

  if(!video) {
    error = "No such video";
    return error;
  }

  if(realTimeQuestions) {
    error = "This video already contains questions";
    return error;
  }

  NodeInputValidator.extend('oneCheckedInput', ({ value }) => {
    let chckedInputs = value.filter(input => input.isCorrect);

    return (chckedInputs.length === 1);
  });

  const validationRules = {
    'questions.*.question': 'required|string',
    'questions.*.answers.*.answer': 'required|string',
    'questions.*.answers.*.isCorrect': 'required|boolean',
    'questions.*.answers': 'required|array|oneCheckedInput',
    'questions.*.questionTime': 'required|decimal',
  }

  const validator = new NodeInputValidator.Validator(formattedQuestions, validationRules);

  validator.check().then((matched) => {
    if(!matched) error = validator.errors;
  });

  return error;
}

module.exports = {
  create,
  store
}