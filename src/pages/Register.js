import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slice/auth";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [password_confirmation, setConPass] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "" });

  const [successful, setSuccessful] = useState(false);
  let navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleRegister = () => {
    setSuccessful(false);

    dispatch(
      register({
        name: name,
        email: email,
        phone: phone,
        password: password,
        password_confirmation: password_confirmation,
      })
    )
      .unwrap()
      .then(() => {
        setSuccessful(true);
        // window.location.reload();
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Full name
            </label>
            <input
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              id="name"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              id="email"
              name="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.email && errors.email}
          </div>
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-800"
            >
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              id="phone"
              name="phone"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              disabled={loading}
              id="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={password_confirmation}
              onChange={(e) => setConPass(e.target.value)}
              disabled={loading}
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
              onClick={handleRegister}
              disabled={loading}
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          {/* <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign up
          </a> */}
          <Link
            to="/"
            className="font-medium text-purple-600 hover:underline"
            onClick={() => props.onFormSwitch("login")}
          >
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
