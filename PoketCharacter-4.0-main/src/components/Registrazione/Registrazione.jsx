import { useEffect, useState } from "react";

export const Registrazione = () => {
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
      }, 2000);
    }
  }, [email]);

  const handleRegistration = () => {
    let data = {
      Username: username,
      Email: email,
      Password: password,
      Role: "User",
    };

    // const url = "https://localhost:44305/api/User/Registration";
    const url = "https://localhost:7106/api/User/Registration";
    registerUser(data, url);
  };

  const registerUser = async (userData, url) => {
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
      console.log(data);
      setMsg(data); // Puoi fare qualcosa con il messaggio di risposta
    } catch (error) {
      console.error("Si è verificato un errore:", error.message);
    }
  };

  return (
    <>
      <h1>{msg !== "" ? msg : ""}</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* {!usernameCheck && <p>Questo nome utente non è disponibile</p>} */}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>{emailCheckMsg}</p>
      </div>

      <label htmlFor="password">Password</label>
      <input
        type="text"
        id="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegistration} disabled={!emailCheck}>
        Register
      </button>
    </>
  );
};
