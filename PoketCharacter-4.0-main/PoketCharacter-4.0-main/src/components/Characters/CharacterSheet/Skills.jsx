import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import "./CharacterSheetStyle.scss";
import { rollDice } from "../../../App";
import { setIsOpen, setTypeOfTrow } from "../../../REDUX/ResultSlice";
import { useDispatch } from "react-redux";

export default function Skills(props) {
  let { character } = props;

  const dispatch = useDispatch();

  const modifierCalc = (value) => {
    let mod = 0;

    if (value >= 12 && value <= 13) {
      mod = 1;
    } else if (value >= 14 && value <= 15) {
      mod = 2;
    } else if (value >= 16 && value <= 17) {
      mod = 3;
    } else if (value >= 18 && value <= 19) {
      mod = 4;
    } else if (value >= 20 && value <= 21) {
      mod = 5;
    }

    return mod;
  };

  const setSkillBonus = (profArray, masterArray, characterObj, skill) => {
    let key = skill.value.toUpperCase();
    let abilityScore = characterObj[key] || 0;

    let bonus = modifierCalc(abilityScore);

    if (masterArray.includes(skill.type)) {
      bonus += characterObj.BC * 2;
    } else if (profArray.includes(skill.type)) {
      bonus += characterObj.BC;
    }

    return bonus;
  };

  const [skillsList, setSkillsList] = useState([
    {
      index: 1,
      type: "acrobatics",
      name: "Acrobatics",
      value: "Dex",
    },
    {
      index: 2,
      type: "animal-handling",
      name: "Animal Handling",
      value: "Wis",
    },
    {
      index: 3,
      type: "arcana",
      name: "Arcana",
      value: "Int",
    },
    {
      index: 4,
      type: "athletics",
      name: "Athletics",
      value: "Str",
    },
    {
      index: 5,
      type: "deception",
      name: "Deception",
      value: "Cha",
    },
    {
      index: 6,
      type: "history",
      name: "History",
      value: "Int",
    },
    {
      index: 7,
      type: "insight",
      name: "Insight",
      value: "Wis",
    },
    {
      index: 8,
      type: "intimidation",
      name: "Intimidation",
      value: "Cha",
    },
    {
      index: 9,
      type: "investigation",
      name: "Investigation",
      value: "Int",
    },
    {
      index: 10,
      type: "medicine",
      name: "Medicine",
      value: "Wis",
    },
    {
      index: 11,
      type: "nature",
      name: "Nature",
      value: "Int",
    },
    {
      index: 12,
      type: "perception",
      name: "Perception",
      value: "Wis",
    },
    {
      index: 13,
      type: "performance",
      name: "Performance",
      value: "Cha",
    },
    {
      index: 14,
      type: "persuasion",
      name: "Persuasion",
      value: "Cha",
    },
    {
      index: 15,
      type: "Religion",
      name: "Religion",
      value: "Int",
    },
    {
      index: 16,
      type: "sleight-of-hand",
      name: "Sleight of Hand",
      value: "Dex",
    },
    {
      index: 17,
      type: "stealth",
      name: "Stealth",
      value: "Dex",
    },
    {
      index: 18,
      type: "survival",
      name: "Survival",
      value: "Wis",
    },
  ]);

  return (
    <>
      <Row className="border border-2 border-black rounded-3 mb-3">
        <Col>
          <Row className="fw-bold text-center bg-dark text-white p-1">
            <Col className="col-1">M</Col>
            <Col className="col-1">P</Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
          <div className="">
            {skillsList.map((skill) => (
              <Row
                key={skill.index}
                className="p-1 pb-2 pt-2 skillElement"
                onClick={() => {
                  rollDice(
                    `1d20+${setSkillBonus(character.AbilitiesProf, character.AbilitiesMastery, character, skill)}`
                  );
                  dispatch(setTypeOfTrow("skillRoll"));
                  dispatch(setIsOpen(false));
                }}
              >
                <Col className="col-1">
                  {character.AbilitiesMastery.includes(skill.type) ? (
                    <i className="bi bi-circle-fill"></i>
                  ) : (
                    <i className="bi bi-circle"></i>
                  )}
                </Col>
                <Col className="col-1">
                  {character.AbilitiesProf.includes(skill.type) ? (
                    <i className="bi bi-circle-fill"></i>
                  ) : (
                    <i className="bi bi-circle"></i>
                  )}
                </Col>
                <Col className="col-2">
                  + {setSkillBonus(character.AbilitiesProf, character.AbilitiesMastery, character, skill)}
                </Col>
                <Col className="col-auto">
                  {skill.name}{" "}
                  <Badge pill bg="secondary">
                    {skill.value}
                  </Badge>{" "}
                </Col>
                <Col></Col>
              </Row>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
}
