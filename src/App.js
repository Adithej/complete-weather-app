import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = (props) => {
  // const [currentForm, setCurrentForm] = useState("login");
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return <RouterProvider router={router} />;
};

export default App;
