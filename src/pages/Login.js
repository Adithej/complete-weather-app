import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { LoginSchema } from "../components/LoginSchema";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  function postLogin() {
    axios
      .post("https://apingweb.com/api/login", {
        email,
        password,
      })
      .then((result) => {
        if (result.status === 200) {
          // setAuthTokens(result.data);
          login({
            name: result.data.result.name,
            email: result.data.result.email,
            token: result.data.token,
          });
          console.log(result);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  const onUpadteField = (e) => {
    const valueSet = e.target.value;
    setEmail(valueSet);
  };

  // if (isLoggedIn) {
  //   return <Redirect to={referer} />;
  // }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 ">
          Weather App
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onUpadteField}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {/* <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a> */}
          <div className="mt-6">
            <button
              onClick={postLogin}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          {/* <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign up
          </a> */}
          <Link
            to="/register"
            className="font-medium text-purple-600 hover:underline"
          >
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
