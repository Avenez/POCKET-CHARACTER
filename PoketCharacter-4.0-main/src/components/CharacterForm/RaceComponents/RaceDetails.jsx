import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Dragonborne from "../Races/Dragonborne";
import {
  resetCharacterRace,
  resetCharacterStats,
  resetRaceAbilities,
  resetRaceStats,
  setRaceAbilities,
  setRaceBonus,
  setRaceStats,
  setStr,
} from "../../../REDUX/CharacterSlice";
import Dwarf from "../Races/Dwarf";
import Elf from "../Races/Elf";
import Gnome from "../Races/Gnome";
import HalfElf from "../Races/HalfElf";
import HalfOrc from "../Races/HalfOrc";
import Halfling from "../Races/Halfling";
import Human from "../Races/Halfling";
import { goTo, nextIndex } from "../../../REDUX/FormSlice";

import VanillaRace from "../Races/VanillaRace";
import CustomSpinner from "../../CustomSpinner/CustomSpinner";

export default function RaceDetails() {
  const dispatch = useDispatch();

  const race = useSelector((state) => state.character.character);
  const [isLoading, setIsLoading] = useState(false);

  const raceName = race.Race;
  const subRaceName = race.SubRace;

  const [raceObj, setRaceObj] = useState(null);
  const [subRaceObj, setSubRaceObj] = useState(null);

  useEffect(() => {
    dispatch(resetCharacterStats());
    dispatch(resetRaceStats());
    dispatch(resetRaceAbilities());
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const raceResponse = await fetch(`https://www.dnd5eapi.co/api/races/${raceName}`);
        if (!raceResponse.ok) {
          throw new Error("Errore durante la richiesta della razza");
        }
        const raceData = await raceResponse.json();
        setRaceObj(raceData);

        raceData.ability_bonuses.forEach((element) => {
          dispatch(setRaceBonus({ type: element.ability_score.name, value: element.bonus }));
          dispatch(setRaceStats({ type: element.ability_score.name, value: element.bonus }));

          raceData.starting_proficiencies.forEach((element) => {
            const index = element.index;
            const hyphenIndex = index.indexOf("-");
            if (hyphenIndex !== -1 && index.substring(0, hyphenIndex) === "skill") {
              const skillName = index.substring(hyphenIndex + 1);
              dispatch(setRaceAbilities(skillName));
            }
          });
        });

        if (subRaceName !== "none") {
          const subRaceResponse = await fetch(`https://www.dnd5eapi.co/api/subraces/${subRaceName}`);
          if (!subRaceResponse.ok) {
            throw new Error("Errore durante la richiesta della sottorazza");
          }
          const subRaceData = await subRaceResponse.json();
          setSubRaceObj(subRaceData);
          subRaceData.ability_bonuses.forEach((element) => {
            dispatch(setRaceBonus({ type: element.ability_score.name, value: element.bonus }));
            dispatch(setRaceStats({ type: element.ability_score.name, value: element.bonus }));
          });
        }
      } catch (error) {
        console.error("Si è verificato un errore:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [raceName, subRaceName]);

  if (isLoading || !raceObj) {
    return <CustomSpinner />;
  }

  if (raceObj.index === "dragonborn") {
    return (
      <>
        <Dragonborne race={raceObj} />
      </>
    );
  }
  //  ------------------DWARF
  if (raceObj.index === "dwarf") {
    return <Dwarf race={raceObj} subrace={subRaceObj} />;
  }

  // -------------------ELF
  if (raceObj.index === "elf") {
    return (
      <>
        <VanillaRace race={raceObj} subrace={subRaceObj} />
      </>
    );
  }

  // -------------------GNOME
  if (raceObj.index === "gnome") {
    return (
      <>
        <VanillaRace race={raceObj} subrace={subRaceObj} />
      </>
    );
  }

  // -------------------HALF-ELF
  if (raceObj.index === "half-elf") {
    return (
      <>
        <HalfElf race={raceObj} subrace={subRaceObj} />
      </>
    );
  }

  // -------------------HALF-ORC
  if (raceObj.index === "half-orc") {
    return (
      <>
        <VanillaRace race={raceObj} subrace={subRaceObj} />
      </>
    );
  }

  // -------------------HALFLING
  if (raceObj.index === "halfling") {
    return (
      <>
        <VanillaRace race={raceObj} subrace={subRaceObj} />
      </>
    );
  }

  // -------------------HUMAN
  if (raceObj.index === "human") {
    dispatch(nextIndex());
    return <></>;
  }

  // -------------------TIEFLING
  if (raceObj.index === "tiefling") {
    return (
      <>
        <VanillaRace race={raceObj} subrace={subRaceObj} />
      </>
    );
  }
}
