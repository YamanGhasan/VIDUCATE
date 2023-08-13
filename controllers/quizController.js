const quizController = (req, res) => {
 res.render("Quiz", {
    title: "Quiz",
    css: ["/css/Quiz.css"],
    js: ["js/Questions.js", "js/Quiz.js"],
  });
};

module.exports = {quizController};