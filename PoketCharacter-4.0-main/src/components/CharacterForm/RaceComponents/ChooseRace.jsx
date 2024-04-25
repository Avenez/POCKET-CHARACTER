import React, { useEffect, useState } from "react";
import SubRace from "./SubRace";
import NoSubrace from "./NoSubRace";
import { useDispatch } from "react-redux";
import {
  resetCharacterRace,
  resetCharacterStats,
  resetRaceAbilities,
  resetRaceStats,
  resetToolProf,
} from "../../../REDUX/CharacterSlice";
import "./ChooseRace.scss";

//Componente "DINAMICO"
//Questo componente:
//1) Esegue una fetch relativa alla singola razza
//2)controlla che ci sia un array di sottorazze e :
//      --Se esiste allora renderizza il componente "SubRace"
//      --Se NON esiste renderizza il componente "NoSubRace"
//3) ad entrambi viene passato come prop l'oggetto contenente la razza

export default function ChooseRace(props) {
  const dispatch = useDispatch();
  const raceObjShort = props.race;
  const [raceObjLong, setRaceObjectLong] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchRace = async () => {
    setIsLoading(true);
    try {
      const url = `https://www.dnd5eapi.co/api/races/${raceObjShort.index}`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        console.log("fetch RAZZE ERRORE");
        throw new Error("Errore durante la richiesta razze");
      }

      const data = await response.json();
      setRaceObjectLong(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Si è verificaro un errore:", error);
    }
  };

  useEffect(() => {
    dispatch(resetRaceStats());
    dispatch(resetCharacterRace());
    dispatch(resetCharacterStats());
    dispatch(resetToolProf());
    dispatch(resetRaceAbilities());
    fetchRace();
  }, []);

  if (isLoading) {
    // return <div className="spinner-border text-danger" role="status"></div>;
    return <div></div>;
  }

  if (!raceObjLong) {
    return <div>Caricamento...</div>;
  }

  if (raceObjLong.subraces && raceObjLong.subraces.length > 0) {
    return <SubRace race={raceObjLong} />;
  }

  return <NoSubrace race={raceObjLong} />;
}
