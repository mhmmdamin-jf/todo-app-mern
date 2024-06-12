import { fetcher } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type sideBarSliceType = {
  showLeft: boolean;
  currentItem: string;
  showRight: boolean;
  items: [string] | [];
  error: string | null;
};

const sideBarSliceInitialData: sideBarSliceType = {
  showLeft: false,
  currentItem: "today",
  showRight: false,
  error: null,
  items: [],
};

const sideBarRdeucer = createSlice({
  name: "sideBarReducer",
  initialState: sideBarSliceInitialData,
  reducers: {
    toggleShowSideBarLeft(state) {
      state.showLeft = !state.showLeft;
      state.showRight = false;
    },
    toggleShowSideBarRight(state) {
      state.showRight = !state.showRight;
      state.showLeft = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getLeftSideBarItems.pending, (state) => {
        state.error = null;
      })
      .addCase(getLeftSideBarItems.rejected, (state) => {
        state.error = "can not get items.";
        state.items = [];
      })
      .addCase(getLeftSideBarItems.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const getLeftSideBarItems = createAsyncThunk(
  "sideBarReducer/getLeftSideBarItems",
  async () => {
    const items = await fetcher({
      url: "http://127.0.0.1:3002/api/todo/categories",
    });
    //cors issue
    // return items.data.map((item: any) => {
    //   return { title: item.title, href: item.href };
    // });
    return [
      { title: "today", href: "/tasks/today" },
      { title: "importance", href: "/tasks/importance" },
      { title: "tasks", href: "/tasks/tasks" },
    ];
  }
);

export default sideBarRdeucer.reducer;
export const { toggleShowSideBarLeft, toggleShowSideBarRight } =
  sideBarRdeucer.actions;
