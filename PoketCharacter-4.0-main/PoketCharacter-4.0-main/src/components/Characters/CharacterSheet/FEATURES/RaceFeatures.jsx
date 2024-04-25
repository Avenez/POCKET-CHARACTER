import React from "react";
import { Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./Features.scss";

export default function RaceFeatures(props) {
  let { race, subrace, character } = props;

  return (
    <Row className="">
      <Col>
        <Row className="bg-dark start-top-rounded end-top-rounded fw-bold text-white p-2 mb-1">
          <Col>
            {character.SubRace !== "" && character.SubRace !== "none"
              ? character.SubRace.toUpperCase()
              : character.Race.toUpperCase()}
            <img
              src={`/images/RacesIcons/${character.Race}.png`}
              alt="Ability Icon"
              className="iconFilterWhite abilityIcon"
            />
          </Col>
        </Row>
        <Row className="">
          <Col className="p-0">
            <Accordion>
              {race.map((item, index) => (
                <Accordion.Item className="accordionHoverRide" key={`id-${index}`} eventKey={index}>
                  <Accordion.Header>
                    <span className="fw-bold">{item.name}</span>
                  </Accordion.Header>
                  <Accordion.Body className="text-start accordionBodyHoverRide">
                    {item.desc.map((description, index) => (
                      <p key={index} className="text-start">
                        {description}
                      </p>
                    ))}
                    {item.name === "Draconic Ancestry" && (
                      <>
                        <h6>Selected:</h6>
                        <ul>
                          <li>{character.RaceType}</li>
                        </ul>
                      </>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
              {subrace != null &&
                subrace.map((item, index) => (
                  <Accordion.Item className="accordionHoverRide" key={`id-${index}`} eventKey={index + 10}>
                    <Accordion.Header>
                      <span className="fw-bold">{item.name}</span>
                    </Accordion.Header>
                    <Accordion.Body className="accordionBodyHoverRide">
                      {item.desc.map((description, index) => (
                        <p key={index} className="text-start">
                          {description}
                        </p>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
