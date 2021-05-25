const express = require("express");
const authRouter = require("./routes/authRoute");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const MONGO_URI =
  "mongodb+srv://username:password@cluster0.asp3w.mongodb.net/oAuthTest?retryWrites=true&w=majority";

const app = express();

app.set("view engine", "ejs");
require("./config/passportConfig");
app.use(passport.initialize());



app.use(cookieParser());

app.use("/users", authRouter);

app.get("/", (req, res, next) => {
  res.render("welcome");
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((response) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
