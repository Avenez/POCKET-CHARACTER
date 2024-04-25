import React, { useEffect } from "react";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/monokai.css";
import javascript from "highlight.js/lib/languages/javascript";
import { useRef } from "react";
hljs.registerLanguage("javascript", javascript);

export default function FormSnippet() {
  const codeRef = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeRef.current);
  }, []);

  return (
    <pre className="snippetStyle snippetHeight scroll">
      <code className="javascript  innerSnippetHeight  scroll" ref={codeRef}>
        {`
        export const CharacterForm = () => {    
            const index = useSelector((state) => state.form.indexValue);
            const dispatch = useDispatch();
            const navigate = useNavigate();
          
            const [imageFile, setImageFile] = useState(null);
          
            return (
              <>
                <div className="formIndexContainer">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <React.Fragment key={num}>
                      <div className={'{index === num ? "indexElementSelected flip-in-ver-left" : "indexElementNotSelected"}'}>
                        {num}
                      </div>
                      {num < 7 && (
                        <div
                          className={'{
                            index === num || index === num + 1
                              ? "indexElementsSpacingSelected"
                              : "indexElementsSpacingNotSelected"
                          }'}
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {/* Form con i vari componenti */}
                <form className="w-100">
                  <div>
                    <Container>
                      {index === 1 && <CName setimagefile={setImageFile} />}
                      {index === 2 && <CRace />}
                      {index === 3 && <RaceDetails />}
                      {index === 4 && <CClassesList />}
                      {index === 5 && <BackgroundsList />}
                      {index === 6 && <AbilitiesList />}
                      {index === 7 && <CheckComponent imagefile={imageFile} />}
                    </Container>
                  </div>
                  <div>
                    <button
                      className="backButton"
                      type="button"
                      onClick={() => {
                        if (index == 4 || index == 3) {
                          dispatch(goTo(2));
                        } else if (index == 1) {
                          navigate("/Characters");
                        } else {
                          dispatch(prevIndex());
                        }
                      }}
                    >
                      <i className="bi bi-caret-left-fill me-2"></i>Back
                    </button>
                  </div>
                </form>
              </>
            );
          };
          
          

        `}
      </code>
    </pre>
  );
}
