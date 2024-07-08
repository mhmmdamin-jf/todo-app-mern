import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface TaskDataProps {
  tasks: any;
  error: null | Error;
  showTasks: "Grid" | "List";
}
const initalTaskData: TaskDataProps = {
  tasks: [],
  error: null,
  showTasks: "Grid",
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState: initalTaskData,
  reducers: {
    setShowTaskGrid(state) {
      state.showTasks = "Grid";
    },
    setShowTaskList(state) {
      state.showTasks = "List";
    },
  },
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
      })
      .addCase(getTasks.pending, (state) => {
        state.error = null;
      })
      .addCase(getTasks.rejected, (state) => {
        state.error = new Error("cannot get tasks.");
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(searchTasks.pending, (state) => {
        state.tasks = null;
        state.error = null;
      })
      .addCase(searchTasks.rejected, (state) => {
        state.error = new Error("cannot find tasks.");
        state.tasks = null;
      })
      .addCase(searchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export const addTask = createAsyncThunk(
  "postTask/taskSlice",
  async ({ values }: { values: any }) => {
    values.dueDate = new Date(values.dueDate);
    const postResautl = await axios.post(
      `http://127.0.0.1:3002/api/todo?sort=dueDate`,
      values,
      {
        withCredentials: true,
      }
    );
    queryClient?.invalidateQueries({ queryKey: ["tasks"] });
    return postResautl.data;
  }
);

export const getTasks = createAsyncThunk(
  "fetchToday/taskSlice",
  async ({ category = "today" }: { category: string }) => {
    const todayTasks = await axios.get(`http://127.0.0.1:3002/api/todo`, {
      withCredentials: true,
    });
    return todayTasks?.data?.data;
  }
);

export const searchTasks = createAsyncThunk(
  "searchTasks/taskSlice",
  async ({ title }: { title: string }) => {
    const exitingTasks = await axios.get(
      `http://127.0.0.1:3002/api/todo?title=${title}`,
      { withCredentials: true }
    );
    return exitingTasks?.data?.data;
  }
);

export default taskSlice.reducer;
export const { setShowTaskGrid, setShowTaskList } = taskSlice.actions;
