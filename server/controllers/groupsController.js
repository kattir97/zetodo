const db = require("../db/index");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await db.query("SELECT * FROM groups");
    const todos = await db.query("")

    res.status(200).json({
      status: "sucess",
      results: groups.rows.length,
      data: {
        groups: groups.rows,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while retrieving the groups.",
    });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const group = await db.query("SELECT * FROM groups WHERE groups.id = $1", [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        group: group.rows[0],
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while retrieving the group.",
    });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const newGroup = await db.query("INSERT INTO groups (name) VALUES($1) returning *", [
      req.body.name,
    ]);

    res.status(201).json({
      status: "success",
      data: {
        group: newGroup.rows[0],
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the group.",
    });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const updatedGroup = await db.query(
      "UPDATE groups SET name = $1 WHERE groups.id = $2 returning *",
      [req.body.name, req.query.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        group: updatedGroup.rows[0],
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while updating the group.",
    });
  }
};

exports.deleteGroup = async (req, res) => {
  console.log(req.query);

  try {
    await db.query("DELETE FROM groups WHERE groups.id = $1 returning *", [req.query.id]);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the group.",
    });
  }
};
