import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { genericFetch } from "../../../FETCHES/CommonFetch";
import AbilitiesDetails from "./AbilitiesDetails";

export default function AbilityDetail(props) {
  const [modalShow, setModalShow] = React.useState(false);
  let [modifier, setModifier] = useState(0);
  let [abilityDetails, setAbilityDetails] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let { ability, index } = props;

  const abilityValue = useSelector((state) => state.character.character[ability.type]);

  const raceAbilityArray = useSelector((state) => state.character.raceStats);
  const abilityObject = raceAbilityArray.find((item) => item.type === ability.type);
  const raceAbilityValue = abilityObject ? abilityObject.value : 0;

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
    let totalScore = abilityValue + ability.value;
    modifierCalc(totalScore);
  }, [ability.value, abilityValue]);

  useEffect(() => {
    let url = `/api/ability-scores/${ability.type.toLowerCase()}`;

    const fetch = async () => {
      try {
        let details = await genericFetch(url);
        setAbilityDetails(details);
      } catch (error) {
        console.error("Si è verificato un errore:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <Row key={ability.type}>
        <Col>
          <Row className="bg-dark p-2 cursorLents" onClick={() => setModalShow(true)}>
            <Col className="text-white d-flex justify-content-start align-items-center">
              <h6 className="mt-2">{ability.name.toUpperCase()}</h6>
              <img
                src={`/images/AbilitiesIcons/${ability.name}.png`}
                alt="Ability Icon"
                className="iconFilter abilityIcon"
              />
            </Col>
          </Row>
          <Row className="p-1 border-bottom border-3">
            <Col xs={8} className="d-flex align-items-center justify-content-center pt-3">
              <p>Score</p>
            </Col>
            <Col className="mt-2">
              <div className="abilitiesSelect">
                <select
                  value={ability.value}
                  onChange={(e) => props.handlechange(index, parseInt(e.target.value))}
                  className="abilitySelect"
                >
                  {Array.from({ length: 20 - (abilityValue + raceAbilityValue) - 8 }, (_, index) => index + 10).map(
                    (value, index) => (
                      <option key={`id-${value}-${index}`} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </select>
              </div>
            </Col>
          </Row>

          <Row className="border-bottom border-3 mt-3">
            <Col xs={8}>
              <p>Total Score</p>
            </Col>
            <Col>{abilityValue + ability.value < 10 ? "--" : abilityValue + ability.value}</Col>
          </Row>

          <Row className=" border-bottom border-3 mt-3">
            <Col xs={8}>
              <p>Modifier</p>
            </Col>
            <Col>+{modifier}</Col>
          </Row>

          <Row className="mt-3 border-bottom border-3">
            <Col xs={8}>
              <p>Race Bonus</p>
            </Col>
            <Col>{raceAbilityValue}</Col>
          </Row>

          <Row className="mt-3 border-bottom border-3">
            <Col xs={8}>
              <p>Lv Bonus</p>
            </Col>
            <Col>{abilityValue - raceAbilityValue}</Col>
          </Row>
        </Col>
      </Row>

      <AbilitiesDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        abilitydetails={abilityDetails}
        isloading={isLoading}
      />
    </>
  );
}
