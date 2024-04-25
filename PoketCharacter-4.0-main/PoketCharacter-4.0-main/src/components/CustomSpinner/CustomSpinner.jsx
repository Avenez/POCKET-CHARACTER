import React from "react";
import "./CustomSpinnerStyle.scss";
import { Row, Col } from "react-bootstrap";

export default function CustomSpinner() {
  return (
    <Row>
      <Col className="d-flex justify-content-center align-items-center">
        <Row className="customSpinnerRow">
          <Col className="bounce-in-top">
            <div className="customSpinnerContainer">
              <div className="spinnerCircle rotate-center-right "></div>
              <img
                src="/images/Spinner/d20Spinner.webp"
                alt="dice spinner"
                className="customSpinnerImg rotate-center"
                loading="aeger"
              />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
