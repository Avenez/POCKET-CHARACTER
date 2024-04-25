import React, { useEffect, useRef, useState } from "react";
import FAQTEST from "./FAQTEST";
import FAQTEST2 from "./FAQTEST2";
import "./FAQStyle.scss";

export default function FAQMain() {
  const [compFraq, setCompFraq] = useState(0.95);
  const imageContainer = useRef(undefined);

  const slide = (xPosition) => {
    const containerBoundingRect = imageContainer.current.getBoundingClientRect();
    setCompFraq(() => {
      return (xPosition - containerBoundingRect.left) / containerBoundingRect.width;
    });
  };

  const handleMouseDown = () => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (event) => {
    slide(event.clientX);
  };

  const handleMouseUp = () => {
    window.onmousemove = undefined;
    window.onmouseup = undefined;
  };

  return (
    <>
      <div ref={imageContainer} className="w-100 h-100 position-relative noSelect p-3">
        <div className="" style={{ paddingTop: "0.46px" }}>
          <FAQTEST />
        </div>
        <div
          className="bg-white position-absolute  p-3"
          style={{
            inset: "0",
            clipPath: `polygon(0 0, ${compFraq * 100}% 0, ${compFraq * 100}% 100%, 0 100% )`,
          }}
        >
          <FAQTEST2 />
        </div>
        <div className="position-fixed handler" style={{ left: `${compFraq * 100}%` }}>
          <div className=" position-relative h-100">
            <div
              className=" position-absolute handler bg-black opacity-25"
              style={{ width: "4px", marginLeft: "-2px" }}
            ></div>
            <div
              onMouseDown={handleMouseDown}
              className="rounded-circle bg-dark position-fixed d-flex align-items-center justify-content-center text-white"
              style={{ width: "40px", height: "40px", marginLeft: "-20px", top: `30%` }}
            >
              <i className="bi bi-caret-left-fill"></i>
              <i className="bi bi-caret-right-fill"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
