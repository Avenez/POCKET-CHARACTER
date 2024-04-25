import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { fetchAnchestryType } from "../../../FETCHES/Dragonborne";
import { useDispatch, useSelector } from "react-redux";
import { setRaceType } from "../../../REDUX/CharacterSlice";
import { nextIndex } from "../../../REDUX/FormSlice";
import NextButton from "./NextButton";
import "./RacesDetails.scss";

export default function Dragonborne(props) {
  const character = useSelector((state) => state.character.character);
  const dispatch = useDispatch();

  const changeRaceType = (event) => {
    const type = event.target.value;
    if (type != "Choose one Anchestry") {
      dispatch(setRaceType(type));
    } else {
      dispatch(setRaceType(""));
    }
  };

  const race = props.race;
  const [isLoading, setIsLoading] = useState(true);
  const [anchestryType, setAnchestryType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const anchestryTypeData = await fetchAnchestryType();
        setAnchestryType(anchestryTypeData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>{race.name}</h3>

            {isLoading ? (
              <Spinner animation="border" variant="danger" />
            ) : (
              <>
                <Row>
                  <Col>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0" className="shadowElement">
                        <Accordion.Header>Draconic Ancestry</Accordion.Header>
                        <Accordion.Body>
                          <Container>
                            <p className="text-rich-black">
                              You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table.
                              Your breath weapon and damage resistance are determined by the dragon type, as shown in
                              the table.
                            </p>
                            <Row className="text-rich-black">
                              <Col>
                                <h5>Dragon</h5>
                              </Col>
                              <Col>
                                <h5>Damage Type</h5>
                              </Col>
                              <Col>
                                <h5>Breath Weapon</h5>
                              </Col>
                            </Row>

                            <Row className="mt-2 mb-2">
                              <Col className="dragonRaceContainer">
                                {anchestryType.map((typeB) => (
                                  <Row key={typeB.index} className="p-1 dragonElement">
                                    <Col>{typeB.name.substring(19).replace(")", "")}</Col>
                                    <Col>{typeB.trait_specific.damage_type.name}</Col>
                                    <Col>
                                      {typeB.trait_specific.breath_weapon.area_of_effect.size}
                                      {typeB.trait_specific.breath_weapon.area_of_effect.type}
                                      {typeB.trait_specific.breath_weapon.dc.dc_type.name}
                                    </Col>
                                  </Row>
                                ))}
                              </Col>
                            </Row>

                            <Row>
                              <Col>
                                <Form.Select
                                  aria-label="Dragon Select"
                                  onChange={changeRaceType}
                                  className="border border-2 border-black m-1 p-2"
                                >
                                  <option>Choose one Anchestry</option>
                                  {anchestryType.map((typeB) => (
                                    <option key={typeB.index} value={typeB.index}>
                                      {typeB.name}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>
                            </Row>
                          </Container>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Accordion>
                      <Accordion.Item eventKey="1" className="shadowElement">
                        <Accordion.Header>Breath Weapon</Accordion.Header>
                        <Accordion.Body>
                          <Container>
                            <Row>
                              <Col>
                                <p className="text-start text-rich-black">
                                  You can use your action to exhale destructive energy. Your draconic ancestry
                                  determines the size, shape, and damage type of the exhalation. When you use your
                                  breath weapon, each creature in the area of the exhalation must make a saving throw,
                                  the type of which is determined by your draconic ancestry. The DC for this saving
                                  throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes
                                  2d6 damage on a failed save, and half as much damage on a successful one. The damage
                                  increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use
                                  your breath weapon, you can’t use it again until you complete a short or long rest.
                                </p>
                              </Col>
                            </Row>
                          </Container>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Accordion>
                      <Accordion.Item eventKey="2" className="shadowElement">
                        <Accordion.Header>Damage Resistance</Accordion.Header>
                        <Accordion.Body>
                          <Container>
                            <Row>
                              <Col>
                                <p className="text-start text-rich-black">
                                  You have resistance to the damage type associated with your draconic ancestry.
                                </p>
                              </Col>
                            </Row>
                          </Container>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
      {character.raceType !== "" && <NextButton />}
    </>
  );
}
