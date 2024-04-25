import React from "react";
import { Row, Col } from "react-bootstrap";
import "./CharacterSheetStyle.scss";
import { useDispatch } from "react-redux";
import { rollDice } from "../../../App";
import { setIsOpen, setTypeOfTrow } from "../../../REDUX/ResultSlice";

export default function Spells(props) {
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

  const spellsModValue = () => {
    let spellAttackMod = 0;

    if (classObj.spellcasting != null) {
      let key = classObj.spellcasting.spellcasting_ability.name;
      spellAttackMod += modifierCalc(character[key]) + character.BC + character.TPCI;
    }

    return spellAttackMod;
  };

  const spellCdValue = () => {
    let spellsCd = 0;

    if (classObj.spellcasting != null) {
      let key = classObj.spellcasting.spellcasting_ability.name;
      spellsCd += 8 + modifierCalc(character[key]) + character.BC;
    }

    return spellsCd;
  };

  return (
    <Row className="border border-2 border-black rounded-2">
      <Col>
        <Row className="bg-primary-blue fw-bold text-white end-top-rounded start-top-rounded p-1">
          <Col className="d-flex justify-content-center align-items-center">SPELLS</Col>
        </Row>
        <Row>
          {modify ? (
            <>
              <Col className="border-end border-1 border-black trowSelectSimpleBlue">
                <Row>
                  <Col className="d-flex justify-content-center align-items-center p-3">
                    <div className="select">
                      <select name="Tpci" value={characterspecifics.Tpci} onChange={handlechange}>
                        <option disabled>Spells</option>
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
                </Row>
              </Col>
            </>
          ) : (
            <>
              <Col
                className="border-end border-1 border-black cursor trowSelectSimpleBlue"
                onClick={() => {
                  rollDice(`1d20+${spellsModValue()}`);
                  dispatch(setTypeOfTrow("spellRoll"));
                  dispatch(setIsOpen(false));
                }}
              >
                <Row>
                  <Col className="p-3 fs-3 fw-bold">+{spellsModValue()}</Col>
                </Row>
                <Row className="bg-silver fw-bold text-rick-black start-top-rounded">
                  <Col>ATTACK MOD</Col>
                </Row>
              </Col>
            </>
          )}

          <Col className="border-start border-1 border-black">
            <Row>
              <Col className="p-3 fs-3 fw-bold">{spellCdValue()}</Col>
            </Row>
            <Row className="bg-silver fw-bold text-rick-black end-top-rounded">
              <Col>CD</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
