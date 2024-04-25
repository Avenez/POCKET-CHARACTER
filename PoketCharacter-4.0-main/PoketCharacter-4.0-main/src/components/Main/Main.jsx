import { Link } from "react-router-dom";
import DiceSideMenu from "../DiceSideMenu/DiceSideMenu";
import { CustomResults } from "../Results/CustomResults";
import { useEffect } from "react";
import useCheckLoginCookie from "../../hooks/checkLoginCookie";
import { CharacterForm } from "../CharacterForm/CharacterForm";
import { useDispatch } from "react-redux";
import { resetCharacterSpecifics, setEditMode } from "../../REDUX/EditModeSlice";

export const Main = () => {
  useCheckLoginCookie("Main");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEditMode(false));
    dispatch(resetCharacterSpecifics());
  }, []);

  return (
    <>
      <CharacterForm />
      <div className="h-100 w-100">
        {/* <CustomResults />
        <DiceSideMenu /> */}
      </div>
    </>
  );
};
