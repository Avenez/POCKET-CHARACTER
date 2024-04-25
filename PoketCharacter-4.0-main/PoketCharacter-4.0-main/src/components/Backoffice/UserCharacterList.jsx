import React from "react";
import { Row, Col } from "react-bootstrap";
import UserCharacterListElement from "./UserCharacterListElement";

export default function UserCharacterList(props) {
  let { characters, setdeletedcharacter } = props;

  return (
    <>
      <Col>
        <Row className="h-50">
          <Col>
            <Row className="p-2 fw-bold border-bottom border-2 border-black mt-2">
              <Col>
                {" "}
                <h5>Characters</h5>
              </Col>
            </Row>
            <Row className="p-3">
              <Col className="userCharacterCol">
                {characters != null &&
                  characters.map((item) => (
                    <UserCharacterListElement
                      key={item.idCharacter}
                      setdeletedcharacter={setdeletedcharacter}
                      character={item}
                    />
                  ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
}
