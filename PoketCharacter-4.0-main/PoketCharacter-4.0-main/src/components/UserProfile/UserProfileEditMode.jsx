import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Form } from "react-router-dom";
import CustomSpinner from "../CustomSpinner/CustomSpinner";
import BarLoader from "../CustomSpinner/BarLoader";
import { getCookie } from "../../hooks/getCookie";
import { useDispatch } from "react-redux";
import { setUserUpdated } from "../../REDUX/NotificationsSlice";

export default function UserProfileEditMode(props) {
  let { user, isloading } = props;
  const dispatch = useDispatch();
  const [isUploaded, setIsUploaded] = useState(false);
  const [userToEdit, setUserToEdit] = useState({
    idUser: user.idUser,
    username: user.username,
    email: user.email,
    password: user.password,
    role: "User",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserToEdit({
      ...userToEdit,
      [name]: value,
    });
  };

  async function updateUser(userId, userData, token) {
    try {
      const response = await fetch(`https://localhost:7106/api/User/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        dispatch(setUserUpdated(true));
        return true;
      }
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Richiesta non valida");
        } else if (response.status === 404) {
          throw new Error("Utente non trovato");
        } else {
          throw new Error("Si è verificato un errore durante l'aggiornamento dell'utente");
        }
      }

      return response;
    } catch (error) {
      console.error("Errore durante l'aggiornamento dell'utente:", error.message);
      throw error;
    }
  }

  const saveChanges = async (event) => {
    event.preventDefault();
    setIsUploaded(true);
    let cookie = getCookie();
    let checkEdit = await updateUser(user.idUser, userToEdit, cookie.token);
    if (checkEdit) {
      props.setsavemode(true);
      setIsUploaded(false);
      await props.fetchData();
      props.seteditmode(false);
    }
  };

  return (
    <Col className="mb-3 flip-in-ver-right">
      <Row className="border border-2 border-dark rounded-2 p-3">
        <Col>
          <Row className="bg-dark text-bg-dark pt-2 mb-3">
            <Col className="">
              <h5 className="text-start">User Data</h5>
            </Col>
          </Row>
          {isUploaded && (
            <Row>
              <Col className="">
                <BarLoader />
              </Col>
            </Row>
          )}

          {isloading ? (
            <CustomSpinner />
          ) : (
            <>
              <form onSubmit={saveChanges} className="userEditForm">
                <Row className="mt-4">
                  <Col>
                    <div className="text-end">
                      <button
                        className="btn btn-dark me-2"
                        onClick={() => {
                          props.seteditmode(false);
                        }}
                      >
                        <i className="bi bi-arrow-return-left"></i> Back
                      </button>
                      <button type="submit" className="btn btn-outline-success">
                        <i className="bi bi-floppy-fill"></i> Save
                      </button>
                    </div>
                  </Col>
                </Row>
                <Row className="text-start mb-2">
                  <Col>
                    <h6>Username</h6>
                    <input
                      className="mb-2"
                      type="text"
                      value={userToEdit.username}
                      name="username"
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row className="text-start mb-2">
                  <Col>
                    <h6>Email</h6>
                    <input
                      className="mb-2"
                      type="text"
                      value={userToEdit.email}
                      name="email"
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row className="text-start mb-2">
                  <Col>
                    <h6>Password</h6>
                    <input
                      className="mb-2"
                      type="text"
                      value={userToEdit.password}
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
              </form>
            </>
          )}
        </Col>
      </Row>
    </Col>
  );
}
