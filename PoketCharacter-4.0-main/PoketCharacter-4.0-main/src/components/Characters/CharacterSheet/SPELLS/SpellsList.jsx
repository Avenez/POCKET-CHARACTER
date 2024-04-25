import React from "react";
import { Col, Row } from "react-bootstrap";

export default function SpellsList(props) {
  let { spells } = props;

  const spellsXLevels = [];

  for (let i = spells.results[0].level; i <= spells.results[spells.results.length - 1].level; i++) {
    spellsXLevels.push(
      <Col key={i} className="p-2">
        <h6>Level {i}</h6>
        <ul>{spells.results.map((item) => parseInt(item.level) === i && <li key={item.name}>{item.name}</li>)}</ul>
      </Col>
    );
  }

  return (
    <>
      <Row className="text-start mt-3 mb-2">
        <Col className="p-4">
          <Row className="border-bottom border-3 border-black">
            <h5 className=" display-6">Spells List</h5>
          </Row>
          <Row className="p-2 row-cols-2 row-cols-md-3 row-cols-lg-4">{spellsXLevels}</Row>
        </Col>
      </Row>
    </>
  );
}
