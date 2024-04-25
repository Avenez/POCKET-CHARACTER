import React, { useEffect, useState } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CharacterDetails from "./CharacterDetails";
import { CustomResults } from "../../Results/CustomResults";
import DiceSideMenu from "../../DiceSideMenu/DiceSideMenu";
import CharacterAbilities from "./CharacterAbilities";
import SavingTrows from "./SavingTrows";
import {
  fetchBackGround,
  fetchCharacter,
  fetchClass,
  fetchFeatures,
  fetchTraits,
  genericFetch,
  subRaceFetchTraits,
} from "../../../FETCHES/CommonFetch";
import Skills from "./Skills";
import "./CharacterSheetStyle.scss";
import ArmorClass from "./ArmorClass";
import HitPoints from "./HitPoints";
import DeathSaves from "./DeathSaves";
import Attacks from "./Attacks";
import Spells from "./Spells";
import ClassFeatures from "./FEATURES/ClassFeatures";
import BackgroundFeature from "./FEATURES/BackgroundFeature";
import RaceFeatures from "./FEATURES/RaceFeatures";
import EditControls from "./EditControls";
import SpellsList from "./SPELLS/SpellsList";
import SpellSlotsTable from "./SPELLS/SpellSlotsTable";
import CustomSpinner from "../../CustomSpinner/CustomSpinner";
import { useNavigate } from "react-router-dom";

