const Comment = require("../models/Comment");
const Validator = require("node-input-validator");
const validator = require("node-input-validator");
const User = require("../models/User");

exports.createComment = async (req, res) => {
  try {
    if (!req.session.user_id) {
      res.redirect(`/video/${videoId}`);
    } else {
      const videoId = req.params.videoId;
      const userEmail = req.session.user_id;
      const user = await User.findOne({ email: userEmail });
      userId = user._id;
      const { comment } = req.body;
      userId = user._id;
      const comments = await Comment.find()
        .sort({ createdAt: -1 })
        .populate("userId", "userName");
      const validation = new validator.Validator(req.body, {
        comment: "required|maxLength:1000",
      });

      const matched = await validation.check();

      if (!matched) {
        const errors = validation.errors;
        const AddErrorMessage = errors.comment.message;
        return res.render("videoPage", {
          css: ["/css/comments.css"],
          videoSource: `${process.env.APP_URL}/video/get/aa`,
          comments,
          AddErrorMessage,
        });
      }
      await Comment.create({ comment, userId, videoId });
      res.redirect(`/video/${videoId}`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    if (!req.session.user_id) {
      res.redirect(`/video/${videoId}`);
    } else {
      const userEmail = req.session.user_id;
      const user = await User.findOne({ email: userEmail });
      userId = user._id;
      const { comment } = req.body;
      const commentId = req.params.commentId;

      if (userId != comment.userId) {
        res.redirect(`/video/${videoId}`);
      } else {
        const validator = new Validator.Validator(req.body, {
          comment: "required|maxLength:1000",
        });

        const validated = await validator.check();
        const comments = await Comment.find()
          .sort({ createdAt: -1 })
          .populate("userId", "userName");

        if (!validated) {
          const errorMessages = Object.values(validator.errors).map(
            (error) => error.message
          );
          const commentError = {};
          commentError[commentId] = errorMessages;
          return res.render("videoPage", {
            commentError,
            comments,
            css: ["/css/comments.css"],
            videoSource: `${process.env.APP_URL}/video/get/aa`,
          });
        }
        const updatedComment = await Comment.findByIdAndUpdate(
          commentId,
          { comment },
          { new: true }
        );
        if (!updatedComment) {
          return res.status(404).json({ message: "Comment not found." });
        }
        res.redirect(`/video/${videoId}`);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const commentId = req.params.commentId;
    const comment = await Comment.findOne({ commentId });
    if (!req.session.user_id) {
      res.redirect(`/video/${videoId}`);
    } else {
      const userEmail = req.session.user_id;
      const user = await User.findOne({ email: userEmail });
      userId = user._id;
      if (comment.userId == userId) {
        await Comment.findByIdAndDelete(commentId);
        res.redirect(`/video/${videoId}`);
      } else {
        res.redirect(`/video/${videoId}`);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
