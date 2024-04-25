import React, { useState } from "react";
import MiniResult from "./MiniResult";
import MainResults from "./MainResult";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import "./Results.scss";

export const CustomResults = () => {
  const oldResults = useSelector((state) => state.customResults.oldResults);
  const isOpen = useSelector((state) => state.customResults.isOpen);
  const oldResultsToShow = oldResults.slice(1).reverse();

  //------useState per il fold del menù
  const [isFolded, setIsFolded] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="CustomRresultsContainer">
          {isFolded && (
            <>
              {oldResultsToShow != null
                ? oldResultsToShow.map((result) => <MiniResult key={`id-${result.index}`} result={result} />)
                : ""}
              <MainResults />
            </>
          )}

          <Button variant="dark" className="FoldButton" onClick={() => setIsFolded(!isFolded)}>
            {isFolded ? <i className="bi bi-caret-down"></i> : <i className="bi bi-caret-up"></i>}
          </Button>
        </div>
      )}
    </>
  );
};
