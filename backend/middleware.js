const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(500).json({ isLoggedIn: false });
  }
};

module.exports = isLoggedIn;