export default function CharacterSheetMain() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(null);
  //-----CLASS
  const [chaClass, setChaClass] = useState(null);
  //-----SUB CLASS
  const [chaSubClass, setChaSubClass] = useState(null);
  //-----BACKGROUND
  const [chaBackground, setChaBackground] = useState(null);
  //-----RACE TRAITS
  const [chaRaceTraits, setChaRaceTraits] = useState(null);

  //-----SUB RACE TRAITS
  const [chaSubRaceTraits, setChaSubRaceTraits] = useState(null);

  //-----CLASS LEVELS FEATURES
  const [chaLevelsFeatures, setChaLevelsFeatures] = useState(null);

  //-----SUBCLASS LEVELS FEATURES
  const [subClassLevelsFeatures, setSubClassLevelsFeatures] = useState(null);

  //!-----FIGHTING STYLE
  const [fightingStyle, setFightingStyle] = useState(null);

  //!-----SPELLS
  const [spells, setSpells] = useState(null);
  const [levelsForSpells, setLevelsForSpells] = useState(null);

  //----SHEET SWITCH
  const [sheetSwitch, setSheetSwitch] = useState("STATS");
  const [prevState, setPrevState] = useState(null);

  const handleSwitchChange = (newState) => {
    setPrevState(sheetSwitch); // Memorizza lo stato precedente
    setSheetSwitch(newState); // Imposta il nuovo stato
  };
  //------MODIFY MODE ON
  const [modifyMod, setModifyMode] = useState(false);

  //--------CHARACTER SPECIFIC
  const [characterSpecifics, setCharacterSpecifics] = useState({
    idCharacter: parseInt(characterId),
    Ca: 10,
    Tpcm: 0,
    Tpcd: 0,
    Tpci: 0,
  });

  const handleCharacterSpecificsChange = (event) => {
    let { name, value } = event.target;
    setCharacterSpecifics({
      ...characterSpecifics,
      [name]: parseInt(value),
    });
  };

  const sendCharacterSpecifics = async () => {
    try {
      const response = await fetch(`https://localhost:7106/api/Character/${characterSpecifics.idCharacter}/partial`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characterSpecifics),
      });

      if (!response.ok) {
        throw new Error("Failed to update character specifics");
      }

      // Gestire eventuali azioni dopo un aggiornamento riuscito, ad esempio un messaggio di successo
      console.log("Character specifics updated successfully");
      window.location.reload();
    } catch (error) {
      // Gestire eventuali errori durante la richiesta
      console.error("Error updating character specifics:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //------CHARACTER
        const charToFetch = await fetchCharacter(characterId);
        setCharacter({
          idCharacter: characterId,
          idUser: charToFetch?.idUser,
          Name: charToFetch?.name,
          Race: charToFetch?.race,
          RaceType: charToFetch?.raceType,
          SubRace: charToFetch?.subRace,
          Lv: charToFetch?.lv,
          BC: charToFetch?.bc,
          Backgorund: charToFetch?.backgorund,
          Class: charToFetch?.class,
          SubClass: charToFetch?.subClass,
          SubClassType: charToFetch?.subClassType,
          FightingStyle: charToFetch?.fightingStyle,
          STR: charToFetch?.str,
          DEX: charToFetch?.dex,
          CON: charToFetch?.con,
          INT: charToFetch?.int,
          WIS: charToFetch?.wis,
          CHA: charToFetch?.cha,
          CA: charToFetch?.ca,
          TPCM: charToFetch?.tpcm,
          TPCD: charToFetch?.tpcd,
          TPCI: charToFetch?.tpci,
          ToolProf: charToFetch?.toolProf ? JSON.parse(charToFetch.toolProf) : [],
          AbilitiesProf: charToFetch?.abilitiesProf ? JSON.parse(charToFetch.abilitiesProf) : [],
          AbilitiesMastery: charToFetch?.abilitiesMastery ? JSON.parse(charToFetch.abilitiesMastery) : [],
          SavingProf: charToFetch?.savingProf ? JSON.parse(charToFetch.savingProf) : [],
          visible: true,
        });

        setCharacterSpecifics({
          ...characterSpecifics,
          Ca: charToFetch?.ca,
          Tpcm: charToFetch?.tpcm,
          Tpcd: charToFetch?.tpcd,
          Tpci: charToFetch?.tpci,
        });

        //------CLASS------------
        let chaClassToFetch = await genericFetch(charToFetch?.class);
        setChaClass(chaClassToFetch);
        //-----------------------
        //-----SUB CLASS---------
        let chaSubClassToFetch = await genericFetch(charToFetch?.subClass);
        setChaSubClass(chaSubClassToFetch);
        //-----------------------

        //-----BACKGROUND---------
        let chaBackground = await fetchBackGround(charToFetch?.backgorund);
        setChaBackground(chaBackground);
        //-----------------------

        //-----RACE TRAITS---------
        let chaRaceToFetch = await genericFetch(`/api/races/${charToFetch?.race}`);
        let chaRaceTraitsToFetch = await subRaceFetchTraits(chaRaceToFetch.traits);
        setChaRaceTraits(chaRaceTraitsToFetch);
        //-----------------------

        //----SUB RACE TRAITS
        if (charToFetch?.subRace != "none") {
          let chaSubRaceToFetch = await genericFetch(`/api/subraces/${charToFetch?.subRace}`);
          let chaSubRaceTraitsToFetch = await subRaceFetchTraits(chaSubRaceToFetch.racial_traits);
          setChaSubRaceTraits(chaSubRaceTraitsToFetch);
        }

        //-----CLASS LEVELS FEATURES---------
        let chaLevelsToFetch = await genericFetch(`${charToFetch?.class}/levels`);
        setLevelsForSpells(chaLevelsToFetch);
        let chaLevelsFeaturesToFetch = await fetchFeatures(chaLevelsToFetch);
        setChaLevelsFeatures(chaLevelsFeaturesToFetch);
        //-----------------------

        //-----SUB CLASS LEVELS FEATURES---------
        let subClassLevelsToFetch = await genericFetch(`${charToFetch?.subClass}/levels`);
        let subClassLevelsFeaturesToFetch = await fetchFeatures(subClassLevelsToFetch);
        setSubClassLevelsFeatures(subClassLevelsFeaturesToFetch);
        //-----------------------

        //!-----FIGHTING STYLE
        if (charToFetch.fightingStyle != null && charToFetch.fightingStyle !== "") {
          let fightingStyleToFetch = await genericFetch(charToFetch.fightingStyle);
          setFightingStyle(fightingStyleToFetch);
        }

        //!-----SPELLS
        if (chaClassToFetch != null) {
          let spellList = await genericFetch(chaClassToFetch.spells);
          setSpells(spellList);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [characterId]);

  return (
    <>
      {isLoading ? (
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <CustomSpinner />
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Container className="" style={{ marginBottom: "100px" }}>
            <CharacterDetails
              character={character}
              background={chaBackground}
              cClass={chaClass}
              subclass={chaSubClass}
            />

            <Row className="border border-3 border-black mt-3 rounded-3 slide-in-bottom">
              <Col>
                <Row className="fw-bold">
                  <Col
                    className={
                      sheetSwitch === "STATS"
                        ? "bg-dark text-white  p-2 switchElement cursor "
                        : "bg-silver text-secondary border-end border-2 border-black  switchElement p-2 cursor"
                    }
                    onClick={() => {
                      handleSwitchChange("STATS");
                    }}
                  >
                    STATS
                  </Col>
                  <Col
                    className={
                      sheetSwitch === "FEATURES"
                        ? "bg-dark text-white  p-2 switchElement cursor "
                        : "bg-silver text-secondary   switchElement p-2 cursor"
                    }
                    onClick={() => {
                      handleSwitchChange("FEATURES");
                    }}
                  >
                    FEATURES
                  </Col>
                  {spells != null && (
                    <Col
                      className={
                        sheetSwitch === "SPELLS"
                          ? "bg-dark text-white  p-2 switchElement cursor "
                          : "bg-silver text-secondary border-start border-2 border-black switchElement p-2 cursor"
                      }
                      onClick={() => {
                        handleSwitchChange("SPELLS");
                      }}
                    >
                      SPELLS
                    </Col>
                  )}
                </Row>
                {sheetSwitch === "FEATURES" && (
                  <>
                    <Row className={prevState === "SPELLS" ? "slide-in-left bg-white" : "slide-in-right bg-white"}>
                      <Col>
                        <Row className="p-1 row-cols-1 row-cols-lg-2 gx-5 gy-2 mt-3">
                          <Col>
                            <BackgroundFeature background={chaBackground} />
                          </Col>
                          {chaRaceTraits.length > 0 && (
                            <Col>
                              <RaceFeatures race={chaRaceTraits} subrace={chaSubRaceTraits} character={character} />
                            </Col>
                          )}
                          <Col>
                            <ClassFeatures
                              title={`${chaClass.name.toUpperCase()} FEATURES`}
                              className={chaClass}
                              features={chaLevelsFeatures}
                              level={character.Lv}
                              fightingstyle={fightingStyle}
                              character={character}
                            />
                          </Col>
                          {subClassLevelsFeatures[0].level <= character.Lv && (
                            <Col>
                              <ClassFeatures
                                title={`${chaSubClass.name.toUpperCase()} FEATURES`}
                                className={chaClass}
                                features={subClassLevelsFeatures}
                                level={character.Lv}
                              />
                            </Col>
                          )}
                        </Row>
                      </Col>
                    </Row>
                  </>
                )}

                {sheetSwitch === "STATS" && (
                  <>
                    <Row className="p-1 slide-in-left bg-white">
                      <Col className="">
                        <CharacterAbilities character={character} />
                        <Row className="row-cols-1 row-cols-md-2 mt-3">
                          <Col>
                            <Skills character={character} />
                          </Col>
                          <Col>
                            <Row>
                              <Col>
                                <ArmorClass
                                  handlechange={handleCharacterSpecificsChange}
                                  characterspecifics={characterSpecifics}
                                  modify={modifyMod}
                                  character={character}
                                />
                              </Col>
                            </Row>
                            <Row className="p-2">
                              <Col>
                                <HitPoints classObj={chaClass} character={character} />
                              </Col>
                            </Row>
                            <Row className="p-2">
                              <Col>
                                <DeathSaves />
                              </Col>
                            </Row>
                            <Row className="p-2">
                              <Col>
                                <Attacks
                                  handlechange={handleCharacterSpecificsChange}
                                  characterspecifics={characterSpecifics}
                                  modify={modifyMod}
                                  classObj={chaClass}
                                  character={character}
                                />
                              </Col>
                            </Row>
                            <Row className="p-2">
                              <Col>
                                <Spells
                                  handlechange={handleCharacterSpecificsChange}
                                  characterspecifics={characterSpecifics}
                                  modify={modifyMod}
                                  classObj={chaClass}
                                  character={character}
                                />
                              </Col>
                            </Row>
                            <Row className="mt-5">
                              <Col>
                                <EditControls
                                  sendmod={sendCharacterSpecifics}
                                  modify={modifyMod}
                                  setmodify={setModifyMode}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </>
                )}

                {sheetSwitch === "SPELLS" && (
                  <>
                    {spells != null && (
                      <Row className="slide-in-right bg-white">
                        <Col>
                          <SpellSlotsTable spellslevels={levelsForSpells} />
                          <SpellsList spells={spells} />
                        </Col>
                      </Row>
                    )}
                  </>
                )}
              </Col>
            </Row>
            <button
              type="button"
              className="charactersButton"
              onClick={() => {
                navigate("/Characters");
              }}
            >
              Characters
              <img src="\images\quill.png" alt="d20" className="diceIconHome" />
            </button>
          </Container>
          <CustomResults />
          <DiceSideMenu />
        </>
      )}
    </>
  );
}
