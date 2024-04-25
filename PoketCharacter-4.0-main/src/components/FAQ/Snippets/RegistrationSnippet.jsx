import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/monokai.css";
import javascript from "highlight.js/lib/languages/javascript";
import { useRef } from "react";
hljs.registerLanguage("javascript", javascript);

export default function RegistrationSnippet() {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre className="snippetStyle snippetHeight scroll">
      <code className="javascript innerSnippetHeight  scroll" ref={codeRef}>
        {`
        const registerUser = async (userData, url) => {
            const container = document.getElementById("outContainer");
            setIsLoging(true);
            try {
              const response = await fetch(API-URL, {
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
              setMsg(data);
              setIsLoging(false); 
              if (data == "Registrazione avvenuta") {
                if (data === "Registrazione avvenuta") {
                  container.classList.add("active");
                  setUsername("");
                  setEmail("");
                  setPassword(""); // Attiva il login
                }
              }
            } catch (error) {
              console.error("Si è verificato un errore:", error.message);
              setIsLoging(false);
            }
          };
        `}
      </code>
    </pre>
  );
}
