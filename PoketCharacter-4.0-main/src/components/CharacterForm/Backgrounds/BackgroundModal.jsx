import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

export default function BackgroundModal(props) {
  let background = props.background;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby={`id-${background.idBackground}`}
      centered
      style={{ zIndex: "10000000000" }}
    >
      <Modal.Header className="bg-secondary-red text-white">
        <Modal.Title id={`id-${background.idBackground}`}>{background.name}</Modal.Title>
        <button className="btn btn-dark" onClick={props.onHide}>
          {" "}
          X{" "}
        </button>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <h6>{background.description}</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Skills:</h5>
              <p>
                {background.skillOne.charAt(0).toUpperCase() + background.skillOne.substring(1)} &{" "}
                {background.skillTwo.charAt(0).toUpperCase() + background.skillTwo.substring(1)}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Starting Equip</h5>
              <p>{background.equip}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Feature:</h5>
              <h6>{background.feature}</h6>
              <p>{background.featureDescription}</p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="me-auto btn btn-danger" onClick={props.onHide}>
          Close
        </Button>
        <button
          className="btn btn-dark"
          onClick={() => {
            props.selectbackground?.();
          }}
        >
          Select <i className="bi bi-check-circle ms-2"></i>
        </button>
      </Modal.Footer>
    </Modal>
  );
}
