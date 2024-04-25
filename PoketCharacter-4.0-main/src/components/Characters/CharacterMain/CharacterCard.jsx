import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import "./CharacterMain.scss";
import { useDispatch } from "react-redux";
import { setCharacterSpecifics, setEditMode } from "../../../REDUX/EditModeSlice";
import Dropdown from "react-bootstrap/Dropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function CharacterCard(props) {
  let character = props.character;
  const [modalShow, setModalShow] = React.useState(false);
  let setdeletedcharacter = props.setdeletedcharacter;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props}
    </Tooltip>
  );

  return (
    <>
      <Col className="d-flex justify-content-center">
        <div className="second hero">
          <a
            className="cursor"
            onClick={() => {
              navigate(`/Character/${character.idCharacter}`);
            }}
          >
            <img className="hero-profile-img" src={character.imageSrc} />
            <div className="hero-description-bk"></div>
            <div className="hero-logo">
              <img src={`/images/ClassesIcons/${character.class.substring(13)}.png`} alt="Class Icon" />
            </div>
            <div className="hero-description">
              <p>{character.name}</p>
              <p className="text-start">Lv {character.lv}</p>
            </div>
          </a>
          <div className="hero-btn">
            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic" drop="down-centered"></Dropdown.Toggle>

              <Dropdown.Menu className="p-2 ps-3 bg-dark">
                <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip("Delete")}>
                  <i
                    className="bi bi-trash btn btn-outline-danger fw-bold border-0 fs-3"
                    onClick={() => setModalShow(true)}
                  ></i>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("Edit")}
                  name={"Edit"}
                >
                  <i
                    className="bi bi-pencil-square btn btn-outline-warning fw-bold border-0 fs-3 ms-4"
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
                  ></i>
                </OverlayTrigger>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Col>

      <DeleteModal
        character={character}
        show={modalShow}
        onHide={() => setModalShow(false)}
        setdeletedcharacter={setdeletedcharacter}
      />
    </>
  );
}
