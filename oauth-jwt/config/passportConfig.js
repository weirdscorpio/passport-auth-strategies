const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};
opts.secretOrKey = "googleoauthtoken";

CheckUser = async (data) => {
  try{
    let user = await User.findOne({id: data.id})
    if(user){
      return true
    }
    else{
      return false
    }
  }
  catch(err){
    console.log(err)
    return false
  }
}

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    try{
      let isUserPresent = CheckUser(jwt_payload.data)
      if (isUserPresent) {
        return done(null, jwt_payload.data);
      } else {
        console.log('1')
        return done(null, false);
      }
    }
    catch(err){
      console.log(err)
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "http://localhost:3000/users/google/redirect",
      
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ id: profile.id }).then((user) => {
        if (user) {
          done(null, user);
        } else {
          const user = new User({
            name: profile.displayName,
            id: profile.id,
          });
          user
            .save()
            .then((newUser) => {
              console.log(newUser);
              done(null, newUser);
            })
            .catch((err) => {
              done(err);
            });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ id: id }).then((user) => {
    done(null, user);
  });
});
