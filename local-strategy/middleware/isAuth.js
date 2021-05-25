exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect("login");
};

exports.isNotAuth = (req, res, next) => {
  if (!req.isAuthenticated()) next();
  else res.redirect('/');
}
