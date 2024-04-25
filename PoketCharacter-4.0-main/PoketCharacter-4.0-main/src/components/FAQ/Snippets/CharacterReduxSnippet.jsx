import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/monokai.css";
import javascript from "highlight.js/lib/languages/javascript";
import { useRef } from "react";
hljs.registerLanguage("javascript", javascript);

export default function CharacterReduxSnippet() {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre className="snippetStyle snippetHeight scroll">
      <code className="javascript innerSnippetHeight scroll" ref={codeRef}>
        {`
        export const { nextIndex, prevIndex, goTo } = fromSlice.actions;
        export const formReducer = fromSlice.reducer;
        
        export const CharacterSlice = createSlice({
          name: "character",
        
          initialState: {
            raceStats: [],
            raceAbilities: [],
            backgroundAbilities: [],
            classAbilities: [],
        
            character: {
              idUser: null,
              ImageName: null,
              Name: "",
              Race: "",
              RaceType: "",
              SubRace: "",
              Lv: 1,
              BC: "",
              Background: "",
              Class: "",
              SubClass: "",
              SubClassType: "",
              FightingStyle: "",
              STR: 0,
              DEX: 0,
              CON: 0,
              INT: 0,
              WIS: 0,
              CHA: 0,
              CA: 10,
              TPCM: 0,
              TPCD: 0,
              TPCI: 0,
              ToolProf: [],
              AbilitiesProf: [],
              AbilitiesMastery: [],
              SavingProf: [],
              visible: true,
            },
          },
        `}
      </code>
    </pre>
  );
}
