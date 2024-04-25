import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import RaceModal from "./RaceModal";
import { Container, Row, Col } from "react-bootstrap";

//Componente renderizzato nel caso di presenza di sottorazze

export default function SubRace(props) {
  const race = props.race;
  const [raceName, setRaceName] = useState("");
  const [subRace, setSubRace] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const showRace = (raceName) => {
    setRaceName(raceName);
    setModalShow(true);
  };
  //----------------- Fetch che permette il recupero della sottorazza.
  //questa è unica poichè l'api gratutita utilizzata presenta una solo sottorazza per ogni razza che ne abbia a disposizione (race.subraces[0])
  const fetchSubRace = async () => {
    try {
      const url = `https://www.dnd5eapi.co/api/subraces/${race.subraces[0].index}`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        console.log("fetch RAZZE ERRORE");
        throw new Error("Errore durante la richiesta razze");
      }

      const data = await response.json();
      setSubRace(data);
    } catch (error) {
      console.error("Si è verificaro un errore:", error);
    }
  };

  const [accordionOpen, setAccordionOpen] = useState(false);
  const handleAccordionToggle = () => {
    setAccordionOpen(!accordionOpen);
  };

  useEffect(() => {
    fetchSubRace();
  }, []);
  //-----------------------------------------------------------------------------------

  //Viene usato un accordion nel caso possano essercene più di una e viene renderizzato un div per ogni elemento presente
  //Ovviamente in caso di maggiorni sottorazze sarebbe necessario cambiare la fetch e la gestione dello stato
  return (
    <>
      <Accordion>
        <Accordion.Item
          eventKey="0"
          className="subRaceContainer shadowElement"
          onClick={() => {
            handleAccordionToggle();
          }}
        >
          <Accordion.Header>
            <img
              src={`/images/RacesIcons/${race.name}.png`}
              alt="raceIcon"
              className={accordionOpen ? "iconFilterOpen" : "iconFilter"}
            />

            <h5>{race.name}</h5>
          </Accordion.Header>
          <Accordion.Body>
            {race.subraces.map((subRace) => (
              <div key={subRace.index} className="subRaceElement" onClick={() => showRace(subRace.name)}>
                {subRace.name}
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* LA MODALE CHE VIENE ATTTIVATA PRENDE IN INGRESSO DELLE PROP PER MOSTARE I DATI DI RAZZA E SOTTORAZZA  */}
      <RaceModal
        race={race}
        subrace={subRace}
        racename={raceName}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
