const db = require("../db");

exports.getAllTodos = async (req, res) => {
  const id = req.query.id;
  try {
    const results = await db.query("SELECT * FROM todos WHERE todos.group_id = $1;", [id]);

    res.status(200).json({
      status: "success",
      data: {
        todos: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the todo.",
    });
  }
};

// exports.getTodo = async (req, res) => {
//   try {
//     const results = db.query("SELECT * FROM todos WHERE todo.id = $1;", [req.params.id]);

//     res.status(200).json({
//       status: "success",
//       data: {
//         todos: results.rows[0],
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "An error occurred while retrieving the todo.",
//     });
//   }
// };

exports.createTodo = async (req, res) => {
  const name = req.body.name;
  const id = req.body.group_id;

  try {
    const results = await db.query(
      `INSERT INTO todos (name, group_id) VALUES($1, $2) returning *`,
      [name, id]
    );

    res.status(201).json({
      status: "success",
      data: {
        newTodo: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the todo.",
    });
  }
};

exports.updateTodo = async (req, res) => {
  const completed = req.body.completed;
  const id = req.body.todo_id;

  try {
    const results = await db.query(
      `UPDATE todos SET completed = $1 WHERE todos.id = $2 returning *`,
      [completed, id]
    );

    res.status(200).json({
      status: "success",
      data: {
        updatedTodo: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the todo.",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  const id = req.body.todo_id;

  try {
    await db.query(`DELETE FROM todos WHERE todos.id = $1 returning *`, [id]);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the todo.",
    });
  }
};
