import { createSlice } from "@reduxjs/toolkit";

export const editModeSlice = createSlice({
  name: "form",
  initialState: {
    editMode: false,
    characterSpecifics: {
      idCharacter: 0,
      imageName: "",
      Ca: 10,
      Tpcm: 0,
      Tpcd: 0,
      Tpci: 0,
    },
  },

  reducers: {
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },

    setCharacterSpecifics: (state, action) => {
      state.characterSpecifics = action.payload;
    },

    resetCharacterSpecifics: (state) => {
      state.characterSpecifics = {
        idCharacter: 0,
        imageName: "",
        Ca: 10,
        Tpcm: 0,
        Tpcd: 0,
        Tpci: 0,
      };
    },
  },
});

export const { setEditMode, setCharacterSpecifics, resetCharacterSpecifics } = editModeSlice.actions;
export const editModeReducer = editModeSlice.reducer;
