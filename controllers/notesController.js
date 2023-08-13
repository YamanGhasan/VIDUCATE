const mongoose = require("mongoose");
const Note = require("../models/Note");
const User = require("../models/User");

exports.saveNote =  async (req, res) => {
  try {
    const videoId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ success: false, error: "Invalid videoId" });
    }
    const userEmail = req.session.user_id;
    let userId;
    const user = await User.findOne({ email: userEmail });
    if (user) {
      userId = user._id;
      const { title, note, time } = req.body;
      const newNote = new Note({
        videoId,
        userId,
        title,
        time,
        content: note,
      });
      await newNote.save();
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error saving note:", error);
    res.json({ success: false });
  }
};

exports.getNotes =  async (req, res) => {
  try {
    const videoId = req.params.id;
    const userEmail = req.session.user_id;
    let userId;
    const user = await User.findOne({ email: userEmail });
    userId = user._id;
    const notes = await Note.find({ userId , videoId})
    .populate("userId")
    .populate("videoId")
    .exec();
    res.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.sendStatus(500);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const userEmail = req.session.user_id;
    let userId;
    const user = await User.findOne({ email: userEmail });
    userId = user._id;
    const noteId = mongoose.Types.ObjectId(req.params.noteId);
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.json({ success: false, error: "Note not found" });
    }
    await note.remove();
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.json({ success: false, error: "Failed to delete note" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content } = req.body;

    // Find the note by its ID and update the title and content
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true } // Return the updated note
    );

    res.json({ success: true, note: updatedNote });
  } catch (error) {
    console.error('Error updating note:', error);
    res.json({ success: false });
  }
};
