import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckLoginCookie = (direction) => {
  const navigate = useNavigate();

  useEffect(() => {
    //Recuper il cookie attraverso il suo nome e se è presente non rendo possibile l'accesso al login
    const cookie_or_null = (document.cookie.match(/^(?:.*;)?\s*loginCookie\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
    if (cookie_or_null != null) {
      navigate(`/${direction}`);
    } else {
      navigate("/Login");
    }
  }, []);
};

export default useCheckLoginCookie;
