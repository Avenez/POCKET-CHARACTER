import React, { useEffect, useState } from "react";
import { Accordion, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { nextIndex } from "../../../REDUX/FormSlice";
import { fetchTraits } from "../../../FETCHES/CommonFetch";
import { addToolProf, setRaceAbilities } from "../../../REDUX/CharacterSlice";
import { Next } from "react-bootstrap/esm/PageItem";

export default function Human(props) {
  const dispatch = useDispatch();

  const race = props.race;
  const subrace = props.subrace;

  useEffect(() => {
    dispatch(nextIndex());
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h4>{subrace != null ? subrace.name : race.name}</h4>
          </Col>
        </Row>
      </Container>

      {/* <button className="btn btn-dark" type="button" onClick={() => dispatch(nextIndex())}>
        Next
      </button> */}
    </>
  );
}
