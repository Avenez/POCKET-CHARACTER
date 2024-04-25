import React, { useState } from "react";
import "./Registrazione.scss";
import { useEffect } from "react";
import useCheckLoginCookie from "../../hooks/checkLoginCookie";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../../hooks/getCookie";
import { Navigate } from "react-router-dom";

export default function LoginRegistration() {
  //TOAST
  const [show, setShow] = useState(false);
  //Creazione switch interfaccia
  useEffect(() => {
    if (getCookie() == null) {
      const login = document.getElementById("login");
      const container = document.getElementById("outContainer");
      const registration = document.getElementById("registration");

      container.classList.add("active");

      const handleLoginClick = () => {
        container.classList.add("active");
      };

      const handleRegistrationClick = () => {
        container.classList.remove("active");
      };

      login.addEventListener("click", handleLoginClick);
      registration.addEventListener("click", handleRegistrationClick);
    }
  }, []);

  //----------------LOGIN---------------------------

  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const [isLoging, setIsLoging] = useState(false);

  //Use State che permette di settare lo stato del login quando viene trovato un utente
  //"failedLogin" viene ussato come condizione per mandare a schermo un messaggio in caso di utente non trovato
  const [failedLogin, setFailedLogin] = useState(false);

  //Oggetto User inviato all'api per il controllo della presenza di un utente
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });

  //Funzione che modifica l'oggetto user prendendo name e value degli input
  const handleUserChange = (event) => {
    const { name, value } = event.target;
    const inputValue = value;
    setUser({
      ...user,
      [name]: inputValue,
    });
  };

  //Funzione che invia all'api l'oggetto user per farsi restitutire tutti i dati corrispondenti
  const handleSubmit = (event) => {
    event.preventDefault();
    sendUser(user);
  };

  //Funzione che permette la chiamata all'api e il recuper dei dati dell'utente, se presente
  //Se non c'è riscontro setta "failedLogin" su true in modo da inviare un feed all'utente
  //Se c'è riscontro lo setta su false e crea un coockie con i dati dell'utente
  const sendUser = async (user) => {
    setIsLoging(true);
    try {
      const url = "https://localhost:7106/api/User/Login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        setFailedLogin(true);
        setIsLoging(false);
        throw new Error("Errore durante l'invio");
      }

      const data = await response.text();
      const userToken = jwtDecode(data);
      // const data = await response;

      //Se non c'è riscontro setta "failedLogin" su true in modo da inviare un feed all'utente
      if (data == null) {
        setFailedLogin(true);
        setIsLoging(false);
      } else {
        //Se c'è riscontro lo setta su false e crea un coockie con i dati dell'utente
        setFailedLogin(false);
        addLoginCookie(userToken, data);
        setIsLoging(false);
        let role = userToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        let username = userToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

        let userObj = {
          idUser: userToken.jti,
          Username: username,
          Email: userToken.sub,
          Role: role,
        };

        navigate(role == "Admin" ? "/Backoffice" : "/Characters");
      }
    } catch (error) {
      console.error("Si è verificaro un errore:", error);
      setIsLoging(false);
    }
  };

  //Funzione per l'aggiunta di un cookie di login per avere i dati dell'utente salvati.
  //Usato per controlli condizionali in altre parti dell'applicazione
  const addLoginCookie = (user, token) => {
    let role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    let username = user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

    let userObj = {
      idUser: user.jti,
      Username: username,
      Email: user.sub,
      Role: role,
      token: token,
    };

    if (rememberMe) {
      const loginCookie = JSON.stringify(userObj);
      document.cookie = `loginCookie=${loginCookie}; SameSite=Strict;`;
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 100);
      document.cookie = `loginCookie=${loginCookie}; SameSite=Strict; expires=${expirationDate.toUTCString()}; path=/;`;
    } else {
      const loginCookie = JSON.stringify(userObj);
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      document.cookie = `loginCookie=${loginCookie}; SameSite=Strict; expires=${expirationDate.toUTCString()}; path=/;`;
    }
  };

  //------------------------------------------------------------

  //------------------REGISTRATION------------------------------
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(true);

  const [emailCheck, setEmailCheck] = useState("");
  const [emailCheckMsg, setEmailCheckMsg] = useState("");

  useEffect(() => {
    clearTimeout();
    if (email !== "") {
      setTimeout(() => {
        if (email.includes("@") && (email.includes(".com") || email.includes(".it"))) {
          setEmailCheck(true);
          setEmailCheckMsg("");
        } else {
          setEmailCheck(false);
          setEmailCheckMsg("Inserire una mail valida");
        }
      }, 1500);
    }
  }, [email]);

  const handleRegistration = (event) => {
    event.preventDefault();
    let data = {
      Username: username,
      Email: email,
      Password: password,
      Role: "User",
    };

    const url = "https://localhost:7106/api/User/Registration";
    registerUser(data, url);
  };

  const registerUser = async (userData, url) => {
    const container = document.getElementById("outContainer");
    setIsLoging(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Errore durante la registrazione");
      }

      const data = await response.text();
      setMsg(data);
      setIsLoging(false);
      if (data == "Registrazione avvenuta") {
        if (data === "Registrazione avvenuta") {
          container.classList.add("active");
          setShow(true);
          setUsername("");
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {
      console.error("Si è verificato un errore:", error.message);
      setIsLoging(false);
    }
  };

  //------------------------------------------------------------

  if (getCookie() != null) {
    return <Navigate to="/Characters" />;
  } else {
    return (
      <div className="formBody">
        <div className="outContainer" id="outContainer">
          <div className="form-container registration">
            <form onSubmit={handleRegistration}>
              <h1>Registration</h1>
              <span>{msg !== "" ? msg : ""}</span>
              <input
                className="form-input"
                type="text"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className="form-input"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailCheckMsg && <p className="m-0 p-0 text-danger">{emailCheckMsg}</p>}
              <input
                className="form-input"
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isLoging && (
                <div className="d-flex justify-content-center">
                  <div className="loader"></div>
                </div>
              )}
              <button type="submit" disabled={!emailCheck}>
                {" "}
                Sign in
              </button>
            </form>
          </div>
          <div className="form-container login">
            <form className="form-control border-0" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <span>{failedLogin ? "Mail o password errate" : ""}</span>
              <input
                className="form-input"
                type="text"
                placeholder="Email"
                name="Email"
                value={user.Email}
                onChange={handleUserChange}
                required
              />
              <input
                className="form-input"
                type="password"
                placeholder="****"
                name="Password"
                value={user.Password}
                onChange={handleUserChange}
                required
              />
              <div className="d-flex justify-content-center align-items-center">
                <input
                  className="me-3 rememberCheck"
                  id="remember"
                  name="remember"
                  type="checkbox"
                  onClick={() => {
                    setRememberMe(!rememberMe);
                  }}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              {isLoging && (
                <div className="d-flex justify-content-center">
                  <div className="loader"></div>
                </div>
              )}
              <button type="submit">Login</button>
            </form>
          </div>
          <section className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-right">
                <h1>Welcome</h1>
                <span>Already a user?</span>
                <button id="login" className="hidden">
                  Login
                </button>
              </div>
              <div className="toggle-panel toggle-left">
                <h1>Welcome</h1>
                <span>Don't have a profile?</span>
                <button id="registration" className="hidden">
                  sign in
                </button>
              </div>
            </div>
          </section>
        </div>
        <Toast bg={"dark"} onClose={() => setShow(false)} show={show} delay={3000} autohide className="toastLogin">
          <Toast.Header>
            {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
            <strong className="me-auto text-success">Sign-Up</strong>
            <small></small>
          </Toast.Header>
          <Toast.Body className="fw-bold text-success">You have successfully Sign-up!</Toast.Body>
        </Toast>
      </div>
    );
  }
}
