import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { nextIndex } from "../../../REDUX/FormSlice";
import { fetchTraits } from "../../../FETCHES/CommonFetch";
import { addToolProf, setRaceAbilities } from "../../../REDUX/CharacterSlice";

export default function HalfOrc(props) {
  const dispatch = useDispatch();
  const [traits, setTraits] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const race = props.race;
  const subrace = props.subrace;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Imposta isLoading su true all'inizio della richiesta

      const traitsToFetch = []; // Pulisce l'array prima di iniziare a riempirlo

      if (race && race.traits) {
        race.traits.forEach((trait) => traitsToFetch.push(trait.index));
      }

      if (subrace != null && subrace.racial_traits) {
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
            <h4>{subrace != null ? subrace.name : race.name}</h4>

            {isLoading ? (
              <Spinner animation="border" variant="danger" />
            ) : (
              <>
                {traits.map((trait) => (
                  <>
                    <Row key={trait.index}>
                      <Col>
                        <Accordion defaultActiveKey={trait.index}>
                          <Accordion.Item eventKey={trait.index}>
                            <Accordion.Header>{trait.name}</Accordion.Header>
                            <Accordion.Body>
                              <Container>
                                <Row>
                                  <Col>
                                    <p className="text-start">{trait.desc[0]}</p>
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

      <button className="btn btn-dark" type="button" onClick={() => dispatch(nextIndex())}>
        Next
      </button>
    </>
  );
}
