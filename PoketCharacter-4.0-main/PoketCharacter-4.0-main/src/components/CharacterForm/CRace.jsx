import React, { useEffect, useState } from "react";
import ChooseRace from "./RaceComponents/ChooseRace";
import { Row, Col } from "react-bootstrap";
import CustomSpinner from "../CustomSpinner/CustomSpinner";

//Componente che recupera la lista delle razze dall'API e per ogni elemento dell'oggetto recuperato, rrenderizza un componente dinamico "ChooseRace" al quale passa un oggetto race
export default function CRace() {
  //Salvo l'array di oggetti che si ottiene dalla fetch e aggiorno lo stato di caricamento
  const [races, setRaces] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Fetch del recupero delle razze dall'api
  const fetchRaces = async () => {
    setIsLoading(true);
    try {
      const url = "https://www.dnd5eapi.co/api/races";
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Errore durante la richiesta razze");
      }

      const data = await response.json();
      setRaces(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error("Si è verificaro un errore:", error);
    }
  };
  //-------------------------------------------

  // Al montaggio recupero i dati
  useEffect(() => {
    fetchRaces();
  }, []);

  return (
    <div className="w-100 p-5">
      {isLoading ? (
        <Row>
          <Col>
            <CustomSpinner />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Row className="rowContainer">
              <Col>
                {races.map((race) => (
                  <ChooseRace key={race.index} race={race} />
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
}
