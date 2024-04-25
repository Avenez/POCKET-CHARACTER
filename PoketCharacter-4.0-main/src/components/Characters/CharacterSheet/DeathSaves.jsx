import React from "react";
import { Row, Col } from "react-bootstrap";

export default function DeathSaves() {
  return (
    <>
      <Row className="border border-2 border-black rounded-2">
        <Col>
          <Row className="p-3 row-cols-2">
            <Col className="d-flex justify-content-center">
              <i className="bi bi-heart-fill fs-5 me-2 text-black"></i>
              <div className="checkbox-wrapper-success">
                <input type="checkbox" id="check-1" name="check" value="" />
                <label htmlFor="check-1">
                  <span></span>
                </label>
              </div>
              <div className="checkbox-wrapper-success">
                <input type="checkbox" id="check-2" name="check" value="" />
                <label htmlFor="check-2">
                  <span></span>
                </label>
              </div>
              <div className="checkbox-wrapper-success">
                <input type="checkbox" id="check-3" name="check" value="" />
                <label htmlFor="check-3">
                  <span></span>
                </label>
              </div>
            </Col>
            <Col className="d-flex justify-content-center">
              <img
                src={`/images/CharacterSheetIcons/skull.png`}
                alt="skull Icon"
                className=" abilityIcon me-2"
                style={{ width: "23px", height: "23px", marginTop: "4px" }}
              />
              <div className="checkbox-wrapper-failure">
                <input type="checkbox" id="check-4" name="check" value="" />
                <label htmlFor="check-4">
                  <span></span>
                </label>
              </div>
              <div className="checkbox-wrapper-failure">
                <input type="checkbox" id="check-5" name="check" value="" />
                <label htmlFor="check-5">
                  <span></span>
                </label>
              </div>
              <div className="checkbox-wrapper-failure">
                <input type="checkbox" id="check-6" name="check" value="" />
                <label htmlFor="check-6">
                  <span></span>
                </label>
              </div>
            </Col>
          </Row>
          <Row className="bg-dark fw-bold text-white">
            <Col>DEATH SAVES</Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
