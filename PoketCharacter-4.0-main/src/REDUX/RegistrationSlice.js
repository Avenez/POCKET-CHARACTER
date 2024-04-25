import { createSlice } from "@reduxjs/toolkit";

export const registrationSlice = createSlice({
  name: "registration",

  initialState: {
    usernameCheck: null,
    emailCheck: null,
  },

  reducers: {
    setUsernameCheck: (state, action) => {
      state.usernameCheck = action.payload;
    },

    setEmailCheck: (state, action) => {
      state.emailCheck = action.payload;
    },
  },
});

export const { setUsernameCheck, setEmailCheck } = registrationSlice.actions;

// Azione asincrona per controllare l'esistenza del nome utente
export const checkUsernameAsync = (username) => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:44305/api/User/Checkusername/${username}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Errore nella chiamata API");
    }

    const data = await response.json();
    dispatch(setUsernameCheck(data)); // Assume che il backend restituisca true/false
  } catch (error) {
    console.error("Errore durante la verifica del nome utente:", error);
  }
};

//Azione per controllare l'esistenza dell'email
export const checkEmailAsync = (email) => async (dispatch) => {
  try {
    //const url = `https://localhost:44305/api/User/Checkemail/${email}`;
    const response = await fetch(`https://localhost:44305/api/User/Checkemail/${email}`, {
      mode: "no-cors",
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Errore durante la chiamata API");
    }
    const data = await response.json();
    dispatch(setEmailCheck(data));
  } catch (error) {
    console.error("Errore durante la verifica della email", error);
  }
};

export const registrationReducer = registrationSlice.reducer;
