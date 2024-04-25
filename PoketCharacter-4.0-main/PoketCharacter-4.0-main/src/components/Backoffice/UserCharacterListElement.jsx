import React from "react";
import { Row, Col } from "react-bootstrap";
import DeleteModal from "../Characters/CharacterMain/DeleteModal";
import { useNavigate } from "react-router-dom";
import { setCharacterSpecifics, setEditMode } from "../../REDUX/EditModeSlice";
import { useDispatch } from "react-redux";
export default function UserCharacterListElement(props) {
  const [modalShow, setModalShow] = React.useState(false);
  let { character, setdeletedcharacter } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!modalShow) {
      navigate(`/Character/${character.idCharacter}`);
    }
  };

  return (
    <Row className="border border-2 border-black rounded-2 mb-2 bg-dark text-white userCharacterElement p-0">
      <Col className="cursor" onClick={handleClick}>
        <Row className="p-2">
          <Col className="col-auto">
            <Row>
              <Col>
                <div className="userCharacterElementImageContainer rounded-3 border border-2 border-white">
                  <img src={character.imageSrc} alt="character image" className="" />
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="fs-5">
              <Col className="text-start col-12">{character.name}</Col>
              <Col className="text-start col-12">Lv - {character.lv}</Col>
            </Row>
          </Col>
        </Row>
        <Row></Row>
        <DeleteModal
          character={character}
          show={modalShow}
          onHide={() => setModalShow(false)}
          setdeletedcharacter={setdeletedcharacter}
        />
      </Col>
      <Col className=" col-1 d-flex flex-column justify-content-center align-items-center">
        <button className="h-50 me-1 characterElementListButtonTop" onClick={() => setModalShow(true)}>
          <i className="bi bi-trash"></i>
        </button>
        <button
          className="characterElementListButtonBottom h-50 me-1"
          onClick={() => {
            dispatch(setEditMode(true));
            dispatch(
              setCharacterSpecifics({
                idCharacter: character.idCharacter,
                imageName: character.imageName,
                Ca: character.ca,
                Tpcm: character.tpcm,
                Tpcd: character.tpcd,
                Tpci: character.tpci,
              })
            );
            navigate(`/Main`);
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
      </Col>
    </Row>
  );
}
