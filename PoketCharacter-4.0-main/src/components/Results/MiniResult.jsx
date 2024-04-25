import { Col, Container, Row } from "react-bootstrap";
import "./Results.scss";
import { useSelector } from "react-redux";

const MiniResult = (props) => {
  const result = props.result;
  return (
    <>
      <div className="miniResultDiv">
        <Row>
          <Col>
            <h6 className="m-0 p-2">
              {result.type} <span className={result.color}>{result.result}</span>
            </h6>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MiniResult;
