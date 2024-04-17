require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("./passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://zetodo.onrender.com",
    credentials: true,
  })
);

// MIDDLEWARES
app.use(
  session({
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    store: new (require("connect-pg-simple")(session))({
      // Insert connect-pg-simple options here
      conString: process.env.DATABASE_URL,
    }),
  })
);

app.use(passport.session());
app.use(passport.initialize());

const groupsRouter = require("./routes/groupsRoutes");
const todosRouter = require("./routes/todosRoutes");
const authRouter = require("./routes/authRoutes");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/groups", groupsRouter);
app.use("/api/v1/groups/:id/todos", todosRouter);

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "dist");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    if (req.url.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

app.use((err, req, res, next) => {
  if (err) {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

module.exports = app;
