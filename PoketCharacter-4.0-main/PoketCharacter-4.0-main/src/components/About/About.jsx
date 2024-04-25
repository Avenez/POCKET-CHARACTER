import React from "react";
import "./AboutStyle.scss";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../ProfileCard/ProfileCard";
import Message from "../Message/Message";

export default function About() {
  return (
    <Container>
      <Row className="text-start mt-5 ps-4 pe-4">
        <Col>
          <Row className="slide-in-left-about">
            <Col>
              <div className="d-flex justify-content-start align-items-center">
                <img src="images/d20.png" alt="d20pointer" className="pointerImg" />
                <h2 className="display-4">What is Pocket Character?</h2>
              </div>
              <p className="ms-4 fs-5 pK-1 justifyText">
                <span>PK</span> is a Capstone project born at the end of the <span>FullStack Developer Epicode</span>{" "}
                training course. This Web App was developed to be at the service of all those people who are approaching
                the D&D role-playing game or who have been sailing its seas for some time. <br /> It aims to be a simple
                and immediate tool for creating characters and let users be able to play with a few simple clicks
                wherever they are. Its features include the ability to{" "}
                <span> create a character, view the card, edit it and roll the necessary dices </span> all from the
                screen's device. Literally a pocket character in the hand of the user wherever he is.
              </p>
            </Col>
          </Row>
          <Row className="mt-5 slide-in-right-about">
            <Col>
              <div className="d-flex justify-content-start align-items-center">
                <img src="images/d20.png" alt="d20pointer" className="pointerImg" />
                <h2 className="display-4">How is PK made?</h2>
              </div>
              <Row>
                <Col className="ms-4 fs-5">
                  <p className=" pK-2 justifyText">
                    This Web App is intended to be the sum of all the knowledge learned during <br />
                    the <span>FullStack Developer Epicode </span> training course. <br />
                  </p>
                  <h4 className="mt-4">The Front-End</h4>
                  <p className="justifyText">
                    A Single Page Application, developed through <span className="fw-bold"> JS</span> with the use of:
                  </p>
                  <ul className="">
                    <li>REACT + REDUX</li>
                    <li>REACT ROUTER</li>
                    <li>SASS</li>
                    <li>React Bootstrap</li>
                    <li>FantasticDice</li>
                  </ul>
                  <p className="pk-3 justifyText">
                    The app also makes use of a free API for retrieving the main information relating to
                    <span> D&D</span>.
                  </p>
                  <h4 className="mt-4">The Back-End</h4>
                  <p className=" justifyText">
                    A web API developed through <span className="fw-bold"> .NET CORE and C# </span> for saving user
                    data.
                  </p>
                </Col>
              </Row>
              <Row className="ms-2 iconsRow slide-in-right-about">
                <Col className="">
                  <Row className="row-cols-3 row-cols-md-4 row-cols-xl-5">
                    <Col>
                      <i className="devicon-javascript-plain colored"></i>
                    </Col>
                    <Col>
                      <i className="devicon-redux-original colored"></i>
                    </Col>
                    <Col>
                      <i className="devicon-reactrouter-plain colored"></i>
                    </Col>
                    <Col>
                      <i className="devicon-react-original colored"></i>
                    </Col>
                    <Col>
                      <i className="devicon-reactbootstrap-original colored"></i>
                    </Col>
                    <Col>
                      <i className="devicon-css3-plain colored"></i>
                    </Col>
                    <Col>
                      <i className="devicon-sass-original colored"></i>
                    </Col>
                    <Col>
                      <i className="devicon-csharp-plain colored"></i>
                    </Col>
                    <Col>
                      <i className="devicon-dotnetcore-plain colored"></i>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5 slide-in-left-about">
            <Col>
              <div className="d-flex justify-content-start align-items-center">
                <img src="images/d20.png" alt="d20pointer" className="pointerImg" />
                <h2 className="display-4">What is the direction of PK?</h2>
              </div>
              <p className="ms-4 fs-5 pK-4 justifyText">
                The application has a lot to offer and much more is going to be added. <br /> This is a solo project
                created in a relatively short period of time but will be expanded and enriched with new features as time
                goes by. in the future the project plans to{" "}
                <span className="fw-bold">create these APIs completely to expand resources</span>.
              </p>
            </Col>
          </Row>
          <Row className="mt-5 mb-5 slide-in-right-about">
            <Col>
              <div className="d-flex justify-content-start align-items-center">
                <img src="images/d20.png" alt="d20pointer" className="pointerImg" />
                <h2 className="display-4">How does PK work?</h2>
              </div>
              <p className="ms-4 fs-5 pK-5 justifyText">
                For all information on the logic and guides relating to PK we invite you to consult the{" "}
                <a href="/FAQ">FAQ page</a>.
              </p>
            </Col>
          </Row>
          <Row className="mb-3 row-cols-1 row-cols-lg-2">
            <Col className="d-flex justify-content-center">
              <ProfileCard />
            </Col>
            <Col>
              <Message />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
