import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };

    const res = await register(newUser);

    console.log("res", res);
    if (res.data.status === "success") {
      console.log("success");
      navigate("/auth/sign-in");
    } else if (res.data.status === "error" && res.data.code == 23505) {
      setErrorMessage("User with such username already exist");
    } else {
      setErrorMessage(res.response.data.message);
    }
  };

  return (
    <div className="flex items-center bg-white dark:bg-gray-900 rounded">
      <div className="container mx-auto ">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Sign Up
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Sign up to save all your todos</p>
          </div>
          <div className="m-7">
            <form onSubmit={handleRegister}>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="email"
                  name="email"
                  id="username"
                  placeholder="brian73"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEamil(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your@company.com"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-400">
                    Password
                  </label>
                  <a
                    href="#!"
                    className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              {errorMessage && (
                <div className="bg-red-300 p-2  my-3 border border-red-500 rounded">
                  <p className="text-red-700">{errorMessage}</p>
                </div>
              )}
              <div className="mb-6">
                <button
                  onClick={handleRegister}
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/auth/sign-in"}
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
