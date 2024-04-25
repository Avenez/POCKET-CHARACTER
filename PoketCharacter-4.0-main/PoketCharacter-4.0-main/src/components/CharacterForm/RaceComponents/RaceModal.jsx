import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setRace, setSubRace } from "../../../REDUX/CharacterSlice";
import { goTo, nextIndex } from "../../../REDUX/FormSlice";

//Componente dinamico per mostare i campi disponibili o meno in funzione della loro presenza
export default function RaceModal(props) {
  //Salvo le proprietà e controllo se c'è una sottorazza da mostrare
  let racename = props.racename;
  let race = props.race;
  let subRaceObj = null;
  if (props.subrace != null) {
    subRaceObj = props.subrace;
  }

  const dispatch = useDispatch();

  //Seleziono la razza e la sottorazza aggiornando lo stato redux e passsando alla pagina successiva del form
  const choseRace = () => {
    dispatch(setRace(race.index));
    if (subRaceObj != null) {
      dispatch(setSubRace(subRaceObj.index));
    } else {
      dispatch(setSubRace("none"));
    }

    dispatch(nextIndex());
  };

  return (
    //Modale di React Bootstrap con parti dinamiche in base al contenuto dell'oggetto
    <Modal {...props} size="lg" aria-labelledby="race-modal" centered>
      <Modal.Header className="bg-secondary-red text-white">
        <Modal.Title id="race-modal">{racename}</Modal.Title>
        <i className="bi bi-x-lg cursor fw-bold" onClick={props.onHide}></i>
      </Modal.Header>
      <Modal.Body>
        {/* -------DESCRIZIONE----------- */}
        <h5>Description</h5>
        <p>{race.alignment}</p>

        {/* -------ETA----------- */}
        <h5 className="mt-2">Age</h5>
        <p>{race.age}</p>

        {/* -------TAGLIA----------- */}
        <h5 className="mt-2">Size</h5>
        <p>{race.size_description}</p>

        {/* -------PROFICIENCIES DI BASE RAZZA----------- */}
        {/* -------RENDERIZZATO SOLO SE PRESENTE ----------- */}
        {race.starting_proficiencies.length > 0 ? (
          <>
            <h5 className="mt-2">Starting Race Proficiencies</h5>
            <ul>
              {race.starting_proficiencies.map((prof) => (
                <li key={prof.index}>{prof.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}

        {/* -------PROFICIENCIES DI BASE SOTTORAZZA----------- */}
        {/* -------RENDERIZZATO SOLO SE PRESENTE ----------- */}
        {subRaceObj != null && subRaceObj.starting_proficiencies.length > 0 ? (
          <>
            <h5 className="mt-2">Starting Sub Race Proficiencies</h5>
            <ul>
              {subRaceObj.starting_proficiencies.map((prof) => (
                <li key={prof.index}>{prof.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}

        {/* -------LINGUAGGI----------- */}
        <h5 className="mt-2">Languages</h5>
        <p>{race.language_desc}</p>
        <ul>
          {race.languages.map((lang) => (
            <li key={lang.index}>{lang.name}</li>
          ))}
        </ul>

        {/* -------TRATTI RAZZA ----------- */}
        {/* -------RENDERIZZATO SOLO SE PRESENTE ----------- */}
        {race.traits.length > 0 ? (
          <>
            <h5 className="mt-2">Traits</h5>
            <ul>
              {race.traits.map((trait) => (
                <li key={trait.index}>{trait.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="btn btn-dark me-auto">
          Close
        </Button>
        <button onClick={() => choseRace()} className="btn btn-outline-danger">
          Select
          <i className="bi bi-check2 ms-2"></i>
        </button>
      </Modal.Footer>
    </Modal>
  );
}
