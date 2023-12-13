import { useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import { TodosContext } from "../../contexts/TodosContext";
import { useParams } from "react-router-dom";
import { GroupsContext } from "../../contexts/GroupsContext";

function TodoLists() {
  const { fetchAllTodos, todos } = useContext(TodosContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllTodos(id);
    };

    fetchData();
  }, []);

  const renderedTodos = todos.map((todo) => {
    return <TodoItem todo={todo} key={todo.id} />;
  });

  return (
    <div className="h-min-[40vh] bg-white rounded overflow-hidden">
      {renderedTodos && renderedTodos}
    </div>
  );
}

export default TodoLists;
