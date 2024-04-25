import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { rollDice } from "../../../App";
import { useDispatch } from "react-redux";
import { setIsOpen, setTypeOfTrow } from "../../../REDUX/ResultSlice";
import SavingElement from "./SavingElement";
import MuscleWhite from "../../ICONS/MuscleWhite";

export default function AbilityElement(props) {
  let { ability, value } = props;
  let abilityValue = value[ability.type];
  const dispatch = useDispatch();

  let [modifier, setModifier] = useState(0);

  let trow = `1d20+${modifier}`;

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

    setModifier(mod);
  };

  useEffect(() => {
    modifierCalc(abilityValue);
  }, []);

  return (
    <Col className="mt-3">
      <Row
        className="cursor trowSelect"
        onClick={() => {
          rollDice(trow);
          dispatch(setTypeOfTrow("abilityRoll"));
          dispatch(setIsOpen(false));
        }}
      >
        <Col>
          <Row className="bg-dark p-1">
            <Col className="d-flex justify-content-center align-items-center">
              <h6 className="mb-0">{ability.name.toUpperCase()}</h6>
              <img
                src={`/images/AbilitiesIcons/${ability.name}.png`}
                alt="Ability Icon"
                className="iconFilter abilityIcon"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ position: "relative" }} className="p-2">
                <h4 className="text-danger">+{modifier}</h4>
                <div
                  className="border border-3 border-dark rounded-3 px-3 py-1 bg-white fw-bold text-dark"
                  style={{ position: "absolute", left: "50%", top: "80%", transform: "translateX(-48%)" }}
                >
                  {abilityValue}
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="trowSelectInverse">
        <SavingElement ability={ability} value={value} mod={modifier} />
      </Row>
    </Col>
  );
}
