const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/User')
const bcrypt = require('bcrypt')

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      User.findOne({ email: email }, async function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        try{
          console.log('Here')
          const isValidated = await bcrypt.compare(password, user.password)
          console.log(isValidated, password, user.password)
          console.log('Here2z')
          if (!isValidated) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        }
        catch(err){
          console.log(err)
        }
        
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
