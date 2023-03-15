import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ProtectedLayout } from "./components/ProtectedLayout";
// import { HomeLayout } from "./components/HomeLayout";
import { AuthLayout } from "./components/AuthLayout";

// ideally this would be an API call to server to get logged in user data

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 2000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Route>
  )
);
