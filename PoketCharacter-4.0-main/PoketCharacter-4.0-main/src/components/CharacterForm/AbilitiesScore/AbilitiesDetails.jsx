import React from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";

export default function AbilitiesDetails(props) {
  let { abilitydetails, isloading } = props;

  return (
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className="bg-secondary-red text-white">
          <Modal.Title id="contained-modal-title-vcenter">
            {abilitydetails != null ? abilitydetails.full_name : "Loading..."}
          </Modal.Title>
          <button className="btn btn-dark" onClick={props.onHide}>
            {" "}
            X{" "}
          </button>
        </Modal.Header>
        <Modal.Body>
          {isloading ? (
            <Spinner animation="grow" variant="danger" />
          ) : (
            <>
              <Container>
                <Row>
                  <Col>
                    <h5>Description:</h5>
                    {abilitydetails.desc.map((description, index) => (
                      <p key={`id-detail-${index}`}>{description}</p>
                    ))}
                  </Col>
                </Row>

                {abilitydetails.skills.length > 0 && (
                  <Row>
                    <Col>
                      <h5>Related Skills:</h5>
                      <ul>
                        {abilitydetails.skills.map((skill, index) => (
                          <li key={`id-skill-detail-${index}`}>{skill.name}</li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                )}
              </Container>
            </>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
