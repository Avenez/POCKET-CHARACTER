import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./BackofficeMain.scss";
import { getCookie } from "../../hooks/getCookie";
import Toast from "react-bootstrap/Toast";
import { setUserDelete } from "../../REDUX/NotificationsSlice";

export default function BackofficeMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeToast = (value) => {
    dispatch(setUserDelete(value));
  };
  const show = useSelector((state) => state.notifications.userDelete);

  useEffect(() => {
    const profile = getCookie();
    if (profile == null || profile.Role !== "Admin") {
      navigate("/");
    }
  }, []);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchEmail, setSearchEmail] = useState("");

  const handleSearch = () => {
    if (searchEmail.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.email.includes(searchEmail.trim()));
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    let cookie = getCookie();
    const fetchUsersByRole = async () => {
      try {
        const response = await fetch("https://localhost:7106/api/User/GetUsersByRole/User", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookie.token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Errore nella richiesta");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Si è verificato un errore:", error);
      }
    };

    fetchUsersByRole();
  }, []);

  return (
    <Container>
      <Row className="">
        <Col>
          <h2 className="mt-2 text-start display-6 mt-3">Manage Users</h2>
          <Row className="mt-3 row-cols-1">
            <Col className="fw-bold text-start">Find User</Col>
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="EmailSrc"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
                <Button
                  variant="dark"
                  id="EmailSrc"
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Col>
          </Row>

          <Row className="text-start p-2">
            <Col>
              <h6>Username</h6>
            </Col>
            <Col>
              <h6>Email</h6>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="ps-3 pe-3">
        <Col className="usersCol">
          {filteredUsers.map((item) => (
            <Row
              key={item.idUser}
              className="text-start p-2 pt-3 mb-3 userRow"
              onClick={() => {
                navigate(`User/${item.idUser}`);
              }}
            >
              <Col>
                <h6>{item.username}</h6>
              </Col>
              <Col>
                <h6>{item.email}</h6>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Toast
        bg={"dark"}
        onClose={() => {
          closeToast(false);
        }}
        show={show}
        delay={3000}
        autohide
        className="toastLogin"
      >
        <Toast.Header>
          <strong className="me-auto text-success">Delete</strong>
          <small></small>
        </Toast.Header>
        <Toast.Body className="fw-bold text-success">User Deleted</Toast.Body>
      </Toast>
    </Container>
  );
}
