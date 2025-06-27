const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const cors = require("cors");
const User = require("./models/User");
const authRoutes = require("./api/authRoutes");
const chatRoutes = require("./api/chatRoutes");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connected.");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://ai-chatbot-1-wyb4.onrender.com",
    credentials: true,
  })
);

let configSession = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
app.use(session(configSession));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoutes);
app.use(chatRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port.");
});
