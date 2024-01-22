import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthButton from "../comps/AuthButton";
import { AuthContext } from "../../contexts/AuthContext";
import { LuListTodo } from "react-icons/lu";
import { GroupsContext } from "../../contexts/GroupsContext";

import "@fontsource-variable/jetbrains-mono";

function MainLayout() {
  const { user, setUser } = useContext(AuthContext);
  const { setGroups } = useContext(GroupsContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/auth/sign-in");
  };

  const handleSignOut = () => {
    setUser(null);
    setGroups([]);
    localStorage.setItem("user", null);
    navigate("/");
  };

  const signOutButton = <AuthButton text="Sign Out" handleClick={handleSignOut} />;
  const singInButton = <AuthButton text="Sign In" handleClick={handleSignIn} />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-red-600 dark:from-gray-800 dark:to-gray-900">
      <div className="flex justify-between items-center py-4 px-8">
        <Link
          to={"/"}
          className="flex justify-center items-center text-white gap-2 text-xl font-mono font-bold"
        >
          <LuListTodo />
          <h3>ZETODO</h3>
        </Link>

        <div className="flex gap-2">{user ? signOutButton : singInButton}</div>
      </div>
      <div className="md:w-9/12 lg:w-7/12  w-full mx-auto lg:py-16 lg:px-12 py-6 px-4">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
