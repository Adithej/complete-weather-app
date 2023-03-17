import axios from "axios";

const API_LOGIN = "https://apingweb.com/api/login";
const API_SIGNUP = "https://apingweb.com/api/register";

const register = (name, email, phone, password, password_confirmation) => {
  return axios.post(API_SIGNUP, {
    name,
    email,
    phone,
    password,
    password_confirmation,
  });
};

const login = async (email, password) => {
  const response = await axios.post(API_LOGIN, {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
