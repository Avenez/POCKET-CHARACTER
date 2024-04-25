import React from "react";
import { Row, Col } from "react-bootstrap";
import "./CharacterSheetStyle.scss";

export default function HitPoints(props) {
  let { classObj, character } = props;

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

  const hitPointsValue = (characterClass, characterObj) => {
    let constitutionMod = modifierCalc(characterObj.CON);

    let hitPoints =
      characterClass.hit_die +
      constitutionMod +
      (characterClass.hit_die / 2 + 1 + constitutionMod) * (characterObj.Lv - 1);

    return hitPoints;
  };

  return (
    <Row className="border border-2 border-black rounded-2">
      <Col>
        <Row className="bg-dark fw-bold text-white">
          <Col>HIT POINTS</Col>
        </Row>
        <Row>
          <Col className="border-end border-1 border-black">
            <Row>
              <Col className="p-3 fs-3 fw-bold">{hitPointsValue(classObj, character)}</Col>
            </Row>
            <Row className="bg-silver fw-bold text-rick-black start-rounded">
              <Col>MAX HP</Col>
            </Row>
          </Col>
          <Col className="border-start border-end border-1 border-black">
            <Row>
              <Col className="p-3 fs-3 fw-bold">
                <input type="text" className="inputHP" />
              </Col>
            </Row>
            <Row className="bg-silver fw-bold text-rick-black">
              <Col>HP</Col>
            </Row>
          </Col>
          <Col className="border-start border-1 border-black">
            <Row>
              <Col className="p-3 fs-3 fw-bold">
                {character.Lv}d{classObj.hit_die}
              </Col>
            </Row>
            <Row className="bg-silver fw-bold text-rick-black end-rounded">
              <Col>HIT DICES</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
