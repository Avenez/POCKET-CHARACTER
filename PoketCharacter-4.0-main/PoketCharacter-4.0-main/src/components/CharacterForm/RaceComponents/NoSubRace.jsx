import React, { useState } from "react";
import RaceModal from "./RaceModal";

//Componente per lo show di una raqzza che non presenta sottorazze
export default function NoSubrace(props) {
  const [modalShow, setModalShow] = React.useState(false);

  const race = props.race;

  return (
    <>
      <div className="raceContainer shadowElement" onClick={() => setModalShow(true)}>
        <img src={`/images/RacesIcons/${race.name}.png`} alt="raceIcon" className="iconFilter" />

        <h5>{race.name}</h5>
      </div>

      <RaceModal race={race} subrace={null} racename={race.name} show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
