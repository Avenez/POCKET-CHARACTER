import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { rollDice } from "../../App";
import { setIsOpen, setTypeOfTrow } from "../../REDUX/ResultSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserProfileData(props) {
  const { user } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState("");
  const [colorSaved, setColorSaved] = useState(false);
  const [colorReset, setColorReset] = useState(false);

  useEffect(() => {
    // Recupera il colore dal localStorage quando il componente viene montato
    const diceColorSelected = localStorage.getItem("diceColor");
    setColor(diceColorSelected || ""); // Imposta il colore sul valore recuperato o stringa vuota se non presente
  }, []);

  const handleColor = () => {
    localStorage.setItem("diceColor", color);
    setColorSaved(true);
    setTimeout(() => {
      setColorSaved(false);
    }, 2000);
    window.location.reload();
  };

  const handleReset = () => {
    localStorage.setItem("diceColor", "#686868");
    setColor("#686868");
    setColorReset(true);
    setTimeout(() => {
      setColorReset(false);
    }, 2000);
    window.location.reload();
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const tryDices = () => {
    rollDice(`1d20+1d12+1d10+1d8+1d6+1d4`);
    dispatch(setTypeOfTrow("customRoll"));
    setTimeout(() => {
      dispatch(setIsOpen(false));
    }, 6000);
  };

  return (
    <Col className="mb-3 flip-in-ver-right">
      <Row className="border border-2 border-dark rounded-2 p-3">
        <Col>
          <Row className="bg-dark text-bg-dark pt-2 mb-3">
            <Col className="">
              <h5 className="text-start">YOUR DATA</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => {
                    props.seteditmode(true);
                  }}
                >
                  <i className="bi bi-pencil-square me-1"></i> Edit
                </button>
              </div>
            </Col>
          </Row>
          <Row className="text-start mb-2">
            <Col>
              <h6>Username</h6>
              <p>{user.username}</p>
            </Col>
          </Row>
          <Row className="text-start mb-2">
            <Col>
              <h6>Email</h6>
              <p>{user.email}</p>
            </Col>
          </Row>
          <Row className="text-start mb-2">
            <Col>
              <h6>Password</h6>
              <p>{user.password}</p>
            </Col>
          </Row>

          <Row className="mt-3 text-start">
            <Col>
              <Row>
                <Col>
                  <h5>Dices Color</h5>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-start align-items-center">
                  <input
                    type="color"
                    className="me-3 cursor"
                    style={{ width: "100%" }}
                    value={color}
                    onChange={handleColorChange}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col className="d-flex justify-content-center align-items-center">
                  {colorSaved ? (
                    <button className="btn btn-success me-1">
                      <i className="bi bi-check-lg me-2"></i>Saved{" "}
                    </button>
                  ) : (
                    <button className="btn btn-warning me-1" onClick={handleColor}>
                      <i className="bi bi-floppy-fill me-2"></i>Save{" "}
                    </button>
                  )}
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                  {colorReset ? (
                    <button className="btn btn-success me-1">
                      <i className="bi bi-check-lg me-2"></i>Saved
                    </button>
                  ) : (
                    <button className="btn btn-secondary me-1" onClick={handleReset}>
                      <i className="bi bi-arrow-counterclockwise me-2"></i>Reset
                    </button>
                  )}
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                  <button className="btn btn-dark me-1" onClick={tryDices}>
                    <img src="\images\d20.png" alt="d20" className="diceIconHome me-2" />
                    Try
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}
