import { useContext, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { TodosContext } from "../../contexts/TodosContext";
import { useParams } from "react-router-dom";

function CreateTodoInput() {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { id } = useParams();
  const { createTodo } = useContext(TodosContext);

  const createDoc = async (e) => {
    e.preventDefault();
    if (!isValid || name.trim() === "") {
      setIsValid(false);
      return;
    }
    await createTodo(id, { name: name, group_id: id });
    setName("");
  };

  const handleName = (e) => {
    let value = e.target.value;
    setName(e.target.value);
    setIsValid(value.trim() !== "" && value !== "");
  };

  return (
    <form onSubmit={(e) => createDoc(e)}>
      <div className="flex justify-start items-center rounded p-1 sm:p-2 md:p-4  bg-white mb-4  md:mb-8">
        <CiViewList className="text-4xl md:text-6xl" />
        <div className="ml-8 ">
          <input
            placeholder={`Create todo task...`}
            className="w-full p-2 md:p-4 text-2xl border-none outline-none"
            value={name}
            onChange={(e) => handleName(e)}
          />
          {!isValid && <p className="text-red-500 p-2 md:px-4">Group name can not be empty</p>}
        </div>
      </div>
    </form>
  );
}

export default CreateTodoInput;
