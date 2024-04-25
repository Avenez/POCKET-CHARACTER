import React from "react";
import "./EditedStyle.scss";
import { Row, Col } from "react-bootstrap";

export default function EditedBadge() {
  return (
    <Row>
      <Col className="col-2"></Col>
      <Col className="editedMessage position-relative slide-in-elliptic-top-fwd">
        <h1>SUCCESS</h1>
        <img src="/images/d2020.png" alt="d20icon" className="seccessImg bounce-top" />
        <h1>CHARACTER</h1>
        <h1>EDITED</h1>
      </Col>
      <Col className="col-2"></Col>
    </Row>
  );
}
