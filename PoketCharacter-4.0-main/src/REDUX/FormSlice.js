import { createSlice } from "@reduxjs/toolkit";

export const fromSlice = createSlice({
  name: "form",
  initialState: {
    indexValue: 1,
  },

  reducers: {
    goTo: (state, action) => {
      state.indexValue = action.payload;
    },

    nextIndex: (state) => {
      if (state.indexValue < 7) {
        state.indexValue++;
      }
    },

    prevIndex: (state) => {
      if (state.indexValue > 1) {
        state.indexValue--;
      }
    },
  },
});

export const { nextIndex, prevIndex, goTo } = fromSlice.actions;
export const formReducer = fromSlice.reducer;
