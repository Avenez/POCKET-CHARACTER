import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/monokai.css";
import javascript from "highlight.js/lib/languages/javascript";
import { useRef } from "react";
hljs.registerLanguage("javascript", javascript);

export default function DiceBoxSnippet() {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre className="snippetStyle snippetHeight scroll">
      <code className="javascript  innerSnippetHeight  scroll" ref={codeRef}>
        {`
        const diceColorSelected = localStorage.getItem("diceColor");
        const defaultThemeColor = "#5f646b";
        const themeColor = diceColorSelected ? diceColorSelected : defaultThemeColor;
        
        
        const Dice = new DiceBox(
          "#dice-box", // target DOM element to inject the canvas for rendering
          {
            id: "dice-canvas", // canvas element id
            assetPath: "/assets/dice-box/",
            startingHeight: 8,
            themeColor: themeColor,
            throwForce: 6,
            spinForce: 5,
            lightIntensity: 0.9,
            scale: 4,
          }
        );
        
        export { Dice };
        
        `}
      </code>
    </pre>
  );
}
