import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import AbilityElement from "./AbilityElement";

export default function CharacterAbilities(props) {
  let character = props.character;
  const [abilities, setAbilities] = useState([
    {
      name: "Strength",
      type: "STR",
    },
    {
      name: "Dexterity",
      type: "DEX",
    },
    {
      name: "Constitution",
      type: "CON",
    },
    {
      name: "Intelligence",
      type: "INT",
    },
    {
      name: "Wisdom",
      type: "WIS",
    },
    {
      name: "Charisma",
      type: "CHA",
    },
  ]);

  return (
    <>
      <Row className="mt-3 row-cols-2 row-cols-sm-2 row-cols-lg-3 gx-5">
        {abilities.map((abl) => (
          <AbilityElement key={abl.type} ability={abl} value={character} />
        ))}
      </Row>
    </>
  );
}
