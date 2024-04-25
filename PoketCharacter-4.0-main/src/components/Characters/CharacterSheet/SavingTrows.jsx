import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SavingElement from "./SavingElement";

export default function SavingTrows(props) {
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
      <Row className="mt-3">
        <Col>
          <Row>
            {abilities.map((save) => (
              <SavingElement key={`id-${save.name}`} save={save} value={character} />
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
}
