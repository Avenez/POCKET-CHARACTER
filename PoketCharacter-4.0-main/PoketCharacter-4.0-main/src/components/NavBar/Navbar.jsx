import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import D20 from "../ICONS/D20Icon";
import "./Navbar.scss";
import { Container, Row, Col } from "react-bootstrap";

export default function Navbar() {
  const cookie_or_null = (document.cookie.match(/^(?:.*;)?\s*loginCookie\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
  const [profile, setProfile] = useState(JSON.parse(cookie_or_null));
  const navigate = useNavigate();

  //--------------OFF CANVAS
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleOffcanvas = () => {
    setShow(!show);
  };

  //-----------------------

  const logout = () => {
    Cookies.remove("loginCookie");
    setProfile(null);
    navigate("/");
  };

  useEffect(() => {
    if (cookie_or_null != null) {
      setProfile(JSON.parse(cookie_or_null));
    }
  }, [cookie_or_null]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-glass position-sticky top-0 p-0" style={{ zIndex: "90" }}>
      <div className="container-fluid">
        <a className="navbar-brand p-0" href="/">
          <img
            src="/images/Logo2.png"
            alt="Page Logo"
            width="95"
            height="100"
            className="d-inline-block align-text-top"
          />
        </a>
        <button className="btn btn-outline-light border-0 rounded-circle" onClick={handleShow}>
          <i className="bi bi-list"></i>
        </button>

        <Offcanvas placement={"end"} show={show} onHide={handleClose} className="bg-dark offCanvasController">
          <div>
            <Offcanvas.Title className="d-flex justify-content-end align-items-center">
              <button
                className="btn btn-outline-light border-0 m-3"
                onClick={() => {
                  toggleOffcanvas();
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </Offcanvas.Title>
          </div>
          <Offcanvas.Body className="text-white text-end">
            <Container>
              <Row>
                <Col>
                  <div className="text-white d-flex justify-content-center align-items-center mb-4 fs-5">
                    <img src="\images\d20.png" alt="d20" className="diceIconHome me-2" />

                    <p className="p-0 m-0 ms-1">POCKET CHARACTER</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ul className="navLinks">
                    {profile && (
                      <li className="text-center mb-5">
                        <p className="fw-bold fs-5">
                          Welcome back <span className="text-danger">{profile.Username}</span>!
                        </p>
                      </li>
                    )}
                    <li>
                      <a href="/">Home</a>
                      <img src="\images\d20.png" alt="d20" className="diceIconHome" />
                    </li>
                    <li>
                      <a href="https://dungeonedraghi.it/regole/" target="_blank" className="">
                        Rules-Pedia
                      </a>
                      <img src="\images\rulesPedia.webp" alt="dungeonedraghi" className="rulepediaImg" />
                    </li>
                    {profile == null ? (
                      <></>
                    ) : (
                      <>
                        <li>
                          <a href="/Characters">My Characters</a>
                          <img src="\images\quill.png" alt="d20" className="diceIconHome" />
                        </li>
                        <li>
                          <a href={`/Profile/${profile.idUser}`}>Profile</a>
                          <i className="bi bi-person-lines-fill ms-2 fs-4"></i>
                        </li>
                        {profile.Role === "Admin" && (
                          <li>
                            <a href="/Backoffice">Backoffice</a>
                            <i className="bi bi-ui-checks-grid ms-2"></i>
                          </li>
                        )}
                      </>
                    )}
                  </ul>
                </Col>
              </Row>
              {/* <div className="border-bottom border-2 border-light w-50 ms-auto"></div> */}
              <Row className="mt-5">
                <Col>
                  <ul className="navLinks">
                    <li>
                      <a href="/Faq">FAQ</a>
                      <i className="bi bi-question-lg ms-2 fs-5"></i>
                    </li>
                    <li>
                      <a href="/About">About the Project</a>
                      <i className="bi bi-search ms-2 fs-5"></i>
                    </li>
                  </ul>
                </Col>
              </Row>

              <Row className="text-center mt-5">
                <Col>
                  {profile == null ? (
                    <button
                      className="button-Log"
                      role="button"
                      onClick={() => {
                        toggleOffcanvas();
                        navigate("/Login");
                      }}
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      className="button-Log"
                      role="button"
                      onClick={() => {
                        logout();
                        toggleOffcanvas();
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  )}
                </Col>
              </Row>
              {/* <Row>
                <Col></Col>
              </Row> */}
            </Container>
          </Offcanvas.Body>
          <div className="p-4 fs-2 d-flex justify-content-evenly contactsLinks">
            <a href="https://discordapp.com/users/1153663663555752028" target="_blanck">
              <i className="bi bi-discord"></i>
            </a>
            <a href="https://github.com/Avenez" target="_blanck">
              <i className="bi bi-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/aveneziano/">
              <i className="bi bi-linkedin" target="_blanck"></i>
            </a>
            <a href="mailto:a.veneziano6@gmail.com">
              <i className="bi bi-threads" target="_blanck"></i>
            </a>
            <a href="https://www.instagram.com/b_isio?igsh=dDljNmsxMnp2cDJy" target="_blanck">
              <i className="bi bi-instagram" target="_blanck"></i>
            </a>
          </div>
        </Offcanvas>
      </div>
    </nav>
  );
}
