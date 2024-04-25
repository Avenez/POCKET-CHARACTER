import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/monokai.css";
import javascript from "highlight.js/lib/languages/javascript";
import { useRef } from "react";
hljs.registerLanguage("javascript", javascript);

export default function IndexReduxSnippet() {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre className="snippetStyle snippetHeight scroll">
      <code className="javascript  innerSnippetHeight scroll" ref={codeRef}>
        {`
        export const fromSlice = createSlice({
            name: "form",
            initialState: {
              indexValue: 1,
            },
          
            reducers: {
              goTo: (state, action) => {
                state.indexValue = action.payload;
              },
          
              nextIndex: (state) => {
                if (state.indexValue < 7) {
                  state.indexValue++;
                }
              },
          
              prevIndex: (state) => {
                if (state.indexValue > 1) {
                  state.indexValue--;
                }
              },
            },
          });
        `}
      </code>
    </pre>
  );
}
