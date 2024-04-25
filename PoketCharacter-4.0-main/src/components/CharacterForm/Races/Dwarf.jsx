import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { fetchAnchestryType } from "../../../FETCHES/Dragonborne";
import { useDispatch, useSelector } from "react-redux";
import { addToolProf, resetToolProf, setRaceType } from "../../../REDUX/CharacterSlice";
import { nextIndex } from "../../../REDUX/FormSlice";
import { fetchDwarfTraits } from "../../../FETCHES/Dwarf";
import NextButton from "./NextButton";
import "./RacesDetails.scss";

export default function Dwarf(props) {
  const character = useSelector((state) => state.character.character);
  const dispatch = useDispatch();

  const [traits, setTraits] = useState(null);

  const addTool = (event) => {
    dispatch(resetToolProf());
    const type = event.target.value;
    if (type !== "Choose one Type of Tool") {
      dispatch(addToolProf(type));
    }
  };

  const race = props.race;
  const subrace = props.subrace;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dwarfTraitsResults = await fetchDwarfTraits();
        setTraits(dwarfTraitsResults);
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
            <h3>{subrace != null ? subrace.name : race.name}</h3>

            {isLoading ? (
              <Spinner animation="border" variant="danger" />
            ) : (
              <>
                {traits.map((trait) => (
                  <>
                    <Row key={trait.index}>
                      <Col>
                        <Accordion defaultActiveKey={trait.index}>
                          <Accordion.Item eventKey={trait.index} className="shadowElement">
                            <Accordion.Header>{trait.name}</Accordion.Header>
                            <Accordion.Body className="text-rich-black">
                              <Container>
                                <Row>
                                  <Col>
                                    <p className="text-start">{trait.desc[0]}</p>
                                    {trait.index === "tool-proficiency" && (
                                      <>
                                        <Form.Select
                                          aria-label="dwarf tools"
                                          className="border border-2 border-black m-1 p-2"
                                          onChange={addTool}
                                        >
                                          <option>Choose one Type of Tool</option>
                                          {trait.proficiency_choices.from.options.map((tool) => (
                                            <option key={tool.item.index} value={tool.item.index}>
                                              {tool.item.name}
                                            </option>
                                          ))}
                                        </Form.Select>
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
      {character.ToolProf.length > 0 && <NextButton />}
    </>
  );
}
