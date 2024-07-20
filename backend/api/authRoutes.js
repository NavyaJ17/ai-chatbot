const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const isLoggedIn = require("../middleware");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let { email, username, password } = req.body;
    let user = new User({ email, username });
    console.log(user);
    await User.register(user, password);
    res.status(200).json({ msg: "Signup successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/login", (req, res) => {
  res.json({ msg: req.session.messages });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
    session: true,
  }),
  (req, res) => {
    res.status(200).json({ msg: "Login successful", user: req.user });
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).json({ msg: "Logout successful" });
  });
});

router.get("/user", isLoggedIn, (req, res) => {
  try {
    const user = {
      ...req.user._doc,
      isLoggedIn: true,
    };
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:userId", isLoggedIn, async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("chats");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
