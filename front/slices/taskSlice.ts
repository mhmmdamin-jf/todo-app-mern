import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useCookies } from "react-cookie";
interface TaskDataProps {
  tasks: any;
  error: null | Error;
}
const initalTaskData: TaskDataProps = { tasks: [], error: null };

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: initalTaskData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.error = null;
      })
      .addCase(addTask.rejected, (state) => {
        state.error = new Error("post tasks failed.");
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.error = null;
      });
  },
});

export const addTask = createAsyncThunk(
  "postTask/taskSlice",
  async ({ values }: { values: any }) => {
    values.dueDate = new Date(values.dueDate);
    const postResautl = await axios.post(
      `http://127.0.0.1:3002/api/todo`,
      values,
      {
        withCredentials: true,
        // headers: {
        //   Cookie: `jwt=${jwt}`,
        // },
      }
    );
    console.log(
      12121212121212,
      postResautl.headers,
      postResautl.config,
      postResautl.request
    );
    return postResautl.data;
  }
);

export const getTasks = createAsyncThunk(
  "fetchToday/taskSlice",
  async ({ category = "today" }: { category: string }) => {
    const todayTasks = await axios.get(
      `http://127.0.0.1:3002/api/todo/${category}`,
      {
        withCredentials: true,
      }
    );
    return todayTasks?.data?.data;
  }
);

export default taskSlice.reducer;
