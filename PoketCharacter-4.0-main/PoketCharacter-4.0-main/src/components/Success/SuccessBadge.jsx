import React from "react";
import "./SuccessStyle.scss";
import { Row, Col } from "react-bootstrap";

export default function SuccessBadge() {
  return (
    <Row>
      <Col className="col-2"></Col>
      <Col className="successMessage position-relative slide-in-elliptic-top-fwd">
        <h1>SUCCESS</h1>
        {/* <h2 className="bounce-top">20</h2> */}
        <img src="/images/d2020.png" alt="d20icon" className="seccessImg bounce-top" />
        <h1>CHARACTER</h1>
        <h1>CREATED</h1>
      </Col>
      <Col className="col-2"></Col>
    </Row>
  );
}
