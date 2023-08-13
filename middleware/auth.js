const sessions = require('express-session');
var session;
const sessionCookieLifeTime = 60 * 60 * 1000;

const sessionMiddleware = sessions({
  secret: "Muy8fuSOYHDsR6WOCwNS6K6sy2QmhSEp", // use 256-bit key with no more than 60 chars. 32 is fair-enough
  saveUninitialized: true,
  cookie: { maxAge: sessionCookieLifeTime },
  resave: false
});

const checkSession = async (req, res, next) => {
  // read the session
  session = req.session;

  // if session has a user_id value (set upon login)
  if (session && session.user_id) {
    next(); // Continue to the next middleware or route handler
  } else {
    // Store the original URL in session for redirection after login
    req.session.redirectURL = req.originalUrl;
    res.render("login", {
        title: "Login",
      });
  }
};

module.exports = {
  sessionMiddleware,
  checkSession
};