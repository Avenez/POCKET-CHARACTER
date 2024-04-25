import React, { useEffect, useState } from "react";
import { fetchCharacterList } from "../../../FETCHES/CommonFetch";
import { Link } from "react-router-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import CharacterCard from "./CharacterCard";
import AddCharacterButton from "./AddCharacterButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCharacterSpecifics, setEditMode } from "../../../REDUX/EditModeSlice";
import CustomSpinner from "../../CustomSpinner/CustomSpinner";
import { getCookie } from "../../../hooks/getCookie";

export default function CharacterList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [idUserNum, setIdUserNum] = useState(null);
  const [characterList, setCharacterList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedC, setDeletedC] = useState(false);

  useEffect(() => {
    if (getCookie() == null) {
      navigate("/Login");
    } else {
      let cookie = getCookie();
      dispatch(setEditMode(false));
      dispatch(resetCharacterSpecifics());
      const fetch = async (idUser) => {
        try {
          let characterListObj = await fetchCharacterList(idUser, cookie.token);
          setCharacterList(characterListObj);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          throw new Error(error);
        }
      };

      if (cookie != null) {
        setIdUserNum(cookie.idUser);
        fetch(cookie.idUser);
      }
    }
  }, [deletedC]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Row>
              {isLoading ? (
                <CustomSpinner />
              ) : characterList == null ? (
                <>
                  <div className="p-5">
                    <h3 className="display-4 border-bottom border-2 border-danger">No Hero Found</h3>
                  </div>
                  <div>
                    <AddCharacterButton />
                  </div>
                </>
              ) : (
                <>
                  <Row className="mt-4 g-3 row-cols-1 row-cols-lg-2 row-cols-xxl-3">
                    {characterList.map((item) => (
                      <CharacterCard key={item.idCharacter} character={item} setdeletedcharacter={setDeletedC} />
                    ))}
                  </Row>
                </>
              )}
            </Row>
          </Col>
        </Row>
        {characterList != null && characterList.length < 10 && <AddCharacterButton />}
      </Container>
    </>
  );
}
