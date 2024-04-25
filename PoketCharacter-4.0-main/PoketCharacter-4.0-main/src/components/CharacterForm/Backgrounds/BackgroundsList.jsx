import React, { useEffect, useState } from "react";
import { fetchBackGrounds } from "../../../FETCHES/CommonFetch";
import { Col, Container, Row } from "react-bootstrap";
import BackgroundModal from "./BackgroundModal";
import BackgroundItem from "./BackgroundItem";
import "./BackgroundStyle.scss";
import "../Class/ClassStyle.scss";
import CustomSpinner from "../../CustomSpinner/CustomSpinner";

export default function BackgroundsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [backgrounds, setBackgrounds] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        let backgroundsObj = await fetchBackGrounds();
        setBackgrounds(backgroundsObj);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <Container>
          <Row className="rowContainer">
            <Col>
              {backgrounds.map((back, index) => (
                <BackgroundItem key={index} back={back} />
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
