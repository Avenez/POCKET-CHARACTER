import React from "react";
import { Row, Col } from "react-bootstrap";

export default function EditControls(props) {
  let { modify, setmodify, sendmod } = props;

  return (
    <>
      <Row>
        <Col className="text-end">
          {modify ? (
            <>
              <i className="bi bi-floppy btn btn-warning me-2 fw-bold fs-5" onClick={sendmod}></i>
              <i
                className="bi bi-arrow-return-left btn btn-dark fw-bold fs-5"
                onClick={() => {
                  setmodify(false);
                }}
              >
                <span className="ms-2">BACK</span>
              </i>
            </>
          ) : (
            <>
              <i
                className="bi bi-pencil-square btn btn-danger fs-5"
                onClick={() => {
                  setmodify(true);
                }}
              ></i>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
