import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = () => {
  // const [currentForm, setCurrentForm] = useState("login");
  const [authTokens, setAuthTokens] = useState();

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const setTokens = (data) => {
  //   localStorage.setItem("tokens", JSON.stringify(data));
  //   setAuthTokens(data);
  // };

  return <RouterProvider router={router} />;
};

export default App;
