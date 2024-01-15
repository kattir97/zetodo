const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

// function handleResponse(res, code, statusMsg, user) {
//   res.status(code).json({ status: statusMsg, user: user });
// }

router.post("/register", authController.register);
// router.post("/login", authController.login);

// router.post("/login", authController.login);
// router.get("/login-success", authController.loginSuccess);
// router.get("login-failure", authController.loginFailure);

// router.post("/login", passport.authenticate("local"), (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.status(200).json({ message: "Login successful", done: true, user: req.user });
//   }
//   return res.status(401);
// });

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("user", user);

    if (err) {
      next(err);
    }
    if (!user) {
      return res.send({
        success: false,
        message: "Incorrect username or password. Please try again.",
      });
    }
    if (user) {
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success: true, message: "authentication succeeded", user: user });
      });
    }
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logout();
});

module.exports = router;
