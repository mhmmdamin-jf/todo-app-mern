"use client";
import { fetcher, poster } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface authSliceProps {
  formType: string;
  isLoggedIn: boolean;
  userData: any;
  error: string | null;
}
const initialAuthSlice: authSliceProps = {
  formType: "register",
  isLoggedIn: false,
  userData: {},
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthSlice,
  reducers: {
    setFormType(state, action) {
      state.formType = action.payload;
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
        state.isLoggedIn = false;
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
    const signUpResault = await poster({
      url: `${process.env.serverHostName}/auth/register`,
      data: formData,
    });
    return signUpResault;
  }
);

export const signInUser = createAsyncThunk(
  "authSlice/SignIn",
  async (formData: any) => {
    const loginResault = await fetcher({
      url: "http://127.0.0.1:3002/api/auth/login",
      data: formData,
    });
    return loginResault?.data.user;
  }
);

export default authSlice.reducer;
export const { setFormType } = authSlice.actions;
