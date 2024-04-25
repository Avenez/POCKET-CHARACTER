import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/monokai.css";
import javascript from "highlight.js/lib/languages/javascript";
import { useRef } from "react";
hljs.registerLanguage("javascript", javascript);

export default function ResultsSnippet() {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre className="snippetStyle snippetHeight scroll">
      <code className="javascript  innerSnippetHeight scroll" ref={codeRef}>
        {`
        export const resultSlice = createSlice({
            name: "customResults",
            initialState: {
              results: [],
              finalResults: [],
              isOpen: false,
          
              oldResults: [],
          
              typeOfTrow: null,
              colorTrow: "",
            },
          
            reducers: {
              fillResults: (state, action) => {
                state.results = action.payload;
              },
          
              fillFinalResults: (state, action) => {
                state.finalResults = action.payload;
          
                if (state.oldResults.length < 3) {
                  state.oldResults.unshift({
                    type: state.typeOfTrow,
                    color: state.colorTrow,
                    result: state.finalResults.value,
                  });
                } else {
                  state.oldResults.pop();
                  state.oldResults.unshift({
                    type: state.typeOfTrow,
                    color: state.colorTrow,
                    result: state.finalResults.value,
                  });
                }
              },
          `}
      </code>
    </pre>
  );
}
