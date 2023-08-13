const User = require('../models/User');



exports.saveScore = async (req, res) => {
  const score = req.body.score;

  try {
    
    const user = await User.findOne({ email: req.session.user_id });
    if (!user) {
      throw new Error('User not found');
    }
  
  
    // Update the user's score
    user.score = score;
    await user.save();

    return res.status(200).json({ message: 'Score saved successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};
