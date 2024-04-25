import { createSlice } from "@reduxjs/toolkit";

export const resultSlice = createSlice({
  name: "customResults",
  initialState: {
    results: [],
    finalResults: [],
    isOpen: false,

    oldResults: [],

    typeOfTrow: null,
    colorTrow: "",
  },

  reducers: {
    fillResults: (state, action) => {
      state.results = action.payload;
    },

    fillFinalResults: (state, action) => {
      state.finalResults = action.payload;

      if (state.oldResults.length < 3) {
        state.oldResults.unshift({
          type: state.typeOfTrow,
          color: state.colorTrow,
          result: state.finalResults.value,
        });
      } else {
        state.oldResults.pop();
        state.oldResults.unshift({
          type: state.typeOfTrow,
          color: state.colorTrow,
          result: state.finalResults.value,
        });
      }
    },

    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },

    setOldResult: (state, action) => {
      if (state.oldResults.length < 2) {
        state.oldResults.unshift(action.payload);
      } else {
        state.oldResults.pop();
        state.oldResults.unshift(action.payload);
      }
    },

    setTypeOfTrow: (state, action) => {
      switch (action.payload) {
        case "customRoll":
          state.typeOfTrow = "Custom Roll";
          state.colorTrow = "text-warning";
          break;

        case "savingRoll":
          state.typeOfTrow = "Saving Trow";
          state.colorTrow = "text-success";
          break;

        case "abilityRoll":
          state.typeOfTrow = "Ability Check";
          state.colorTrow = "text-info";
          break;

        case "skillRoll":
          state.typeOfTrow = "Skill Check";
          state.colorTrow = "text-danger";
          break;

        case "initiativeRoll":
          state.typeOfTrow = "Initiative";
          state.colorTrow = "text-primary";
          break;

        case "attackRoll":
          state.typeOfTrow = "Attack Trow";
          state.colorTrow = "text-danger";
          break;

        case "spellRoll":
          state.typeOfTrow = "Spell Trow";
          state.colorTrow = "text-info";
          break;

        default:
          break;
      }
    },
  },
});

export const { fillResults, fillFinalResults, setIsOpen, setOldResult, setTypeOfTrow } = resultSlice.actions;
export const resultReducer = resultSlice.reducer;
