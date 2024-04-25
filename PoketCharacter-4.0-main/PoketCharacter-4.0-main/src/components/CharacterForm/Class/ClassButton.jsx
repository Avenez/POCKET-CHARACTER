import React, { useEffect, useState } from "react";
import { fetchClassLevels, fetchFeatures } from "../../../FETCHES/CommonFetch";
import { Col, Row } from "react-bootstrap";
import ClassModal from "./ClassModal";
import { useDispatch, useSelector } from "react-redux";
import { resetCharacterStats, setRaceBonus } from "../../../REDUX/CharacterSlice";

export default function ClassButton(prop) {
  const dispatch = useDispatch();
  const raceStats = useSelector((state) => state.character.raceStats);
  const [modalShow, setModalShow] = React.useState(false);
  const classObj = prop.class;
  const [isLoading, setIsLoading] = useState(true);
  const [levels, setLevels] = useState(null);
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    dispatch(resetCharacterStats());
    raceStats.forEach((stat) => dispatch(setRaceBonus(stat)));
    const fetchData = async () => {
      try {
        let className = classObj.index;
        const levelsObj = await fetchClassLevels(className);
        setLevels(levelsObj);

        if (levelsObj != null) {
          const featuresObj = await fetchFeatures(levelsObj);
          setFeatures(featuresObj);
        }
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
      <Row onClick={() => setModalShow(true)}>
        <Col>
          <Row className="classContainer">
            <Col className="d-flex justify-content-start align-items-center">
              <div className="classIconContainer">
                <img src={`/images/ClassesIcons/${classObj.name}.png`} alt="class icons" className="img-fluid" />
              </div>
              <h4>{classObj.name}</h4>
            </Col>
          </Row>
        </Col>
      </Row>

      <ClassModal
        features={features}
        cclass={classObj}
        levels={levels}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
