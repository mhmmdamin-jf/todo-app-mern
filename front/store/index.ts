"use client";
import authSlice from "@/slices/authSlice";
import sideBarSlice from "@/slices/sideBarSlice";
import { taskSlice } from "@/slices/taskSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    sideBarSlice: sideBarSlice,
    taskSlice: taskSlice,
  },
});
export const AppDispatch = typeof store.dispatch;
export default store;
