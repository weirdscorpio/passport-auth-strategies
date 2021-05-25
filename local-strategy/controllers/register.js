const bcrpyt = require("bcrypt");
const User = require("../models/User");

exports.getRegister = (req, res, next) => {
  res.render("register");
};

exports.postRegister = async (req, res, next) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({email: email})
  if(existingUser){
    res.redirect('register')
  }
  else{
    const hash = await bcrpyt.hash(password, 12);
    const user = new User({
      email: email,
      password: hash,
    });
    
    user.save()
    .then((user) => {
      res.redirect('login')
    })
    .catch(err => {
      console.log(err)
      res.redirect('login')
    })
  }
  
};

