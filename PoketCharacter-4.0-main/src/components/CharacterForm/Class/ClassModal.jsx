import { useEffect, useState } from "react";
import { Accordion, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAbilitiesMastery,
  resetClassAbilities,
  resetFightingStyle,
  resetSavingProf,
  resetSubClassType,
  setAbilitiesMastery,
  setBc,
  setClassAbilities,
  setClassC,
  setFightingStyle,
  setLv,
  setRaceBonus,
  setSavingProf,
  setSubClassC,
  setSubClassTypeC,
} from "../../../REDUX/CharacterSlice";
import { fetchFeatures, genericFetch } from "../../../FETCHES/CommonFetch";
import PointsSelector from "./PointsSelector";
import { nextIndex } from "../../../REDUX/FormSlice";
import ExpertiseSelector from "./ExpertiseSelector";
import BarLoader from "../../CustomSpinner/BarLoader";

export default function ClassModal(props) {
  const dispatch = useDispatch();
  const classObj = props.cclass;
  const levels = props.levels;
  const features = props.features;

  const [isInvalid, setIsInvalid] = useState(false);
  const [subClass, setSubClass] = useState(null);
  const [subClassType, setSubClassType] = useState(null);
  const [characterlevel, setCharacterLevel] = useState(null);

  //-------------------POINTS-------------------
  const [selectPoints, setSelectPoints] = useState([]);
  const selectPointsFun = (value, i) => {
    if (value !== "NO") {
      const newArray = [...selectPoints];
      newArray[i] = value;
      setSelectPoints(newArray);
    }
  };

  const resetModal = () => {
    dispatch(resetFightingStyle());
    setSelectedClassExpertise([]);
    setSelectedClassSkills([]);
    setCharacterLevel(1);
    setSubClass(null);
    setSubClassType(null);
    dispatch(setLv(1));

    props.onHide();
  };

  // ----------------CLASS FORM CHECK------------

  const UpdateClass = () => {
    if (selectedClassSkills.length >= 2) {
      // ------Aggiorno la classe
      dispatch(setClassC(classObj.url));
      //-------Aggiorno la Sottoclasse
      dispatch(setSubClassC(classObj.subclasses[0].url));
      //-------Aggiorno subClassType (in caso di stragone)
      if (subClassType != null) {
        dispatch(setSubClassTypeC(subClassType));
      }
      //-------Aggiorno le Skill
      dispatch(setClassAbilities(selectedClassSkills));
      //-------Aggiorno caratteristiche

      selectPoints.forEach((item) => dispatch(setRaceBonus({ type: item, value: 1 })));

      //------Aggiorno le EXPERTISE
      if (selectedClassExpertise.length >= 0) {
        selectedClassExpertise.forEach((item) => dispatch(setAbilitiesMastery(item)));
      }

      //-----LIVELLO
      dispatch(setLv(characterlevel));
      dispatch(setBc(characterlevel));

      //----------TIRI SALVEZZA------------------
      classObj.saving_throws.forEach((item) => dispatch(setSavingProf(item.index)));

      //-----nextPage
      dispatch(nextIndex());
    } else {
      setIsInvalid(true);
    }
  };

  const sendClass = () => {
    setIsInvalid(false);
    if (characterlevel >= 8 && characterlevel <= 12) {
      if (selectPoints.length >= 4) {
        UpdateClass();
      } else {
        setIsInvalid(true);
      }
    } else if (characterlevel >= 4 && characterlevel <= 7) {
      if (selectPoints.length >= 2) {
        UpdateClass();
      } else {
        setIsInvalid(true);
      }
    } else {
      UpdateClass();
    }
  };

  // --------------------------------------------

  const setSubclassTypeChoice = (event) => {
    let choice = event.target.value;
    if (choice == "Select Ancestor") {
      setSubClassType(null);
    } else {
      setSubClassType(choice);
    }
  };

  const setClevel = (event) => {
    event.preventDefault();
    let levelSelected = parseInt(event.target.value);
    setCharacterLevel(levelSelected);
    dispatch(setLv(levelSelected));
    dispatch(setBc(levelSelected));
  };

  // ------------------SKILLS-------------------

  const [selectedClassSkills, setSelectedClassSkills] = useState([]);
  const [selected, setSelected] = useState(false);

  const addClassSkillToArray = (value, i) => {
    if (!selectedClassSkills.includes(value)) {
      const newArray = [...selectedClassSkills];

      newArray[i] = value;

      setSelectedClassSkills(newArray);
      setSelected(false);
    } else {
      setSelected(true);
    }
  };

  const elementi = [];

  for (let i = 0; i < classObj.proficiency_choices[0].choose; i++) {
    elementi.push(
      <Form.Select
        key={`id-for-${i}`}
        aria-label={`area-label-${i}`}
        className="border border-2 border-black mb-2 p-2"
        onChange={(e) => addClassSkillToArray(e.target.value, i)}
      >
        <option value="">Select Skill</option>
        {classObj.proficiency_choices[0].from.options.map((skill) => (
          <option key={skill.item.index} value={skill.item.index.substring(6)}>
            {skill.item.name.substring(7)}
          </option>
        ))}
      </Form.Select>
    );
  }

  // ------------------SKILLS EXPERTISE-------------------
  const [selectedClassExpertise, setSelectedClassExpertise] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState(false);

  const addClassSkillExpertiseToArray = (value, i) => {
    if (!selectedClassExpertise.includes(value)) {
      const newArray = [...selectedClassExpertise];

      newArray[i] = value;

      setSelectedClassExpertise(newArray);
      setSelectedExpertise(false);
    } else {
      setSelectedExpertise(true);
    }
  };

  // -------------------------------------------

  useEffect(() => {
    if (characterlevel == null) {
      setCharacterLevel(1);
    }
    dispatch(setLv(1));
    dispatch(setBc(1));
    dispatch(resetClassAbilities());
    dispatch(resetSubClassType());
    dispatch(resetAbilitiesMastery());
    dispatch(resetSavingProf());
    dispatch(resetFightingStyle());
    dispatch(resetFightingStyle());
    const fetch = async () => {
      let subClassObj = await genericFetch(classObj.subclasses[0].url);
      setSubClass(subClassObj);
    };

    fetch();
  }, []);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="bg-secondary-red text-white">
        <Modal.Title id="contained-modal-title-vcenter">Confirm Class</Modal.Title>
        <button className="btn btn-dark" onClick={() => resetModal()}>
          {" "}
          X{" "}
        </button>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Row>
                <Col sm={8}>
                  <h3>{classObj.name}</h3>

                  <p>
                    <span className="fw-bold">Hit Die:</span> d{classObj.hit_die}
                  </p>
                  <p>
                    <span className="fw-bold">Skills:</span> {classObj.proficiency_choices[0].desc}
                  </p>
                  <p>
                    <span className="fw-bold">Saves:</span> {classObj.saving_throws[0].name} &{" "}
                    {classObj.saving_throws[1].name}{" "}
                  </p>
                </Col>
                <Col>
                  <img src="" alt="" />
                </Col>
              </Row>
              {/* --------------------------SELETTORE DI LIVELLI-------------------- */}
              <Row className="mb-3 ">
                <Col sm={9}>
                  <h5 className="me-3">Choose Level:</h5>
                </Col>
                <Col>
                  <Form.Select
                    aria-label="levelSlect"
                    onChange={setClevel}
                    className="border border-2 border-black p-2"
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="border-top border-2 pt-3">
              <h4>Class Features</h4>

              {/* --------------------Skills-------------------- */}

              <>
                <Accordion className={isInvalid ? "mb-1 border border-danger border-2" : "mb-1"} defaultActiveKey={0}>
                  <Accordion.Item eventKey={0}>
                    <Accordion.Header>
                      <Row>
                        <Col>
                          <h5 className="mb-0">Skills</h5>
                          <br />
                          <p className="mb-0" style={{ fontSize: "0.8rem" }}>
                            1st level
                          </p>
                        </Col>
                      </Row>
                    </Accordion.Header>
                    <Accordion.Body className="text-rich-black">
                      <p>{classObj.proficiency_choices[0].desc}</p>
                      {selected && <p className="fw-bold text-danger">skill already selected </p>}
                      {elementi}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>

              {/* ------------------------------------------------- */}

              {features != null ? (
                features.map((feat) => (
                  <div key={`id-feat-pre-${feat.index}`}>
                    {feat.level <= characterlevel ? (
                      <div key={`id-feat-${feat.index}`}>
                        <Accordion
                          key={`id-${feat.index}`}
                          className={
                            isInvalid && feat.name === "Ability Score Improvement"
                              ? "mb-1 border border-danger border-2"
                              : "mb-1"
                          }
                        >
                          <Accordion.Item eventKey={feat.index}>
                            <Accordion.Header>
                              <Row>
                                <Col>
                                  <h5 className="mb-0">{feat.name}</h5>
                                  <br />
                                  <p className="mb-0" style={{ fontSize: "0.8rem" }}>
                                    {feat.level}st level
                                  </p>
                                </Col>
                              </Row>
                            </Accordion.Header>
                            <Accordion.Body className="text-rich-black">
                              {feat.desc.map((item, index) => (
                                <p key={`id-${index}`}>{item}</p>
                              ))}

                              {/* --------LISTA PER GLI STILI DI COMBATIMENTO O DI FEATURES SPECIFICHE DELLA CLASSE------------------- */}
                              {feat.feature_specific != null &&
                              feat.feature_specific.subfeature_options != null &&
                              feat.name !== "Fighting Style" ? (
                                <ul>
                                  {feat.feature_specific.subfeature_options.from != null &&
                                    feat.feature_specific.subfeature_options.from.options != null &&
                                    feat.feature_specific.subfeature_options.from.options.map((item) => (
                                      <li key={item.id}>{item.item.name}</li>
                                    ))}
                                </ul>
                              ) : (
                                <></>
                              )}

                              {feat.feature_specific != null &&
                              feat.feature_specific.subfeature_options != null &&
                              feat.name === "Fighting Style" ? (
                                <>
                                  <Form.Select
                                    aria-label="FightingStyle Selector"
                                    onChange={(e) => dispatch(setFightingStyle(e.target.value))}
                                    className="border border-2 border-black mb-2 p-2"
                                  >
                                    <option value="NO">Select Fighting Style</option>
                                    {feat.feature_specific.subfeature_options.from.options.map((skill, index) => (
                                      <option key={`id-${index}`} value={skill.item.url}>
                                        {skill.item.name}
                                      </option>
                                    ))}
                                  </Form.Select>
                                </>
                              ) : (
                                <></>
                              )}

                              {/* ------------------SELETTORE DI EXPERTISE PER LADRO E BARDO------------------ */}
                              {feat.name === "Expertise" && (feat.level === 1 || feat.level === 3) && (
                                <>
                                  {selectedExpertise && (
                                    <p className="fw-bold text-danger">Expertise already selected </p>
                                  )}
                                  <ExpertiseSelector
                                    position={0}
                                    skills={selectedClassSkills}
                                    exepertisefun={addClassSkillExpertiseToArray}
                                  />
                                  <ExpertiseSelector
                                    position={1}
                                    skills={selectedClassSkills}
                                    exepertisefun={addClassSkillExpertiseToArray}
                                  />
                                </>
                              )}
                              {feat.name === "Expertise" && (feat.level === 6 || feat.level === 10) && (
                                <>
                                  {selectedExpertise && (
                                    <p className="fw-bold text-danger">Expertise already selected </p>
                                  )}
                                  <ExpertiseSelector
                                    position={2}
                                    skills={selectedClassSkills}
                                    exepertisefun={addClassSkillExpertiseToArray}
                                  />
                                  <ExpertiseSelector
                                    position={3}
                                    skills={selectedClassSkills}
                                    exepertisefun={addClassSkillExpertiseToArray}
                                  />
                                </>
                              )}

                              {/* -----------------SELETTORE DI PUNTI ABILITA' PER CLASSE------------- */}
                              {/* ---------------SOLO LV 4 E 8 PER LA LIMITAZIONE AL LIVELLO 10------- */}
                              {feat.name === "Ability Score Improvement" && feat.level === 4 && (
                                <>
                                  <PointsSelector position={0} selectPointsFun={selectPointsFun} />
                                  <PointsSelector position={1} selectPointsFun={selectPointsFun} />
                                </>
                              )}

                              {feat.name === "Ability Score Improvement" && feat.level === 8 && (
                                <>
                                  <PointsSelector position={2} selectPointsFun={selectPointsFun} />
                                  <PointsSelector position={3} selectPointsFun={selectPointsFun} />
                                </>
                              )}
                              {/* ---------------------------------------------------------------------- */}
                              {/* --------------------selettore */}
                              {subClass != null && feat.name == subClass.subclass_flavor && (
                                <>
                                  <h6>Availebale Choice:</h6>
                                  <h5>{subClass.name}</h5>
                                  <p>{subClass.desc}</p>
                                  {feat.name === "Sorcerous Origin" && (
                                    <>
                                      <Form.Select
                                        aria-label="Default select example"
                                        onChange={setSubclassTypeChoice}
                                        className="border border-2 border-black m-1 p-2"
                                      >
                                        <option>Select Ancestor</option>
                                        <option value={"dragon-ancestor-black---acid-damage"}>
                                          Black - Acid Damage
                                        </option>
                                        <option value={"dragon-ancestor-blue---lightning-damage"}>
                                          Dragon Ancestor: Blue - Lightning Damage
                                        </option>
                                        <option value={"dragon-ancestor-brass---fire-damage"}>
                                          Dragon Ancestor: Brass - Fire Damage
                                        </option>
                                        <option value={"dragon-ancestor-bronze---lightning-damage"}>
                                          Dragon Ancestor: Bronze - Lightning Damage
                                        </option>
                                        <option value={"dragon-ancestor-copper---acid-damage"}>
                                          Dragon Ancestor: Copper - Acid Damage
                                        </option>
                                        <option value={"dragon-ancestor-gold---fire-damage"}>
                                          Dragon Ancestor: Gold - Fire Damage
                                        </option>
                                        <option value={"dragon-ancestor-green---poison-damage"}>
                                          Dragon Ancestor: Green - Poison Damage
                                        </option>
                                        <option value={"dragon-ancestor-red---fire-damage"}>
                                          Dragon Ancestor: Red - Fire Damage
                                        </option>
                                        <option value={"dragon-ancestor-silver---cold-damage"}>
                                          Dragon Ancestor: Silver - Cold Damage
                                        </option>
                                        <option value={"dragon-ancestor-white---cold-damage"}>
                                          Dragon Ancestor: White - Cold Damage
                                        </option>
                                      </Form.Select>
                                    </>
                                  )}
                                </>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))
              ) : (
                <Row className="mt-3">
                  <Col sm={12} className="d-flex justify-content-center align-items-center">
                    <BarLoader />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {isInvalid && <p class="text-danger">Some parameters have not been selected</p>}
        <Button onClick={() => resetModal()} className="btn btn-dark me-auto">
          <i className="bi bi-x-lg me-2"></i> Close
        </Button>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            sendClass();
          }}
        >
          Select <i className="bi bi-caret-right-fill ms-2"></i>
        </button>
      </Modal.Footer>
    </Modal>
  );
}
