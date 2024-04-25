import "./UserProfileStyle.scss";
import "../Backoffice/BackofficeMain.scss";
import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchCharacterList, fetchUser } from "../../FETCHES/CommonFetch";
import UserCharacterList from "../Backoffice/UserCharacterList";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import { useNavigate } from "react-router-dom";
import UserProfileData from "./UserProfileData";
import UserProfileEditMode from "./UserProfileEditMode";
import { getCookie } from "../../hooks/getCookie";
import Toast from "react-bootstrap/Toast";
import { useSelector, useDispatch } from "react-redux";
import { setUserCharacterDelete, setUserUpdated } from "../../REDUX/NotificationsSlice";

export default function UserProfile() {
  const navigate = useNavigate();
  let { idUser } = useParams();
  const [user, setUser] = useState(null);
  const [characterList, setCharacterList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saveMode, setSaveMode] = useState(false);
  const [deletedC, setDeletedC] = useState(false);

  const [profile, setProfile] = useState(getCookie());
  const dispatch = useDispatch();
  const closeToast = (value) => {
    dispatch(setUserUpdated(value));
    dispatch(setUserCharacterDelete(value));
  };
  const showUpdate = useSelector((state) => state.notifications.userUpdated);
  const showUserCharacterDelete = useSelector((state) => state.notifications.userCharacterDelete);

  useEffect(() => {
    const profileToCheck = getCookie();
    if (idUser != null && idUser == profileToCheck.idUser) {
      const fetch = async (idUser) => {
        try {
          setIsLoading(true);
          let userObj = await fetchUser(idUser);
          setUser(userObj);

          let characterListObj = await fetchCharacterList(idUser);
          setCharacterList(characterListObj);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };

      fetch(idUser);
    } else {
      navigate("/");
    }
  }, [saveMode, deletedC]);

  const fetchDataUser = async () => {
    try {
      setIsLoading(true);
      let userObj = await fetchUser(idUser);
      setUser(userObj);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <Container>
          <Row className="mt-5">
            <Col>
              <Row className="row-cols-1 row-cols-md-2">
                {editMode ? (
                  <UserProfileEditMode
                    key={saveMode}
                    setsavemode={setSaveMode}
                    user={user}
                    isloading={isLoading}
                    seteditmode={setEditMode}
                    fetchData={fetchDataUser}
                  />
                ) : (
                  <UserProfileData key={saveMode} seteditmode={setEditMode} user={user} isloading={isLoading} />
                )}
                {characterList != null && (
                  <UserCharacterList setdeletedcharacter={setDeletedC} characters={characterList} />
                )}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <button
                className="charactersButton"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
                <img src="\images\d20.png" alt="d20" className="diceIconHome" />
              </button>
            </Col>
          </Row>
          <Toast
            bg={"dark"}
            onClose={() => {
              closeToast(false);
            }}
            show={showUpdate}
            delay={3000}
            autohide
            className="toastLogin"
          >
            <Toast.Header>
              <strong className="me-auto text-warning">Update</strong>
              <small></small>
            </Toast.Header>
            <Toast.Body className="fw-bold text-warning">Profile Updated</Toast.Body>
          </Toast>
          <Toast
            bg={"dark"}
            onClose={() => {
              closeToast(false);
            }}
            show={showUserCharacterDelete}
            delay={3000}
            autohide
            className="toastLogin"
          >
            <Toast.Header>
              <strong className="me-auto text-warning">Delete</strong>
              <small></small>
            </Toast.Header>
            <Toast.Body className="fw-bold text-warning">Character Deleted</Toast.Body>
          </Toast>
        </Container>
      )}
    </>
  );
}
