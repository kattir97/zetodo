import { BsFillMoonFill } from "react-icons/bs";

function TodoGroupHeader() {
  return (
    <div className="flex justify-between mb-8">
      <h4 className="text-3xl font-bold text-white">TODO</h4>
      <BsFillMoonFill className="text-3xl text-white cursor-pointer" />
    </div>
  );
}

export default TodoGroupHeader;
