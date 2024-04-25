import React, { useEffect, useState, createContext, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CName from "./CName";
import CRace from "./CRace";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { goTo, nextIndex, prevIndex } from "../../REDUX/FormSlice";
import RaceDetails from "./RaceComponents/RaceDetails";
import CClassesList from "./Class/CClassesList";
import BackgroundsList from "./Backgrounds/BackgroundsList";
import AbilitiesList from "./AbilitiesScore/AbilitiesList";
import CheckComponent from "./Checks/CheckComponent";
import "./CharacterForm.scss";

//Componente per la creazione di un personaggio con costruzione di un form
export const CharacterForm = () => {
  //FormSlice contiene il value dell'index del form relativo al "foglio" mostrato che corrisponde ad un componente preciso
  const index = useSelector((state) => state.form.indexValue);
  // const index = 4;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);

  return (
    <>
      {/* Segnalino del numero della pagina */}
      <div className="formIndexContainer">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <React.Fragment key={num}>
            <div className={`${index === num ? "indexElementSelected flip-in-ver-left" : "indexElementNotSelected"}`}>
              {num}
            </div>
            {num < 7 && (
              <div
                className={`${
                  index === num || index === num + 1
                    ? "indexElementsSpacingSelected"
                    : "indexElementsSpacingNotSelected"
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Form con i vari componenti */}
      <form className="w-100">
        <div>
          <Container>
            {index === 1 && <CName setimagefile={setImageFile} />}
            {index === 2 && <CRace />}
            {index === 3 && <RaceDetails />}
            {index === 4 && <CClassesList />}
            {index === 5 && <BackgroundsList />}
            {index === 6 && <AbilitiesList />}
            {index === 7 && <CheckComponent imagefile={imageFile} />}
          </Container>
        </div>
        <div>
          <button
            className="backButton"
            type="button"
            onClick={() => {
              if (index == 4 || index == 3) {
                dispatch(goTo(2));
              } else if (index == 1) {
                navigate("/Characters");
              } else {
                dispatch(prevIndex());
              }
            }}
          >
            <i className="bi bi-caret-left-fill me-2"></i>Back
          </button>
        </div>
      </form>
    </>
  );
};
