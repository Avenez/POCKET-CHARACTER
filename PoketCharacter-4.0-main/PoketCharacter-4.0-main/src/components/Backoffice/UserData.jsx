import React from "react";
import { Row, Col } from "react-bootstrap";
import UserDeleteModal from "./UserDeleteModal";

export default function UserData(props) {
  let { user } = props;
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Col className="mb-3 flip-in-ver-right">
      <Row className="border border-2 border-dark rounded-2 p-3">
        <Col>
          <Row className="bg-dark text-bg-dark pt-2 mb-3">
            <Col className="">
              <h5 className="text-start">User Data</h5>
            </Col>
          </Row>
          <Row className="text-start mb-2">
            <Col>
              <h6>Username</h6>
              <p>{user.username}</p>
            </Col>
          </Row>
          <Row className="text-start mb-2">
            <Col>
              <h6>Email</h6>
              <p>{user.email}</p>
            </Col>
          </Row>
          <Row className="text-start mb-2">
            <Col>
              <h6>Password</h6>
              <p>{user.password}</p>
            </Col>
          </Row>
          <Row className="text-start mb-2">
            <Col>
              <h6>Role</h6>
              <p>{user.role}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="text-end">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => {
                    props.seteditmode(true);
                  }}
                >
                  <i className="bi bi-pencil-square me-1"></i> Edit
                </button>
                <button className="btn btn-danger " onClick={() => setModalShow(true)}>
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <UserDeleteModal show={modalShow} onHide={() => setModalShow(false)} user={user} />
    </Col>
  );
}
