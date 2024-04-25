import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/monokai.css";
import javascript from "highlight.js/lib/languages/javascript";
import { useRef } from "react";
hljs.registerLanguage("javascript", javascript);

export default function LoginSnippet() {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre className="snippetStyle snippetHeight scroll">
      <code className="javascript  innerSnippetHeight scroll" ref={codeRef}>
        {`
        const sendUser = async (user) => {
    setIsLoging(true);
    try {
      const url = "API-URL";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        console.log("fetch ERRORE");
        setFailedLogin(true);
        setIsLoging(false);
        throw new Error("Errore durante l'invio");
      }

      const data = await response.json();
      console.log(data);
      if (data == null) {
        setFailedLogin(true);
        setIsLoging(false);
      } else {
        setFailedLogin(false);
        addLoginCookie(data);
        setIsLoging(false);
        navigate("/Characters");
      }
    } catch (error) {
      console.error("Si è verificaro un errore:", error);
      setIsLoging(false);
    }
  };

const addLoginCookie = (userObj) => {
    if (rememberMe) {
      const loginCookie = JSON.stringify(userObj);
      document.cookie = 'loginCookie={loginCookie}; SameSite=Strict;';
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 100);
      document.cookie = 'loginCookie={loginCookie}; SameSite=Strict; expires={expirationDate.toUTCString()}; path=/;';
    } else {
      const loginCookie = JSON.stringify(userObj);
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      document.cookie = 'loginCookie={loginCookie}; SameSite=Strict; expires={expirationDate.toUTCString()}; path=/;';
    }
  };

        `}
      </code>
    </pre>
  );
}
