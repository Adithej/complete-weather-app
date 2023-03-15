import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = (props) => {
  // const [currentForm, setCurrentForm] = useState("login");
  const [authTokens, setAuthTokens] = useState();

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return <RouterProvider router={router} />;
};

export default App;
