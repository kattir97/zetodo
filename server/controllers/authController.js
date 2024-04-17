const passport = require("passport");
const db = require("../db/index");
const { generatePassword } = require("../utils/passwordUtils");

exports.register = async (req, res, next) => {
  const guestData = await db.query(
    "select * from groups join users on users.id = groups.user_id where groups.user_id = 44;"
  );

  const saltHash = generatePassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  try {
    const newUser = await db.query(
      "INSERT INTO users (username, email, salt, hash) VALUES($1, $2, $3, $4) returning *",
      [req.body.username, req.body.email, salt, hash]
    );

    const newUserId = newUser.rows[0].id;

    for (let i = 0; i < guestData.rows.length; i++) {
      const groupId = guestData.rows[i].id;
      await db.query("UPDATE groups SET user_id = $1 WHERE groups.user_id = $2", [
        newUserId,
        groupId,
      ]);
    }

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
