import React from "react";
import "./FailedStyle.scss";
import { Row, Col } from "react-bootstrap";

export default function FailedBadge() {
  return (
    <Row>
      <Col className="col-2"></Col>
      <Col className="failedMessage position-relative slide-in-elliptic-top-fwd">
        <h1>SORRY</h1>
        <img src="/images/d201.png" alt="d20icon" className="seccessImg bounce-top" />
        <h1>SOMETHIG</h1>
        <h1>GONE WRONG</h1>
      </Col>
      <Col className="col-2"></Col>
    </Row>
  );
}
