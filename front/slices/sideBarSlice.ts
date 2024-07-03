import { fetcher } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type sideBarSliceType = {
  showLeft: boolean;
  currentItem: string;
  showRight: boolean;
  showFeedBack: boolean;
  items: [string] | [];
  error: string | null;
  activeTaskShow: "grid" | "list";
};

const sideBarSliceInitialData: sideBarSliceType = {
  showLeft: false,
  currentItem: "today",
  showRight: false,
  showFeedBack: false,
  error: null,
  items: [],
  activeTaskShow: "list",
};

const sideBarRdeucer = createSlice({
  name: "sideBarReducer",
  initialState: sideBarSliceInitialData,
  reducers: {
    toggleShowSideBarLeft(state) {
      state.showLeft = !state.showLeft;
      state.showRight = false;
      state.showFeedBack = false;
    },
    toggleShowSideBarRight(state) {
      state.showRight = !state.showRight;
      state.showLeft = false;
      state.showFeedBack = false;
    },
    toggleShowSideBarFeedBack(state) {
      state.showRight = false;
      state.showLeft = false;
      state.showFeedBack = true;
    },
    setShowTasksList(state) {
      state.activeTaskShow = "list";
    },
    setShowTasksGrid(state) {
      state.activeTaskShow = "grid";
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
        state.items = action.payload as [string] | [];
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
    return [{ title: "tasks", href: "/tasks/tasks" }];
  }
);

export default sideBarRdeucer.reducer;
export const {
  toggleShowSideBarLeft,
  toggleShowSideBarRight,
  toggleShowSideBarFeedBack,
} = sideBarRdeucer.actions;
