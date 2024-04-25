import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PageNotFoundStyle.scss";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="">
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <div className="image-div">
            <img className="w-100 not-found-img" src="/images/nat1.png" alt="sad cloud" />
          </div>
          <h1 className="display-4 p-2">
            Error "<span className="fw-bold">N4t0r4l 1</span>"{" "}
          </h1>
          <h1 className="display-4 p-2">The page you are looking for has been eaten by a Dragon</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="text-center">
          <button
            className="notFoundButton"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
            <img src="\images\d20.png" alt="d20" className="diceIconHome" />
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
