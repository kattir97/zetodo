import { useContext } from "react";
import CreateGroupInput from "../comps/CreateGroupInput";
import GroupsList from "../comps/GroupsList";
import TodoGroupHeader from "../comps/TodoGroupHeader";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
// import Lottie from "lottie-react";
// import SignUpAnimation from "../../assets/signup_animation.json";

function GroupsListPage() {
  const { user } = useContext(AuthContext);

  const content = (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-white py-10 text-3xl">Sign Up to add your first tasks!</h1>
      <Link to="/auth/sign-up" className="text-white hover:text-blue-400">
        <h3>Click here to create an account.</h3>
      </Link>
    </div>
  );

  return (
    <>
      <TodoGroupHeader />
      <CreateGroupInput />
      {user ? <GroupsList /> : content}
    </>
  );
}

export default GroupsListPage;
