exports.getLogin = (req, res, next) => {
  res.render('login') 
}

exports.getLoggedIn = (req, res, next) => {
  res.render('loggedIn')
}
 
exports.postLogout = (req, res, next) => {
  req.logout()
  res.redirect('login')
}