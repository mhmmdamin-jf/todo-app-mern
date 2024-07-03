"use client";
import { fetcher, poster } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface authSliceProps {
  formType: string;
  isLoggedIn: boolean;
  userData: any;
  error: string | null;
  showSnakBar: boolean;
  snackbarText: string | null;
}
const initialAuthSlice: authSliceProps = {
  formType: "register",
  isLoggedIn: false,
  userData: {},
  error: null,
  showSnakBar: true,
  snackbarText: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthSlice,
  reducers: {
    setFormType(state, action) {
      state.formType = action.payload;
    },
    setShowSnackbar(state, action) {
      state.showSnakBar = true;
      state.snackbarText = action.payload;
    },
    setCloseSnackbar(state) {
      state.showSnakBar = false;
      state.snackbarText = null;
    },
    setSnackbarText(state, action) {
      state.snackbarText = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.error = "cant post data.";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload;
      })
      .addCase(signInUser.pending, (state, action) => {
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = "cant get data.";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userData = action.payload;
      }),
});

export const signUpUser = createAsyncThunk(
  "authSlice/signUp",
  async (formData: any) => {
    console.log(formData);

    const signUpResault = await axios.post(
      `http://127.0.0.1:3002/api/auth/register`,
      formData,
      { withCredentials: true }
    );
    console.log(signUpResault);
    return signUpResault?.data.user;
  }
);

export const signInUser = createAsyncThunk(
  "authSlice/SignIn",
  async (formData: any) => {
    // const loginResault = await fetcher({
    //   url: "http://127.0.0.1:3002/api/auth/login",
    //   data: formData,
    // });
    const loginResault = await axios.get(
      `http://127.0.0.1:3002/api/auth/login?userName=${formData.userName}&password=${formData.password}`,
      { withCredentials: true }
    );
    console.log(loginResault);
    return loginResault?.data.user;
  }
);

export default authSlice.reducer;
export const {
  setFormType,
  setShowSnackbar,
  setCloseSnackbar,
  setSnackbarText,
} = authSlice.actions;
