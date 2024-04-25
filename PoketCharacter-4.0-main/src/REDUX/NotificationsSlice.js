import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    userDelete: false,
    userUpdated: false,
    userCharacterDelete: false,
  },

  reducers: {
    setUserDelete(state, action) {
      state.userDelete = action.payload;
    },

    setUserUpdated(state, action) {
      state.userUpdated = action.payload;
    },

    setUserCharacterDelete(state, action) {
      state.userCharacterDelete = action.payload;
    },
  },
});

export const { setUserDelete, setUserUpdated, setUserCharacterDelete } = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
