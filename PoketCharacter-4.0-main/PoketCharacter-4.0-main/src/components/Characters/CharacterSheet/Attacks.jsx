import React from "react";
import { Row, Col } from "react-bootstrap";
import "./CharacterSheetStyle.scss";
import { useDispatch } from "react-redux";
import { rollDice } from "../../../App";
import { setIsOpen, setTypeOfTrow } from "../../../REDUX/ResultSlice";

export default function Attacks(props) {
  let { character, classObj, modify, handlechange, characterspecifics } = props;

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

  const meleeModValue = () => {
    let meleeMod = character.BC + modifierCalc(character.STR) + character.TPCM;

    return meleeMod;
  };

  const rangedModValue = () => {
    let rangedMod = character.BC + modifierCalc(character.DEX) + character.TPCD;

    return rangedMod;
  };

  return (
    <Row className="border border-2 border-black rounded-2">
      <Col>
        <Row className="bg-secondary-red fw-bold text-white end-top-rounded start-top-rounded">
          <Col>ATTACKS</Col>
        </Row>
        <Row className="row-cols-2">
          {modify ? (
            <>
              <Col className="d-flex justify-content-center align-items-center border-end border-1 border-black">
                <div className="select">
                  <select name="Tpcm" value={characterspecifics.Tpcm} onChange={handlechange}>
                    <option disabled>Meele</option>
                    <option value="0">+0</option>
                    <option value="1">+1</option>
                    <option value="2">+2</option>
                    <option value="3">+3</option>
                    <option value="4">+4</option>
                    <option value="5">+5</option>
                    <option value="6">+6</option>
                    <option value="7">+7</option>
                    <option value="8">+8</option>
                    <option value="9">+9</option>
                    <option value="10">+10</option>
                  </select>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col
                className="border-end border-1 border-black cursor trowSelectSimpleRed"
                onClick={() => {
                  rollDice(`1d20+${meleeModValue()}`);
                  dispatch(setTypeOfTrow("attackRoll"));
                  dispatch(setIsOpen(false));
                }}
              >
                <Row>
                  <Col className="p-3 fs-3 fw-bold">+{meleeModValue()}</Col>
                </Row>
                <Row className="bg-silver fw-bold text-rick-black start-rounded p-1">
                  <Col className="d-flex justify-content-center align-items-center">
                    MELEE
                    <img
                      src={`/images/CharacterSheetIcons/sword.png`}
                      alt="shield Icon"
                      className="iconFilterWhite abilityIcon"
                      style={{ width: "25px" }}
                    />
                  </Col>
                </Row>
              </Col>
            </>
          )}
          {modify ? (
            <>
              <Col className="d-flex justify-content-center align-items-center border-start border-1 border-black p-3">
                <div className="select">
                  <select name="Tpcd" value={characterspecifics.Tpcd} onChange={handlechange}>
                    <option disabled>Ranged</option>
                    <option value="0">+0</option>
                    <option value="1">+1</option>
                    <option value="2">+2</option>
                    <option value="3">+3</option>
                    <option value="4">+4</option>
                    <option value="5">+5</option>
                    <option value="6">+6</option>
                    <option value="7">+7</option>
                    <option value="8">+8</option>
                    <option value="9">+9</option>
                    <option value="10">+10</option>
                  </select>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Col
                className="border-start border-1 border-black cursor trowSelectSimpleRed"
                onClick={() => {
                  rollDice(`1d20+${rangedModValue()}`);
                  dispatch(setTypeOfTrow("attackRoll"));
                  dispatch(setIsOpen(false));
                }}
              >
                <Row>
                  <Col className="p-3 fs-3 fw-bold">+{rangedModValue()}</Col>
                </Row>
                <Row className="bg-silver fw-bold text-rick-black end-rounded p-1">
                  <Col className="d-flex justify-content-center align-items-center">
                    RANGED
                    <img
                      src={`/images/CharacterSheetIcons/bow.png`}
                      alt="shield Icon"
                      className="iconFilterWhite abilityIcon"
                      style={{ width: "25px" }}
                    />
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
}
