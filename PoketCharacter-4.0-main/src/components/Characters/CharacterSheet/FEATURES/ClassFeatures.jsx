import P from "@3d-dice/dice-box/dist/world.none";
import React from "react";
import { Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./Features.scss";
export default function ClassFeatures(props) {
  let { title, className, features, level, fightingstyle, character } = props;

  return (
    <Row className="">
      <Col>
        <Row className="bg-dark start-top-rounded end-top-rounded fw-bold text-white p-2 mb-1">
          <Col>
            {title}
            <img
              src={`/images/ClassesIcons/${className.index}.png`}
              alt="Ability Icon"
              className="iconFilter abilityIcon"
            />
          </Col>
        </Row>
        <Row className="">
          <Col className="p-0">
            <Accordion>
              {features.map((item, index) =>
                item.level <= level && item.name !== "Ability Score Improvement" ? (
                  <Accordion.Item className=" accordionHoverRide" key={`id-${index}`} eventKey={index}>
                    <Accordion.Header>
                      <span className="fw-bold">
                        {item.name} <span className="text-secondary">Lv.{item.level}</span>
                      </span>
                    </Accordion.Header>
                    <Accordion.Body className="text-start accordionBodyHoverRide">
                      {item.desc.map((description, index) =>
                        fightingstyle != null && item.name === "Fighting Style" ? (
                          <span key={`character-fs-id-${index}`}>
                            <h6 className="text-start">{fightingstyle.name}</h6>
                            {fightingstyle.desc.map((desc, index) => (
                              <p key={`id-fighting-style-${index}`} className="text-start">
                                {desc}
                              </p>
                            ))}
                          </span>
                        ) : (
                          <p key={index} className="text-start">
                            {description}
                          </p>
                        )
                      )}
                      {item.name === "Sorcerous Origin" && (
                        <>
                          <h6>Selected:</h6>
                          <p>{character.SubClassType}</p>
                        </>
                      )}

                      {item.feature_specific != null && (
                        <ul className="text-start">
                          {item.feature_specific.subfeature_options.from.options.map((choice, index) => (
                            <li key={`choice-id-${index}`}>{choice.item.name}</li>
                          ))}
                        </ul>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                ) : null
              )}
            </Accordion>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
