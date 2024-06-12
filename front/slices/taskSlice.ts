import { fetcher, poster } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  async (formData: any) => {
    const postResautl = await poster(
      `${process.env.serverHostName}/todo`,
      formData
    );
    return postResautl;
  }
);

export const getTasks = createAsyncThunk(
  "fetchToday/taskSlice",
  async ({ category = "today" }: { category: string }) => {
    const todayTasks = await fetcher({
      url: `http://127.0.0.1:3002/api/todo/${category}`,
    });
    console.log(todayTasks);
    return todayTasks;
  }
);

export default taskSlice.reducer;
