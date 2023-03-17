import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { setMessage } from "./message";

import AuthService from "../services/auth.services";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, phone, password, password_confirmation }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        name,
        email,
        phone,
        password,
        password_confirmation
      );

      //   thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      //   const message =
      //     (error.response &&
      //       error.response.data &&
      //       error.response.data.message) ||
      //     error.message ||
      //     error.toString();
      //   thunkAPI.dispatch(setMessage(message));
      //   return thunkAPI.rejectWithValue();
      console.log("register message error");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      console.log("login dispatch ");
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      //   const message =
      //     (error.response &&
      //       error.response.data &&
      //       error.response.data.message) ||
      //     error.message ||
      //     error.toString();
      //   thunkAPI.dispatch(setMessage(message));
      //   return thunkAPI.rejectWithValue();
      console.log("login error message");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      console.log("register fullfiled");
      console.log(action.payload);
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [register.rejected]: (state, action) => {
      console.log("check rejected");
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
