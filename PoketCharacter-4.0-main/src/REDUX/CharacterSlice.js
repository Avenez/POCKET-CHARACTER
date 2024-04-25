import { createSlice } from "@reduxjs/toolkit";

export const CharacterSlice = createSlice({
  name: "character",

  initialState: {
    raceStats: [],
    raceAbilities: [],
    backgroundAbilities: [],
    classAbilities: [],

    character: {
      idUser: null,
      ImageName: null,
      Name: "",
      Race: "",
      RaceType: "",
      SubRace: "",
      Lv: 1,
      BC: "",
      Background: "",
      Class: "",
      SubClass: "",
      SubClassType: "",
      FightingStyle: "",
      STR: 0,
      DEX: 0,
      CON: 0,
      INT: 0,
      WIS: 0,
      CHA: 0,
      CA: 10,
      TPCM: 0,
      TPCD: 0,
      TPCI: 0,
      ToolProf: [],
      AbilitiesProf: [],
      AbilitiesMastery: [],
      SavingProf: [],
      visible: true,
    },
  },

  reducers: {
    resetState: (state) => {
      return {
        raceStats: [],
        raceAbilities: [],
        backgroundAbilities: [],
        classAbilities: [],
        character: {
          idUser: null,
          Name: "",
          Race: "",
          RaceType: "",
          SubRace: "",
          Lv: 1,
          BC: 2,
          Background: "",
          Class: "",
          SubClass: "",
          SubClassType: "",
          FightingStyle: "",
          STR: 0,
          DEX: 0,
          CON: 0,
          INT: 0,
          WIS: 0,
          CHA: 0,
          CA: 10,
          TPCM: 0,
          TPCD: 0,
          TPCI: 0,
          ToolProf: [],
          AbilitiesProf: [],
          AbilitiesMastery: [],
          SavingProf: [],
          visible: true,
        },
      };
    },

    setIdUser: (state, action) => {
      state.character.idUser = action.payload;
    },

    //-------CHARACTER IMAGE
    setImageName: (state, action) => {
      state.character.ImageName = action.payload;
    },

    setImageFile: (state, action) => {
      state.character.ImageFile = action.payload;
    },

    resetImageName: (state) => {
      state.character.ImageName = null;
    },

    resetImageFile: (state) => {
      state.character.ImageFile = null;
    },

    //--------------------------
    //---------CHARACTER NAME
    setName: (state, action) => {
      state.character.Name = action.payload;
    },

    resetName: (state) => {
      state.character.Name = "";
    },

    //-----------------------

    setRace: (state, action) => {
      state.character.Race = action.payload;
    },

    setRaceType: (state, action) => {
      state.character.RaceType = action.payload;
    },

    setSubRace: (state, action) => {
      state.character.SubRace = action.payload;
    },

    setLv: (state, action) => {
      state.character.Lv = action.payload;
    },

    setBc: (state, action) => {
      if (action.payload <= 4) {
        state.character.BC = 2;
      } else if (action.payload >= 5 && action.payload <= 8) {
        state.character.BC = 3;
      } else if (action.payload >= 9 && action.payload <= 12) {
        state.character.BC = 4;
      }
    },

    // -----------------BACKGROUND--------------
    setBackgroundC: (state, action) => {
      state.character.Background = action.payload;
    },

    resetBackgroundC: (state) => {
      state.character.Background = "";
    },

    //--------------------------------------------
    setClassC: (state, action) => {
      state.character.Class = action.payload;
    },

    setSubClassC: (state, action) => {
      state.character.SubClass = action.payload;
    },

    setSubClassTypeC: (state, action) => {
      state.character.SubClassType = action.payload;
    },

    resetSubClassType: (state) => {
      state.character.SubClassType = "";
    },

    //-----------------FIGHTING STYLE---------------

    setFightingStyle: (state, action) => {
      let choice = action.payload;
      if (choice !== "NO") {
        state.character.FightingStyle = choice;
      }
    },

    resetFightingStyle: (state) => {
      state.character.FightingStyle = "";
    },

    //------------------SET RACE STATS--------------

    setRaceStats: (state, action) => {
      state.raceStats.push(action.payload);
      // = [...state.raceStats, action.payload];
    },

    resetRaceStats: (state) => {
      state.raceStats = [];
    },

    //----------------RESET STATS-------------------

    resetCharacterStats: (state) => {
      state.character = {
        ...state.character,
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0,
      };
    },
    //----------------------------------------------
    //--------------RESET RACE----------------------
    resetCharacterRace: (state) => {
      state.character = {
        ...state.character,
        Race: "",
        RaceType: "",
        SubRace: "",
      };
    },

    setRaceBonus: (state, action) => {
      const { type, value } = action.payload;
      switch (type) {
        case "STR":
          state.character.STR = value;
          break;
        case "DEX":
          state.character.DEX = value;
          break;
        case "CON":
          state.character.CON = value;
          break;
        case "INT":
          state.character.INT = value;
          break;
        case "WIS":
          state.character.WIS = value;
          break;
        case "CHA":
          state.character.CHA = value;
          break;

        case "STR+":
          state.character.STR += value;
          break;
        case "DEX+":
          state.character.DEX += value;
          break;
        case "CON+":
          state.character.CON += value;
          break;
        case "INT+":
          state.character.INT += value;
          break;
        case "WIS+":
          state.character.WIS += value;
          break;
        case "CHA+":
          state.character.CHA += value;
          break;
        default:
          break;
      }
    },

    setStr: (state, action) => {
      state.character.STR = action.payload;
    },

    setDex: (state, action) => {
      state.character.DEX = action.payload;
    },

    setCon: (state, action) => {
      state.character.CON = action.payload;
    },

    setInt: (state, action) => {
      state.character.INT = action.payload;
    },

    setWis: (state, action) => {
      state.character.WIS = action.payload;
    },

    setCha: (state, action) => {
      state.character.CHA = action.payload;
    },

    setCa: (state, action) => {
      state.character.CA = action.payload;
    },

    resetToolProf: (state) => {
      state.character.ToolProf = [];
    },

    setToolProf: (state, action) => {
      state.character.ToolProf = [...state.character.toolProf, action.payload];
    },

    addToolProf: (state, action) => {
      const newTool = action.payload;
      if (!state.character.ToolProf.includes(newTool)) {
        state.character.ToolProf.push(newTool);
      }
    },

    // ---------Reducers per gli array di composizione di quello primario

    resetBackgroundAbilities: (state) => {
      state.backgroundAbilities = [];
    },

    resetClassAbilities: (state) => {
      state.classAbilities = [];
    },

    resetRaceAbilities: (state) => {
      state.raceAbilities = [];
    },

    setBackgroundAbilities: (state, action) => {
      state.backgroundAbilities = [...state.backgroundAbilities, action.payload];
    },

    setClassAbilities: (state, action) => {
      state.classAbilities = action.payload;
    },

    setRaceAbilities: (state, action) => {
      if (!state.raceAbilities.includes(action.payload)) {
        state.raceAbilities = [...state.raceAbilities, action.payload];
      }
    },

    // ----------------------------------------------------------------------
    // -------------- Reducerer che crea l'array dagli altri due ------------

    setAbilitiesProf: (state) => {
      let newArrayToAdd = [...state.classAbilities, ...state.backgroundAbilities, ...state.raceAbilities];
      state.character.AbilitiesProf = Array.from(new Set(newArrayToAdd));
    },
    //------------------------------------------------------------------------
    setAbilitiesMastery: (state, action) => {
      const abilityToAdd = action.payload;
      if (!state.character.AbilitiesMastery.includes(abilityToAdd)) {
        state.character.AbilitiesMastery = [...state.character.AbilitiesMastery, abilityToAdd];
      }
    },

    resetAbilitiesMastery: (state) => {
      state.character.AbilitiesMastery = [];
    },

    //------------------------------------------------------------------------

    setSavingProf: (state, action) => {
      const abilityToAdd = action.payload;
      if (!state.character.SavingProf.includes(abilityToAdd)) {
        state.character.SavingProf = [...state.character.SavingProf, abilityToAdd];
      }
    },

    resetSavingProf: (state) => {
      state.character.SavingProf = [];
    },

    //-------------------------------------------------------------------------

    setVisible: (state, action) => {
      state.character.visible = action.payload;
    },
  },
});

export const {
  setIdUser,
  setImageName,
  setImageFile,
  setName,
  setRace,
  setRaceType,
  setSubRace,
  setLv,
  setBc,
  setBackgroundC,
  setClassC,
  setSubClassC,
  setSubClassTypeC,
  setFightingStyle,
  setRaceBonus,
  setStr,
  setDex,
  setCon,
  setInt,
  setWis,
  setCha,
  setCa,
  setRaceStats,
  resetRaceStats,
  setToolProf,
  addToolProf,
  resetName,
  resetImageName,
  resetImageFile,
  resetFightingStyle,
  resetSubClassType,
  resetBackgroundC,
  resetToolProf,
  resetState,
  resetSavingProf,
  resetCharacterStats,
  resetCharacterRace,
  resetBackgroundAbilities,
  resetClassAbilities,
  resetAbilitiesMastery,
  resetRaceAbilities,
  setClassAbilities,
  setBackgroundAbilities,
  setRaceAbilities,
  setAbilitiesProf,
  setAbilitiesMastery,
  setSavingProf,
  setVisible,
} = CharacterSlice.actions;

export const characterReducer = CharacterSlice.reducer;
