const User = require("../models/User");
// const nodemailer = require('nodemailer');
const validator = require("../middleware/validator");
var session;
const bcrypt = require("bcrypt");
const { Validator } = require("node-input-validator");
const { homeController } = require("../controllers/homeController");

const viewLogin = (req, res) => {
  if (session && session.user_id) {
    homeController(req, res, session.user_id);
  } else {
    res.render("login", {
      title: "Login",
    });
  }
};

const login = (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const handleLoginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const loginValidation = new Validator(req.body, {
    email: "required|email",
    password: "required|minLength:8|maxLength:24",
  });

  loginValidation.check().then((matched) => {
    if (!matched) {
      res.status(422).send(loginValidation.errors);
    }
  });

  try {
    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // set the session
    session = req.session;
    req.session.user_id = req.body.email; // .user_id can be any name you prefer

    // Redirect to home page
    const redirectURL = req.session.redirectURL || "/home";
    res.redirect(redirectURL);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while logging in" });
  }
};

const viewLogout = (req, res) => {
  try {
    if (session && session.user_id) {
      req.session.destroy();
    }
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while logging out" });
  }
};

const signUp = async (req, res) => {
  try {

    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      confirmPassword,
      userName,
    } = req.body;
    let valFirstName = await validator.validateFirstName(firstName);
    let valLastName = await validator.validateLastName(lastName);
    let valDOB = await validator.validateDateOfBirth(dateOfBirth);
    let valEmail = await validator.validateEmail(email);
    let valPassword = await validator.validatePassword(
      password,
      confirmPassword
    );
    let valUserName = await validator.validateUserName(userName);
    const existingUserEmail = await User.findOne({ email: email });
    const existingUserName = await User.findOne({ userName: userName });
    if (valEmail === null && existingUserEmail) {
      emailErrorMessage = "Email already exists";
    } else {
      emailErrorMessage = valEmail;
    }
    if (valUserName === null && existingUserName) {
      userNameErrorMessage = "username already exists";
    } else {
      userNameErrorMessage = valUserName;
    }

    if (
      valFirstName != null ||
      valLastName != null ||
      valUserName != null ||
      valDOB != null ||
      valEmail != null ||
      valPassword != null ||
      existingUserName ||
      existingUserEmail
    ) {
      return res.render("signup", {
        firstNameErrorMsg: valFirstName,
        lastNameErrorMsg: valLastName,
        userNameErrorMessage,
        dateOfBirthErrorMsg: valDOB,
        emailErrorMessage,
        passwordErrorMsg: valPassword,
  
      });
    } else {
      const bcrypt = require("bcrypt");
      // generate a salt to use in hashing the password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      // hash the password using the salt
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: hashedPassword,
        userName: req.body.userName,
      });
      // set the session
      session = req.session;
      req.session.user_id = req.body.email;
      // Save the new user object into the database
      newUser
        .save()
        .then(() => {
          res.redirect("/home");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } catch (err) {
    res.status(500).send("Server error"); // Send a 500 Internal Server Error response
  }
};

const activeUser = async (req, res) => {
  const token = req.params.confirmationToken;

  const activationEmail = await ActivationEmail.findOne({ token: token });
  if (activationEmail == null) {
    return res.status(404).send("Invalid confirmation token");
  }
  const ageInHours = (Date.now() - activationEmail.createdAt) / 3600000;
  if (ageInHours > 1) {
    activationEmail.delete();
    return res.status(400).send("Confirmation token has expired");
  }

  //find user by it's stored id in document
  const user = await User.findById(activationEmail.userId);

  user.isActive = true;
  await user.save();

  activationEmail.delete();
  res.send("Account confirmed");
};

async function activeLinkSender(userId) {
  try {
    const token = "testing_token"; // Math.random().toString(36).substr(2);

    // get user email
    const user = await User.findById(userId);
    const userEmail = user.email;

    // create ActivationEmail document

    const activationEmail = new ActivationEmail();
    ActivationEmail.create({
      userID: userId,
      token: "token_value",
    });

    // send email with token
    const mailOptions = {
      from: "malakmousa951@gmail.com",
      to: userEmail,
      subject: "Activate your account",
      text: `Click the following link to activate your account: http://localhost:4000/user/confirm/${token}`,
    };
    // await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};
// Create router object
// Handle GET request for subscription form
function getSubscribeForm(req, res) {
  res.render('components/subscribe', { 
    title: 'Subscribe',
    email: req.body.email  
  });
}

// Handle POST request for subscription form
async function postSubscribeForm(req, res) {
  try {
    // Get the user's email from the session
    const userEmail = req.session.user_id;

    // Find the user in the database using the email address
    const user = await User.findOne({ email: userEmail });
    // Update the user's subscription status
    if (user) {
      user.isSubscriber = true;
      await user.save();
    }

    res.redirect('/home');
  } catch (err) {
    // Handle error
  }
}

module.exports = {
  postSubscribeForm,
  getSubscribeForm,
  activeUser,
  login,
  signUp,
  viewLogin,
  handleLoginPost,
  viewLogout,
};
