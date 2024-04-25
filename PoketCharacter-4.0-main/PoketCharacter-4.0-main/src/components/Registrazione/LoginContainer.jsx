import { useState } from "react";
import { Login } from "./Login";
import { Registrazione } from "./Registrazione";
import LoginRegistration from "./LoginRegistration";

export const LoginConteiner = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      {/* <button onClick={() => setLogin(!login)}>BUTTON</button> */}

      {/* {login == true ? <Login /> : <></>}
      {login == false ? <Registrazione /> : <></>} */}
      <LoginRegistration />
    </>
  );
};
