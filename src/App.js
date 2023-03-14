import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/auth";

const App = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const [authTokens, setAuthTokens] = useState();

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Routes>
        {currentForm === "login" ? (
          <Route path="/login" element={<Login onFormSwitch={toggleForm} />}>
            {" "}
          </Route>
        ) : (
          <Route
            path="/register"
            element={<Register onFormSwitch={toggleForm} />}
          ></Route>
        )}
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
