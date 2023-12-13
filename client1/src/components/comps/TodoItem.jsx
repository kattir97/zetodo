import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { TodosContext } from "../../contexts/TodosContext";

const isDoneIconStyle = classNames("mr-3 text-2xl");
const isDoneTextStyle = classNames("line-through text-gray-300");

function TodoItem({ todo }) {
  const [isDone, setIsDone] = useState(todo.completed);
  const { updateTodo, deleteTodo } = useContext(TodosContext);
  const { id } = useParams();

  const handleIsDone = async () => {
    setIsDone(!isDone);
    const changedTodo = {
      completed: !isDone,
      todo_id: todo.id,
    };
    await updateTodo(id, changedTodo);
  };

  const handleRemoveTodo = async (e) => {
    e.stopPropagation();
    const groupId = id;
    const todoId = { todo_id: todo.id };
    await deleteTodo(groupId, todoId);
  };

  const isDoneIcon = isDone ? (
    <BsCheckCircleFill className={isDoneIconStyle} />
  ) : (
    <BsCircle className={isDoneIconStyle} />
  );

  return (
    <div
      className="w-full py-2 px-4 md:py-5 md:px-10 flex items-center justify-between bg-white border-b-2 border-gray-200 cursor-pointer"
      onClick={handleIsDone}
    >
      <div className="flex items-center">
        {isDoneIcon}
        <span className={`text-2xl ${isDone ? isDoneTextStyle : null}`}>{todo.name}</span>
      </div>
      <IoIosRemoveCircleOutline
        className="hover:bg-blue-950 hover:text-white rounded-full text-3xl z-10"
        onClick={(e) => handleRemoveTodo(e)}
      />
    </div>
  );
}

export default TodoItem;
