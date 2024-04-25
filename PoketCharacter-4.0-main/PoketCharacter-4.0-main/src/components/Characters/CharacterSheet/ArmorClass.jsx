import React from "react";
import { Row, Col } from "react-bootstrap";
import { rollDice } from "../../../App";
import { setIsOpen, setTypeOfTrow } from "../../../REDUX/ResultSlice";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";

export default function ArmorClass(props) {
  let { character, modify, handlechange, characterspecifics } = props;

  const dispatch = useDispatch();

  const modifierCalc = (value) => {
    let mod = 0;

    if (value >= 12 && value <= 13) {
      mod = 1;
    } else if (value >= 14 && value <= 15) {
      mod = 2;
    } else if (value >= 16 && value <= 17) {
      mod = 3;
    } else if (value >= 18 && value <= 19) {
      mod = 4;
    } else if (value >= 20 && value <= 21) {
      mod = 5;
    }

    return mod;
  };

  const armorClassValue = (characterObj) => {
    let ca = characterObj.CA + modifierCalc(characterObj.DEX);

    const className = characterObj.Class.toLowerCase(); // Converti il nome della classe in minuscolo per una corrispondenza non case-sensitive

    if (className.endsWith("monk")) {
      ca += modifierCalc(characterObj.WIS);
    } else if (className.endsWith("barbarian")) {
      ca += modifierCalc(characterObj.CON);
    } else if (className.endsWith("sorcerer")) {
      ca += 3;
    }

    return ca;
  };

  const speedValue = (characterObj) => {
    const className = characterObj.Class.toLowerCase();
    let speed = 9;

    if (className.endsWith("monk")) {
      if (characterObj.Lv >= 2 && characterObj.Lv <= 5) {
        speed += 3;
      } else if (characterObj.Lv >= 6 && characterObj.Lv <= 9) {
        speed += 4.5;
      } else if (characterObj.Lv >= 10) {
        speed += 6;
      }
    } else if (className.endsWith("barbarian")) {
      if (characterObj.Lv >= 5) {
        speed += 3;
      }
    }

    return speed;
  };

  return (
    <>
      <Row className="p-2 pt-0 fw-bold">
        <Col className="border border-2 border-black rounded-2 me-1">
          <Row>
            {modify ? (
              <Col className="p-3">
                <Row>
                  <Col className="">
                    <div className="select">
                      <select name="Ca" value={characterspecifics.Ca} onChange={handlechange}>
                        <option disabled>CA Modifier</option>
                        <option value="10">+0</option>
                        <option value="11">+1</option>
                        <option value="12">+2</option>
                        <option value="13">+3</option>
                        <option value="14">+4</option>
                        <option value="15">+5</option>
                        <option value="16">+6</option>
                        <option value="17">+7</option>
                        <option value="18">+8</option>
                        <option value="19">+9</option>
                        <option value="20">+10</option>
                        <option value="21">+11</option>
                        <option value="22">+12</option>
                        <option value="23">+13</option>
                      </select>
                    </div>
                  </Col>
                </Row>
              </Col>
            ) : (
              <>
                <Col>
                  <Row>
                    <Col className="p-3 fs-4 ">{armorClassValue(character)}</Col>
                  </Row>
                  <Row className="bg-dark text-white fw-bold">
                    <Col>
                      CA
                      <img
                        src={`/images/CharacterSheetIcons/shield.png`}
                        alt="shield Icon"
                        className="iconFilter abilityIcon"
                        style={{ width: "20px" }}
                      />
                    </Col>
                  </Row>
                </Col>
              </>
            )}
          </Row>
        </Col>

        <Col
          className="trowSelectInverse me-1 cursor"
          onClick={() => {
            rollDice(`1d20+${modifierCalc(character.DEX)}`);
            dispatch(setTypeOfTrow("initiativeRoll"));
            dispatch(setIsOpen(false));
          }}
        >
          <Row>
            <Col className="p-3 fs-4 ">+{modifierCalc(character.DEX)}</Col>
          </Row>
          <Row className="bg-dark text-white fw-bold">
            <Col>INITIATIVE</Col>
          </Row>
        </Col>

        <Col className="border border-2 border-black rounded-2">
          <Row>
            <Col className="p-3 fs-4 ">{speedValue(character)} m</Col>
          </Row>
          <Row className="bg-dark text-white fw-bold">
            <Col>SPEED</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
