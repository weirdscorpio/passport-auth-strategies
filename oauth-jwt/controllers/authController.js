const jwt = require("jsonwebtoken");

exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.getAuthRedirect = (req, res, next) => {
  const token = jwt.sign({ data: req.user }, "googleoauthtoken", {
    expiresIn: 24 * 60 * 60 * 1000,
  });
  res.cookie('jwt', token)
  res.redirect('/users/loggedIn');
};

exports.getLoggedIn = (req, res, next) => {
  res.render("loggedIn");
};

exports.postLogOut = (req, res, next) => {
  req.logout()
  res.clearCookie("jwt")
  res.redirect("login")
};
