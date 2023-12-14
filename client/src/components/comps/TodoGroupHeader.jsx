import { useContext, useEffect } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { GroupsContext } from "../../contexts/GroupsContext";

function TodoGroupHeader() {
  const { theme, setTheme } = useContext(GroupsContext);

  useEffect(() => {
    const root = document.getElementById("root");
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const moonIcon = <BsFillMoonFill className="text-3xl text-white cursor-pointer" />;
  const sunIcon = <BsFillSunFill className="text-3xl text-white cursor-pointer" />;
  const themeMode = theme === "light" ? moonIcon : sunIcon;

  // onClick = { handleTheme };
  return (
    <div className="flex justify-between mb-8">
      <h4 className="text-3xl font-bold text-white">TODO</h4>
      <div onClick={handleTheme}>{themeMode}</div>
    </div>
  );
}

export default TodoGroupHeader;
