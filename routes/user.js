const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupForm) // GET route for user signup form
  .post(wrapAsync(userController.signup)); // POST route for user signup

router
  .route("/login")
  .get(userController.renderLoginForm) // GET route for user login form
  .post(                                        // POST route for user login
    saveRedirectUrl,
    passport.authenticate("local", {   //passport automatically login the user
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );


router.get("/logout", userController.logout);

module.exports = router;
