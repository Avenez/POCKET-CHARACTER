import React from "react";
import { Col, Row } from "react-bootstrap";

export default function CharacterDetails(props) {
  let { character, background, cClass, subclass } = props;
  //   let classObj = props.class;

  return (
    <>
      <Row className="mt-3">
        <Col>
          <Row className="row-cols-1 row-cols-lg-2 ">
            <Col className="p-2">
              <h1 className=" display-4">{character.Name}</h1>
            </Col>
            <Col className="m-auto d-none d-md-inline-grid">
              <Row className="border border-2 rounded-3">
                <Col>
                  <h6>LEVEL:</h6>
                  <p>{character.Lv}</p>
                </Col>
                <Col>
                  <h6>CLASS:</h6>
                  {cClass.name}
                </Col>
                {character.subClass != "" && (
                  <Col>
                    <h6>SUBCLASS:</h6>
                    {subclass.name}
                  </Col>
                )}
                <Col>
                  <h6>RACE:</h6>
                  {character.Race.charAt(0).toUpperCase() + character.Race.slice(1)}
                </Col>
                <Col>
                  <h6>BACKGROUND:</h6>
                  {background.name}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
