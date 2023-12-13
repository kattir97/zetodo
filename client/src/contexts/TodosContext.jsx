import { createContext, useState } from "react";
import zetodoApi from "../apis/zetodoApi";

export const TodosContext = createContext();

export function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const fetchAllTodos = async (id) => {
    const allTodos = await zetodoApi.get(`/${id}/todos`, { params: { id: id } });
    setTodos(allTodos.data.data.todos);
    return allTodos.data.data.todos;
  };

  const createTodo = async (id, todo) => {
    const results = await zetodoApi.post(`/${id}/todos`, todo);
    const newTodo = results.data.data.newTodo;
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (id, updatedTodo) => {
    const results = await zetodoApi.put(`${id}/todos`, updatedTodo);

    // const newList = todos.map((todo) => {
    //   if (todo.id === updateTodo.id) {
    //     return updateTodo;
    //   } else {
    //     return todo;
    //   }
    // });

    // setTodos(newList);
  };

  const deleteTodo = async (groupId, todoId) => {
    const { todo_id } = todoId;
    await zetodoApi.delete(`${groupId}/todos`, { data: todoId });
    const newList = todos.filter((el) => el.id !== todo_id);
    setTodos(newList);
  };

  const data = {
    fetchAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    todos,
    setTodos,
  };

  return <TodosContext.Provider value={data}>{children}</TodosContext.Provider>;
}
