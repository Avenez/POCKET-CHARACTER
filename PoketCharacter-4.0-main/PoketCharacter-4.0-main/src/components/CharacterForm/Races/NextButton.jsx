import React from "react";
import { useDispatch } from "react-redux";
import { nextIndex } from "../../../REDUX/FormSlice";
export default function NextButton() {
  const dispatch = useDispatch();
  return (
    <button className="nextButton" type="button" onClick={() => dispatch(nextIndex())}>
      Next <i className="bi bi-caret-right-fill ms-2"></i>
    </button>
  );
}
