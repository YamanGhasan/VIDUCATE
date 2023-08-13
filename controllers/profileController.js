
const User = require("../models/User");
const { Validator } = require("node-input-validator");
const bcrypt = require("bcrypt");



exports.getUserProfile = (req, res) => {
    const userEmail = req.session.user_id;
    User.findOne({ email: userEmail }, (err, user) => {
      if (err) {
        console.error("Error retrieving user profile:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      res.render("profile", { title: "User profile", user, bio });
    });
  };
  
  let bio = "myBio."; // for getUserProfile & getUserEditProfile  function.
  
  exports.getUserEditProfile = (req, res) => {
    const userEmail = req.session.user_id;
    User.findOne({ email: userEmail }, (err, user) => {
      if (err) {
        console.error("Error retrieving user profile:", err);
        return res.status(500).send("Internal Server Error");
      }
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      res.render("editProfile", { title: "User edit profile", user, bio });
    });
  };
  
  exports.getUserEditPass= (req, res) => {
    const userEmail = req.session.user_id;
    User.findOne({ email: userEmail }, (err, user) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      res.render("editPass", { title: "User edit password", user });
    });
  };
      
  exports.postEditProfile =async (req, res, next)  => {
    try{
  
      const {
        
        userName,
        firstName,
        lastName,
        email,
        gender,
        profileBio,
        profileImage,
      } = req.body;
  
      const profileInfo = new Validator(req.body, {
        firstName: "required|maxLength:20",
        lastName: "required|maxLength:20",
        userName: "required|maxLength:30",
        gender: "required|in:male,female,Male,Female,MALE,FEMALE",
        email: "required|email",
        profileBio: "maxLength:10",
      });
  
  
      profileInfo.check().then((matched) => {
        if (!matched) {
          res.status(422).send(profileInfo.errors);
        }
      });
  
      bio = profileBio; // to change bio value
  
      const userEmail = req.session.user_id;
  
  
      const user = await User.findOne({ email: userEmail });
  
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
    let userId = user._id;
  
    
      const existingUser = await User.findOne({ userName: userName });
      
  
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(404).send("User name already exists.");
      }
  
      const existingEmail = await User.findOne({ email: email });
  
      if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
        return res.status(404).send("Email already exists.");
      }

  
  
  console.log(profileImage);
      // Update the user properties
      user._id = userId;
      user.firstName = firstName;
      user.lastName = lastName;
      user.userName = userName;
      user.email = email;
      user.gender = gender;
  
      // Save the updated user
      await user.save();
  
      res.redirect("/user/profile"); // Redirect to the profile page after successful update
    } catch (error) {
     console.error(error);
      res.status(500).json({ error: "Server error" });
    
  }
  }
  
  exports.postEditPass =async (req, res, next)  => {
    try{
      const {
        currentPass, 
         newPass,
        confirmPass,
      } = req.body;
  
  
      const passValidation = new Validator(req.body, {
        currentPass: "required|maxLength:20|minLength:8",
        newPass: "required|maxLength:20|minLength:8",
        confirmPass: "required|maxLength:20|minLength:8",
       
      });
  
      passValidation.check().then((matched) => {
        if (!matched) {
          res.status(422).send(passValidation.errors);
        }
      });
  
  
      const userEmail = req.session.user_id;
      let userId;
      const user = await User.findOne({ email: userEmail });
  
      userId = user._id;
  
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
        // Check if password is correct
        const passwordMatch = await bcrypt.compare(currentPass, user.password);
        if (!passwordMatch) {
          return res.status(401).send("Invalid current password");
        }
  
      if ( newPass!= confirmPass )
      {
        return res.status(404).send("Wrong confirm password");
  
      }
  
  console.log(newPass);
  
   // generate a salt to use in hashing the password
   const saltRounds = 10;
   const salt = await bcrypt.genSalt(saltRounds);
  
   // hash the password using the salt
   const hashedPassword = await bcrypt.hash(newPass, salt);
  
   console.log(newPass);
  
  // Update the user properties
  user._id = userId;
  user.password= hashedPassword;
  
  // Save the updated user
  await user.save();
  
  
      res.redirect("/user/profile"); // Redirect to the profile page after successful change
    } catch (error) {
     console.error(error);
      res.status(500).json({ error: "Server error" });
    
  }
  }
  