import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import BackgroundModal from "./BackgroundModal";
import { useDispatch } from "react-redux";
import { resetBackgroundC, setBackgroundAbilities, setBackgroundC } from "../../../REDUX/CharacterSlice";
import { nextIndex } from "../../../REDUX/FormSlice";

export default function BackgroundItem(props) {
  let back = props.back;
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetBackgroundC());
  }, []);

  const selectBackground = () => {
    dispatch(setBackgroundC(back.idBackground));
    dispatch(setBackgroundAbilities(back.skillOne));
    dispatch(setBackgroundAbilities(back.skillTwo));
    dispatch(nextIndex());
  };

  return (
    <>
      <Row key={back.idBackground} className="classContainer">
        <Col className="text-start p-2 d-flex align-items-center cursorLents" onClick={() => setModalShow(true)}>
          <div className="classIconContainer">
            <img src={`/images/BackgroundIcons/${back.name}.png`} alt="class icons" className="img-fluid iconFilter" />
          </div>
          <h5>{back.name}</h5>
        </Col>
        <Col xs={2} className="btnBackground" onClick={() => selectBackground()}>
          <i className="bi bi-caret-right-fill fs-2"></i>
        </Col>
      </Row>

      {/* ---------------BACKGROUND MODAL----------------------- */}
      <BackgroundModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        background={back}
        selectbackground={selectBackground}
      />
    </>
  );
}
