import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { rollDice } from "../../../App";
import { useDispatch } from "react-redux";
import { setIsOpen, setTypeOfTrow } from "../../../REDUX/ResultSlice";

export default function SavingElement(props) {
  let { ability, value, mod } = props;
  const dispatch = useDispatch();
  let [prof, setProf] = useState(false);

  let trow = prof ? `1d20+${mod + +value.BC}` : `1d20+${mod}`;

  useEffect(() => {
    if (value.SavingProf.includes(ability.type.toLowerCase())) {
      setProf(true);
    }
  }, []);

  return (
    <Col
      onClick={() => {
        rollDice(trow);
        dispatch(setTypeOfTrow("savingRoll"));
        dispatch(setIsOpen(false));
      }}
    >
      <Row className="bg-dark cursor">
        <Col>
          <h6 className="text-white text-start">SAVE</h6>
        </Col>
      </Row>
      <Row className="cursor">
        <Col>
          <div style={{ position: "relative" }} className="p-2">
            <h4 className="">{prof ? `+${mod + +value.BC}` : `+${mod}`}</h4>
            {prof && (
              <i
                className="bi bi-check2-square fs-4 m-0 p-0 text-white"
                style={{ position: "absolute", right: "0", top: "-60%" }}
              ></i>
            )}
          </div>
        </Col>
      </Row>
    </Col>
  );
}
