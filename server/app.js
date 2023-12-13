require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "dist");
  app.use(express.static(buildPath));
}

// MIDDLEWARES
app.use(cors());
app.use(express.json());

const groupsRouter = require("./routes/groupsRoutes");
const todosRouter = require("./routes/todosRoutes");

app.use("/api/v1/groups", groupsRouter);
app.use("/api/v1/groups/:id/todos", todosRouter);

if (process.env.NODE_ENV === "production") {
  // gets the static files from the build folder
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

module.exports = app;
