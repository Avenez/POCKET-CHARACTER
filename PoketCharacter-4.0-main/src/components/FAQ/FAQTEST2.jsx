import React from "react";
import "../About/AboutStyle.scss";
import { Container, Row, Col } from "react-bootstrap";
import ProfileCard from "../ProfileCard/ProfileCard";
import Message from "../Message/Message";
import VideoEmbed from "./Video/VideoEmbed";

export default function FAQTEST2() {
  return (
    <Container>
      <Row className="text-start mt-5 ps-4 pe-4">
        <Row className="mt-5 mb-5 text-start">
          <Col>
            <h1 className="display-2 pt-5">FAQ</h1>
          </Col>
        </Row>
        <Col>
          <Row className="slide-in-left-about">
            <Col>
              <Row>
                <Col>
                  <div className="d-flex justify-content-start align-items-center">
                    <img src="images/d20.png" alt="d20pointer" className="pointerImg" />
                    <h2 className="display-4">How do I sign up for PoketCharacter?</h2>
                  </div>
                  <p className="ms-4 fs-5 justifyText sign-up">
                    That's easy, <span className="fw-bold text-secondary-red">Adventurer</span>! On home page, just
                    click on <span className="startYourAdventure">START YOUR ADVENTURE</span> and you will be redirected
                    to{" "}
                    <a href="/Login" className="faqAnchor">
                      Login
                    </a>
                    . Once you get there, click on SIGN IN and fill in the required fields to create your account.
                    Afterwards, you will automatically redirected to Login; log in with your credentials and choose
                    whether to stay connected or not. All for free.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="ms-4">
                  <VideoEmbed embedId="1DInwWb6zrs" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5 slide-in-right-about">
            <Col>
              <Row>
                <Col>
                  <div className="d-flex justify-content-start align-items-center">
                    <img src="images/d20.png" alt="d20pointer" className="pointerImg" />
                    <h2 className="display-4">How do I create a character?</h2>
                  </div>
                  <Row>
                    <Col className="ms-4 fs-5">
                      <p className=" pK-2 justifyText">
                        Follow me <span className="fw-bold text-secondary-red">Adventurer</span> and I will show you the
                        way. After login, you will be redirected to{" "}
                        <a href="/Characters" className="faqAnchor">
                          My Characters
                        </a>{" "}
                        page where you will find all your previous creations. You can create a new character by clicking
                        "Add Character". To complete the process just follow those simple steps:
                      </p>

                      <ol className="">
                        <li>
                          Choose your character's name and picture: the image will be necessary to make your Character
                          unique
                        </li>
                        <li>
                          Pick a Race from the list: for each one you will be shown the main traits by clicking on it;
                          some races will have an additional page to select some specific skills
                        </li>
                        <li>Now it's time to choose the Class. You can select your level and features</li>
                        <li>
                          Select now a Background that will give your character an unic set of skills and abilities
                        </li>
                        <li>
                          You are almost done! Now it's time to assign the ability scores. All choices that you made so
                          far will be added automatically to the related ability
                        </li>
                      </ol>
                      <p className="pk-3 justifyText">
                        Your character is now complete! Well done{" "}
                        <span className="fw-bold text-secondary-red">Adventurer</span>! You will find your new creation
                        in{" "}
                        <a href="/Characters" className="faqAnchor">
                          My Characters
                        </a>{" "}
                        section.
                        <br />
                        <br />
                        All Races, Classes and Backgrounds are from the "Player's Handbook 5.0". Additional Subclasses
                        are unavailable at the moment, but will be added soon.
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="ms-4">
                      <VideoEmbed embedId="cGX-Sy2W2FY" />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5 slide-in-left-about">
            <Col>
              <Row>
                <Col>
                  <div className="d-flex justify-content-start align-items-center">
                    <img src="images/d20.png" alt="d20pointer" className="pointerImg" />
                    <h2 className="display-4">Where can I find the character sheet?</h2>
                  </div>
                  <p className="ms-4 fs-5 pK-4 justifyText">
                    In the{" "}
                    <a href="/Characters" className="faqAnchor">
                      My Characters
                    </a>{" "}
                    section you will find a list of all your characters summarised by name, level and class. Once you
                    selected the character you want to play with, you are redirected to the character's sheet. In
                    addition of all the main info you'll need in order to play, you will also find a list of all the
                    character's features and spells, if available.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="ms-4">
                  <VideoEmbed embedId="5ayUsN-W52Y" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-5 slide-in-right-about">
            <Col>
              <Row>
                <Col>
                  <div className="d-flex justify-content-start align-items-center">
                    <img src="images/d20.png" alt="d20pointer" className="pointerImg" />
                    <h2 className="display-4">Oh no, I forgot my dice set!</h2>
                  </div>
                  <p className="ms-4 fs-5 pK-5 justifyText">
                    Don't worry, <span className="fw-bold text-secondary-red">Adventurer</span>! We've got you covered!{" "}
                    <br /> As you've may noticed, any element that may require a dice roll will be highlighted when
                    hovered. If you click on it, a dice roll will be shown on the screen. The results of all your dice
                    rolls will be summarised at the bottom right of the screen with a label for the type of roll that
                    you performed. <br />
                    Excuse me <span className="fw-bold text-secondary-red">Adventurer</span>, what did you say? You want
                    to make a roll that we didn't plan? Say no more!
                    <br /> We have also thought of the most creative adventurers. At the left bottom of the screen you
                    will find a d20 button: this is your button if you want to perform a crazy roll! You can choose the
                    type and the number of dices that you want to throw; the results of this rolls will be found in the
                    bottom right as well.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="ms-4">
                  <VideoEmbed embedId="-dFROuC0LrM" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
