import { configureStore } from "@reduxjs/toolkit";
import { dicesReducer } from "./DicesSlice";
import { resultReducer } from "./ResultSlice";
import { registrationReducer } from "./RegistrationSlice";
import { characterReducer } from "./CharacterSlice";
import { formReducer } from "./FormSlice";
import { editModeReducer } from "./EditModeSlice";
import { notificationsReducer } from "./NotificationsSlice";

export default configureStore({
  reducer: {
    dices: dicesReducer,
    customResults: resultReducer,
    registration: registrationReducer,
    character: characterReducer,
    form: formReducer,
    editMode: editModeReducer,
    notifications: notificationsReducer,
  },
});
