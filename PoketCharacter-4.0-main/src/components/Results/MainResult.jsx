import { Button, Col, Container, Row } from "react-bootstrap";
import "./Results.scss";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setIsOpen } from "../../REDUX/ResultSlice";

const MainResults = () => {
  // ------STATE FROM REDUX
  const finaleResult = useSelector((state) => state.customResults.finalResults);
  const results = useSelector((state) => state.customResults.results);
  const isOpen = useSelector((state) => state.customResults.isOpen);
  const typeOfTrow = useSelector((state) => state.customResults.typeOfTrow);
  const colorTrow = useSelector((state) => state.customResults.colorTrow);

  //----------RESULT STRING GENERATOR
  const generateDiceString = (results) => {
    const diceStrings = results
      .map((dice) => {
        if (dice.rolls.length !== 0) {
          return `${dice.rolls.length}d${
            dice.rolls[0].sides === 4
              ? 4
              : dice.rolls[0].sides === 6
              ? 6
              : dice.rolls[0].sides === 8
              ? 8
              : dice.rolls[0].sides === 10
              ? 10
              : dice.rolls[0].sides === 12
              ? 12
              : 20
          }`;
        }
        return "";
      })
      .filter(Boolean);
    return diceStrings.join(" + ");
  };

  const showCustomResult = generateDiceString(results);

  // --------- CLOSE RESULTS
  const dispatch = useDispatch();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 1000, opacity: 0 }}
          transition={{ duration: 0.5, times: [0, 1] }}
          animate={{ x: 0, opacity: 1 }}
          //exit={{ x: 1000, opacity: 0 }}
        >
          <div key={showCustomResult} className={`MainresultDiv`}>
            <div id="typeOfTrow" className="trowType text-start">
              <span className={colorTrow}>{typeOfTrow}</span>
            </div>

            <Container>
              <Row>
                <Col className="text-center">
                  <h5 className="MainresultTextRow text-nowrap pe-3">{showCustomResult}</h5>
                </Col>
              </Row>
              <Row className="mt-0 midRow">
                <Col className="border-top border-secondary border-2"></Col>
                <Col xs={2}>
                  <div className="fs-1 resultSum ms-2 p-0 text-secondary">=</div>
                </Col>
                <Col className="border-top border-secondary border-2"></Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <h1 className="m-0">
                    <span className="text-result ps-3">{finaleResult.value}</span>
                  </h1>
                </Col>
                <Col xs={1}>
                  <Button variant="dark" className="fw-bold" onClick={() => dispatch(setIsOpen(false))}>
                    X
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainResults;
