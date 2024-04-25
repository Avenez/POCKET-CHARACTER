import React from "react";
import { Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./Features.scss";

export default function BackgroundFeature(props) {
  let { background } = props;

  return (
    <Row className="">
      <Col>
        <Row className="bg-dark start-top-rounded end-top-rounded fw-bold text-white p-2 mb-1">
          <Col>
            {background.name.toUpperCase()}
            <img
              src={`/images/BackgroundIcons/${background.name}.png`}
              alt="Ability Icon"
              className="iconFilterWhite abilityIcon"
            />
          </Col>
        </Row>
        <Row className="">
          <Col className="p-0">
            <Accordion>
              <Accordion.Item className="accordionHoverRide" eventKey="background">
                <Accordion.Header>
                  <span className="fw-bold">{background.feature}</span>
                </Accordion.Header>
                <Accordion.Body className="accordionBodyHoverRide">
                  <p className="text-start">{background.featureDescription}</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
