const passport = require("passport");
const db = require("../db/index");
const { generatePassword } = require("../utils/passwordUtils");

exports.register = async (req, res, next) => {
  const saltHash = generatePassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  try {
    const newUser = await db.query(
      "INSERT INTO users (username, email, salt, hash) VALUES($1, $2, $3, $4) returning *",
      [req.body.username, req.body.email, salt, hash]
    );

    res.status(201).json({
      status: "success",
      data: {
        newUser: newUser.rows[0],
      },
    });
  } catch (error) {
    console.log("ERRRRRRRRRROR");
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the user.",
      code: error.code,
    });
  }
};
