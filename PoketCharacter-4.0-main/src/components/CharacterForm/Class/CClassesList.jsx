import React, { useEffect, useState } from "react";
import { fetchClass, fetchClasses } from "../../../FETCHES/CommonFetch";
import ClassButton from "./ClassButton";
import { Col, Container, Row } from "react-bootstrap";
import "./ClassStyle.scss";
import CustomSpinner from "../../CustomSpinner/CustomSpinner";

export default function CClassesList() {
  const [classes, setClasses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [classesObjL, setClassesObjL] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Classes = await fetchClasses();
        setClasses(Classes.results);

        const classObjPromises = Classes.results.map((item) => fetchClass(item.index));
        const classesObjList = await Promise.all(classObjPromises);
        setClassesObjL(classesObjList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          <Container>
            <Row className="rowContainer">
              <Col className="col-1"></Col>
              <Col>
                {classesObjL && classesObjL.map((classObj) => <ClassButton key={classObj.index} class={classObj} />)}
              </Col>
              <Col className="col-1"></Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
