import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import "./DiceSidemenu.scss";
import D20Icon from "../ICONS/D20Icon";
import { rollDice } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import GeneralDice from "../ICONS/GeneralDice";
import { clearDices } from "../../REDUX/DicesSlice";
import { setIsOpen, setTypeOfTrow } from "../../REDUX/ResultSlice";

function DiceSideMenu() {
  // -----REDUX DICES STORE
  const dices = useSelector((state) => state.dices.dices);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  let trow = `${dices[0].counter}d4+${dices[1].counter}d6+${dices[2].counter}d8+${dices[3].counter}d10+${dices[4].counter}d12+${dices[5].counter}d20`;

  return (
    <>
      <div className="DiceSideMenuDiv">
        <Collapse in={open} className="CollapseStyle">
          <div id="DiceSideMenu">
            {/* -----------MAP DELLO STATO REDUX DEI DICE--------- */}
            {dices.map((dice) => (
              <GeneralDice
                key={`id-${dice.id}`}
                diceName={dice.name}
                diceId={dice.id}
                counter={dice.counter}
                svg={dice.svg}
                open={open}
              />
            ))}
          </div>
        </Collapse>
        <div className="d-flex justify-content-start">
          <button
            onClick={() => {
              setOpen(!open);
              dispatch(clearDices());
            }}
            aria-controls="DiceSideMenu"
            aria-expanded={open}
            className=" btn btn-danger mt-3 rounded-circle ms-3 p-2"
          >
            <img src="/images/d20.png" alt="dice icon" style={{ width: "40px" }} />
          </button>

          {open && (
            <>
              {/* <Button variant="danger" className="ms-3 h-50 my-auto fs-5" onClick={() => dispatch(clearDices())}>
                Reset
              </Button> */}
              <Button
                variant="dark"
                className="ms-3 h-50 my-auto fs-5"
                onClick={() => {
                  rollDice(trow);
                  setOpen(!open);
                  dispatch(setTypeOfTrow("customRoll"));
                  dispatch(setIsOpen(false));
                }}
              >
                Trow
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DiceSideMenu;
