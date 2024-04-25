import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCheckLoginCookie from "../../hooks/checkLoginCookie";

export const Login = () => {
  const navigate = useNavigate();
  useCheckLoginCookie("/");

  useEffect(() => {
    //Recuper il cookie attraverso il suo nome e se è presente non rendo possibile l'accesso al login
    const cookie_or_null = (document.cookie.match(/^(?:.*;)?\s*loginCookie\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
    if (cookie_or_null != null) {
      navigate("/");
    }
    console.log(cookie_or_null);
  }, []);

  //Use effect che permette di settare lo stato del login quando viene trovato un utente
  //"failedLogin" viene ussato come condizione per mandare a schermo un messaggio in caso di utente non trovato
  const [failedLogin, setFailedLogin] = useState(false);

  //Oggetto User inviato all'api per il controllo della presenza di un utente
  const [user, setUser] = useState({
    Username: "",
    Email: "",
    Password: "",
    Role: "User",
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

  //Funzione per l'aggiunta di un cookie di login per avere i dati dell'utente salvati.
  //Usato per controlli condizionali in altre parti dell'applicazione
  const addLoginCookie = (userObj) => {
    const loginCookie = JSON.stringify(userObj);
    document.cookie = `loginCookie = ${loginCookie}`;
  };

  //Funzione che permette la chiamata all'api e il recuper dei dati dell'utente, se presente
  //Se non c'è riscontro setta "failedLogin" su true in modo da inviare un feed all'utente
  //Se c'è riscontro lo setta su false e crea un coockie con i dati dell'utente
  const sendUser = async (user) => {
    try {
      const url = "https://localhost:7106/api/User/Login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        console.log("fetch ERRORE");
        setFailedLogin(true);
        throw new Error("Errore durante l'invio");
      }

      const data = await response.json();
      console.log(data);
      //Se non c'è riscontro setta "failedLogin" su true in modo da inviare un feed all'utente
      if (data == null) {
        setFailedLogin(true);
      } else {
        //Se c'è riscontro lo setta su false e crea un coockie con i dati dell'utente
        setFailedLogin(false);
        addLoginCookie(data);
        navigate("/Characters");
      }
    } catch (error) {
      console.error("Si è verificaro un errore:", error);
    }
  };

  return (
    <>
      <h3>{failedLogin ? "Mail o password errate" : ""}</h3>
      <form onSubmit={handleSubmit} className="m-3 border border-2 border-dark">
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder="your email"
            value={user.Email}
            onChange={handleUserChange}
            required
          />
        </div>

        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={user.Password}
            onChange={handleUserChange}
            required
          />
        </div>

        <div>
          <button type="submit" className="btn btn-dark">
            Login
          </button>
        </div>
      </form>
    </>
  );
};
