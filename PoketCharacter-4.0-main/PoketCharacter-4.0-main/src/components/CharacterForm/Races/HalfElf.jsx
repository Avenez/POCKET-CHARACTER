import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { nextIndex } from "../../../REDUX/FormSlice";
import { fetchTraits } from "../../../FETCHES/CommonFetch";
import { addToolProf, setRaceAbilities, setRaceBonus, setRaceStats } from "../../../REDUX/CharacterSlice";
import NextButton from "./NextButton";
import "./RacesDetails.scss";

export default function HalfElf(props) {
  const dispatch = useDispatch();
  const [traits, setTraits] = useState(null);

  const [ablType, setAblType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const race = props.race;
  const subrace = props.subrace;

  const [skillA, setSkillA] = useState(null);
  const [skillB, setSkillB] = useState(null);

  const setAbilityScore = (typeAbl) => {
    dispatch(setRaceBonus({ type: typeAbl, value: 1 }));
    dispatch(setRaceStats({ type: typeAbl, value: 1 }));
    dispatch(setRaceAbilities(skillA));
    dispatch(setRaceAbilities(skillB));
    dispatch(nextIndex());
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Imposta isLoading su true all'inizio della richiesta

      const traitsToFetch = []; // Pulisce l'array prima di iniziare a riempirlo

      if (race && race.traits) {
        race.traits.forEach((trait) => traitsToFetch.push(trait.index));
      }

      if (subrace && subrace.racial_traits) {
        if (subrace.starting_proficiencies.length > 0) {
          subrace.starting_proficiencies.forEach((item) => {
            const marker = item.index.indexOf("-");
            if (item.index.substring(marker + 1) === "tools") {
              dispatch(addToolProf(item.index));
            } else if (item.index.includes("-")) {
              dispatch(setRaceAbilities(item.index.substring(marker)));
            }
          });
        }
        subrace.racial_traits.forEach((trait) => traitsToFetch.push(trait.index));
      }

      try {
        const traitsResults = await fetchTraits(traitsToFetch);
        setTraits(traitsResults);
        setIsLoading(false); // Imposta isLoading su false dopo aver ricevuto i dati
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Gestisci anche il caso di errore impostando isLoading su false
      }
    };

    fetchData();
  }, [race, subrace]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>{subrace != null ? subrace.name : race.name}</h3>

            {isLoading ? (
              <Spinner animation="border" variant="danger" />
            ) : (
              <>
                <Row>
                  <Col>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0" className="shadowElement">
                        <Accordion.Header>Ability Score Increase</Accordion.Header>
                        <Accordion.Body className="text-rich-black">
                          <Container>
                            <Row>
                              <Col>
                                <p className="text-start text-rich-black">
                                  Your Charisma score increases by 2, and two other ability scores of your choice
                                  increase by 1.
                                </p>
                                <Row>
                                  <Col>
                                    <Form.Select
                                      aria-label="HalfElf selector"
                                      className="border border-2 border-black m-1 p-2"
                                      onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        if (selectedValue !== "Choose one Ability to Increase") {
                                          setAblType(selectedValue);
                                        }
                                      }}
                                    >
                                      <option>Choose one Ability to Increase</option>
                                      {race.ability_bonus_options.from.options.map((typeB) => (
                                        <option key={typeB.ability_score.index} value={typeB.ability_score.name}>
                                          {typeB.ability_score.name}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Container>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>

                {traits.map((trait, index) => (
                  <>
                    <Row key={index}>
                      <Col>
                        <Accordion defaultActiveKey={trait.index}>
                          <Accordion.Item eventKey={trait.index} className="shadowElement">
                            <Accordion.Header>{trait.name}</Accordion.Header>
                            <Accordion.Body className="text-rich-black">
                              <Container>
                                <Row>
                                  <Col>
                                    <p className="text-start">{trait.desc[0]}</p>
                                    {/* ------TODO: INSERIRE SELECT PER LE ABILITA' IN CASO SI ABBIA "SKILLVERSATILITY" */}
                                    {trait.index === "skill-versatility" && (
                                      <>
                                        <Row>
                                          <Col>
                                            <Form.Select
                                              aria-label="HalfElf Select2"
                                              className="border border-2 border-black m-1 p-2"
                                              onChange={(e) => setSkillA(e.target.value)}
                                            >
                                              <option>Choose one Proficiencie</option>
                                              {trait.proficiency_choices.from.options
                                                .filter((typeA) => typeA.item.index.substring(6) !== skillB)
                                                .map((typeA) => (
                                                  <option key={typeA.item.index} value={typeA.item.index.substring(6)}>
                                                    {typeA.item.name.substring(7)}
                                                  </option>
                                                ))}
                                            </Form.Select>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <Col>
                                            <Form.Select
                                              aria-label="HalElf select3"
                                              className="border border-2 border-black m-1 p-2"
                                              onChange={(e) => setSkillB(e.target.value)}
                                            >
                                              <option>Choose one Proficiencie</option>
                                              {trait.proficiency_choices.from.options
                                                .filter((typeA) => typeA.item.index.substring(6) !== skillA)
                                                .map((typeA) => (
                                                  <option key={typeA.item.index} value={typeA.item.index.substring(6)}>
                                                    {typeA.item.name.substring(7)}
                                                  </option>
                                                ))}
                                            </Form.Select>
                                          </Col>
                                        </Row>
                                      </>
                                    )}
                                  </Col>
                                </Row>
                              </Container>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                    </Row>
                  </>
                ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
      {ablType !== "" && skillA != null && skillB != null && <NextButton />}
    </>
  );
}
