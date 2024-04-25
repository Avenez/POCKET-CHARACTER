import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AbilityDetail from "./AbilityDetail";
import { useDispatch, useSelector } from "react-redux";
import { setAbilitiesProf, setRaceBonus } from "../../../REDUX/CharacterSlice";
import { nextIndex } from "../../../REDUX/FormSlice";
import "./AbilitiesStyle.scss";

export default function AbilitiesList() {
  let dispatch = useDispatch();
  let character = useSelector((state) => state.character.character);

  const [abilities, setAbilities] = useState([
    {
      name: "Strength",
      type: "STR",
      value: 10,
    },
    {
      name: "Dexterity",
      type: "DEX",
      value: 10,
    },
    {
      name: "Constitution",
      type: "CON",
      value: 10,
    },
    {
      name: "Intelligence",
      type: "INT",
      value: 10,
    },
    {
      name: "Wisdom",
      type: "WIS",
      value: 10,
    },
    {
      name: "Charisma",
      type: "CHA",
      value: 10,
    },
  ]);

  const createCharacter = (abilitiesArray, characterObj) => {
    dispatch(setAbilitiesProf());
    abilitiesArray.forEach((item) => dispatch(setRaceBonus({ type: `${item.type}+`, value: item.value })));
    dispatch(nextIndex());
  };

  const handleChange = (index, newValue) => {
    const updatedAbilities = [...abilities];
    updatedAbilities[index].value = newValue;
    setAbilities(updatedAbilities);
  };

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={3} className=" g-5 rowContainer">
        {abilities.map((ability, index) => (
          <Col key={index}>
            <AbilityDetail index={index} ability={ability} handlechange={handleChange} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <button
            className="nextButton"
            onClick={() => {
              createCharacter(abilities, character);
            }}
          >
            Create
          </button>
        </Col>
      </Row>
    </Container>
  );
}
