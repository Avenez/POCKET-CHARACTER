import { useEffect } from "react";
import { Link } from "react-router-dom";
import { goTo } from "../../REDUX/FormSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../REDUX/CharacterSlice";
import { Container, Row, Col } from "react-bootstrap";
import "./SpashPageStyle.scss";

export const SplashPage = () => {
  const index = useSelector((state) => state.form.indexValue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(goTo(1));
    dispatch(resetState());
  }, []);

  return (
    <>
      <Container className="">
        <Row className="splashRowContainer">
          <Col className="splashColContainer">
            <Row className="titlesRow row-cols-1">
              <Col className="titlesCol">
                <Row className="slide-in-right_1">
                  <Col className="Col_1">
                    <a href="/Login">
                      START <br></br> YOUR <br></br> ADVENTURE
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col className="d-flex align-items-center">
                <div className="split"></div>
                <img
                  src="/images/Spinner/d20Spinner.webp"
                  alt="placeholder"
                  style={{ width: "100px", margin: "10px" }}
                  className="roll-in-top"
                />
                <div className="split"></div>
              </Col>
              <Col className="titlesCol Col_2">
                <Row className="slide-in-left-1_2">
                  <Col className="mb-3">
                    <a href="/About">- ABOUT</a>
                  </Col>
                </Row>
                <Row className="slide-in-left-1_4">
                  <Col>
                    <a href="/Faq">- FAQ</a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
