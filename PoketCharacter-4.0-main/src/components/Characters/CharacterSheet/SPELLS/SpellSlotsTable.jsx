import React from "react";
import { Row, Col } from "react-bootstrap";
import { rollDice } from "../../../../App";
import "./Spells.scss";

export default function SpellSlotsTable(props) {
  const { spellslevels } = props;
  const spellSlotsLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Row className="mt-5">
      <Col>
        <Row className="text-start">
          <Col>
            <h5 className=" display-6">
              {spellslevels[0].spellcasting.cantrips_known != null && "Cantrips & "}Spell Slots
            </h5>
          </Col>
        </Row>
        <Row className=" ps-3 pe-3">
          <Col>
            <Row className="fw-bold bg-black p-1 text-white">
              <Col className="col-1">LV</Col>
              {spellslevels[0].spellcasting.cantrips_known != null && <Col className="col-1">0</Col>}
              {spellSlotsLevels.map(
                (slot, index) =>
                  spellslevels[0].spellcasting[`spell_slots_level_${slot}`] != null && (
                    <Col key={index} className="col-1">
                      {slot}
                    </Col>
                  )
              )}
            </Row>
          </Col>
        </Row>
        <Row className="ps-3 pe-3">
          <Col>
            {spellslevels.map(
              (item, index) =>
                item.level <= 10 && (
                  <Row key={index} className="spellSlotsRow">
                    <Col className="col-1 fw-bold">{item.level}</Col>
                    {spellslevels[0].spellcasting.cantrips_known != null && (
                      <Col className="col-1">{item.spellcasting.cantrips_known}</Col>
                    )}
                    {spellSlotsLevels.map(
                      (slot, index) =>
                        item.spellcasting[`spell_slots_level_${slot}`] != null && (
                          <Col key={index} className="col-1">
                            {item.spellcasting[`spell_slots_level_${slot}`]}
                          </Col>
                        )
                    )}
                  </Row>
                )
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
