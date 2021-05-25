const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controllers
const loginController = require("../controllers/login");
const registerController = require("../controllers/register");
require('../config/passportConfig')
const isAuth = require('../middleware/isAuth').isAuth
const isNotAuth = require('../middleware/isAuth').isNotAuth


router.get("/login",isNotAuth, loginController.getLogin);

router.get("/register",isNotAuth, registerController.getRegister);

router.get("/loggedIn",isAuth, loginController.getLoggedIn);

router.post(
  "/login",
  isNotAuth,
  passport.authenticate("local", {
    successRedirect: "/users/loggedIn",
    failureRedirect: "/users/login",
  }),
  (req, res, next) => {console.log('here')}
);

router.post("/register",isNotAuth, registerController.postRegister);

router.post("/logout",isAuth, loginController.postLogout)

module.exports = router;
