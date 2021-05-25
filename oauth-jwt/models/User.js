const mongoose = require("mongoose");
const passport = require("passport");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

// userSchema.methods.validPassword = async (userPassword, password) => {
//   try {
//     const isCorrect = await bcrypt.compare(password, userPassword)
//     console.log(isCorrect)
//     return isCorrect;
//   } catch (err) {
//     console.log(err);
//   }
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
