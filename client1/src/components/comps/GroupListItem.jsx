import { RiEdit2Line } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TodosContext } from "../../contexts/TodosContext";

function GroupListItem({ todoGroup }) {
  const [todos, setTodos] = useState([]);
  // const [percentage, setPercentage] = useState(null);
  const navigate = useNavigate();

  const { fetchAllTodos } = useContext(TodosContext);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchAllTodos(todoGroup.id);
      setTodos(results);
    };

    fetchData();
  }, []);

  const handleNavigate = () => {
    navigate(`${todoGroup.id}/todos`, { state: { todoGroup } });
  };

  const completedTodos = todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc + 0), 0);
  const percentage = completedTodos === 0 ? 0 : Math.round((completedTodos / todos.length) * 100);

  return (
    <div
      key={todoGroup.id}
      className="w-full py-1 px-2 sm:py-2 sm:px-4 md:py-5 md:px-10 flex items-center justify-between bg-white border-b-2 border-gray-200 cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="flex items-center">
        <CircularProgressbar
          className="w-8 h-8 sm:w-10 sm:h-10  md:w-14 md:h-14 mr-6 "
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({ textSize: "1.6rem" })}
        />
        <span className="text-lg sm:text-xl md:text-2xl">{todoGroup.name}</span>
      </div>
      <div className="p-2 sm:p-3 md:p-4 border rounded-full border-gray-900">
        <RiEdit2Line />
      </div>
    </div>
  );
}

export default GroupListItem;
