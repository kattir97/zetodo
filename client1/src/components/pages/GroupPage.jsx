import TodoList from "../comps/TodoList";
import TodoHeader from "../comps/TodoHeader";
import DeleteModal from "../comps/DeleteModal";
import CreateTodoInput from "../comps/CreateTodoInput";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { GroupsContext } from "../../contexts/GroupsContext";

function GroupPage() {
  const {
    state: { todoGroup },
  } = useLocation();

  const { showModal, setShowModal } = useContext(GroupsContext);

  return (
    <>
      <TodoHeader />
      <CreateTodoInput />
      <TodoList />
      {showModal && <DeleteModal setShowModal={setShowModal} todoGroup={todoGroup} />}
    </>
  );
}

export default GroupPage;
