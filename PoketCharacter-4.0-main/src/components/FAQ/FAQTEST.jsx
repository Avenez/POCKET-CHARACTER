import React from "react";
import "../About/AboutStyle.scss";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../ProfileCard/ProfileCard";
import Message from "../Message/Message";
import RegistrationSnippet from "./Snippets/RegistrationSnippet";
import LoginSnippet from "./Snippets/LoginSnippet";
import FormSnippet from "./Snippets/FormSnippet";
import IndexReduxSnippet from "./Snippets/IndexReduxSnippet";
import CharacterReduxSnippet from "./Snippets/CharacterReduxSnippet";
import SheetSnippet from "./Snippets/SheetSnippet";
import ResultsSnippet from "./Snippets/ResultsSnippet";
import DiceBoxSnippet from "./Snippets/DiceBoxSnippet";

export default function FAQTEST() {
  return (
    <Container>
      <Row className="text-end mt-5 ps-4 pe-4 codeBack text-white">
        <Row className="mt-5 mb-5 text-end text-white">
          <Col>
            <h1 className="display-2 pt-5 text-indian-red">THE CODE</h1>
          </Col>
        </Row>
        <Col>
          <Row className="slide-in-right-about text-end">
            <Col>
              <div className="d-flex justify-content-end align-items-center">
                <h2 className="display-4">Login and Sign-up</h2>
                <img src="images/d20.png" alt="d20pointer" className="pointerImgRight" />
              </div>
              <Row className="text-center">
                <Col className=" fs-5">
                  <p className=" pK-2 justifyText text-center">
                    In this section we find the first step necessary for using PK. <br /> The component is based on two
                    different forms that are used for Registration and Login.
                  </p>
                  <Row className="row-cols-1 row-cols-md-2">
                    <Col>
                      <Row>
                        <Col>
                          <h4 className="mt-4">The Sign-up</h4>
                          <Row>
                            <Col>
                              <p className="justifyText">
                                The Sign-up includes a control logic linked to the Username and Email fields. Both
                                changes on submission are sent to the DB and if they are already present the user is
                                notified that the credentials are already in use. Otherwise the user is registered and
                                taken to Login.
                              </p>
                              <Row className="fs-6">
                                <Col>
                                  <RegistrationSnippet />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col>
                          <h4 className="mt-4">The Login</h4>
                          <p className=" justifyText">
                            Login includes a credential control logic based on Email and Password If the credentials are
                            found on the DB the user is logged in with the creation of a cookie and directed to the main
                            page of personages. Otherwise we will see an error message.
                          </p>
                          <LoginSnippet />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5 slide-in-left-about ">
            <Col class="">
              <div className="d-flex justify-content-end align-items-center">
                <h2 className="display-4 text-end">Character Form</h2>
                <img src="images/d20.png" alt="d20pointer" className="pointerImgRight" />
              </div>
              <h5 className="pK-4 justifyText text-center">
                The character creation form is a complex process based on:
              </h5>
              <Row className="row-cols-1 row-cols-lg-2">
                <Col>
                  <h4 className="mt-4 text-center">Main</h4>
                  <p className=" justifyText fs-5">
                    A main page in which the various components are assembled depending on the step (characterised by an
                    index) of the creation in which you are.
                  </p>
                  <FormSnippet />
                </Col>
                <Col>
                  <h4 className="mt-4 text-center">Redux</h4>
                  <p className=" justifyText fs-5">
                    Two REDUX states connects all the parts of the form and allow the management of the index, the
                    creation of the parameters that will be sent to the DB and the selection of the insertion mode.
                  </p>
                  <Row className="row-cols-1 row-cols-xl-2">
                    <Col>
                      {" "}
                      <IndexReduxSnippet />{" "}
                    </Col>
                    <Col>
                      {" "}
                      <CharacterReduxSnippet />{" "}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5 mb-5 slide-in-right-about">
            <Col>
              <div className="d-flex justify-content-end align-items-center">
                <h2 className="display-4 text-end">Character Sheet</h2>
                <img src="images/d20.png" alt="d20pointer" className="pointerImgRight" />
              </div>
              <p className=" fs-5 pK-5 justifyText">
                The character sheet has a simple but effective structure. In the main section we find all the logic
                relating to the Fetches necessary to recover the character's data. All data will then be passed to the
                created components to show them through Prop-Drilling. Each component has its own logic for calculating
                scores or modifiers.
              </p>
              <SheetSnippet />
            </Col>
          </Row>
          <Row className="mt-5 mb-5 pb-5 slide-in-right-about">
            <Col>
              <div className="d-flex justify-content-end align-items-center">
                <h2 className="display-4 text-end">Dices</h2>
                <img src="images/d20.png" alt="d20pointer" className="pointerImgRight" />
              </div>
              <p className=" fs-5 pK-5 justifyText">
                PK takes advantage of the free "FantasticDice" library to ensure the ability to make a virtual dice roll
                that can be displayed on the screen. Three-dimensional animation and result retrieval are handled by the
                built-in features. PK presents a menu from which it is possible to select how many and which dice to
                roll. All this is connected to a pop-up window that retrieves the result to show it on the screen. The
                process is managed through a Redux Slice which saves the results and the type of launch performed
                through the parameters passed to the action. In their profile, the user has the option to select the
                color of their dice. This parameter is saved in Local Storage. This is then retrieved into the DiceBox
                component which is mounted in App.js.
              </p>
              <Row className="row-cols-1 row-cols-md-2">
                <Col>
                  <h4 className="mt-4 text-center">Results</h4>
                  <ResultsSnippet />
                </Col>

                <Col>
                  <h4 className="mt-4 text-center">Dice Box</h4>
                  <DiceBoxSnippet />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ marginBottom: "150px" }}>
            <Col className="Col_2 text-center">
              <h2>
                <i className="bi bi-github me-3"></i>
                <a href="/">The complete code can be examined at this link</a>
              </h2>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
