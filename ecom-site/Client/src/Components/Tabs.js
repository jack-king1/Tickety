import React, { useState, useEffect, useRef } from "react";
import "../CSS/Tabs.css";

function Tabs({ currentState, setCurrentState, buildState }) {
  const SetNewState = (state) => {
    setCurrentState(state);
  };

  const GetActiveState = (tabType) => {
    if (currentState === tabType) {
      return "tabactive ";
    }
  };

  return (
    <div className="d-flex w-25 text-center mx-auto">
      <div className="d-flex rounded rounded-4 w-100">
        <div
          onClick={() => SetNewState(buildState.DATA)}
          className={`flex-fill fs-4 my-auto border-end px-2 tab ${GetActiveState(
            buildState.DATA
          )}`}
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Data
        </div>
        <div
          onClick={() => SetNewState(buildState.DESIGN)}
          className={`flex-fill fs-4 my-auto px-2 tab ${GetActiveState(
            buildState.DESIGN
          )}`}
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Design
        </div>
        <div
          onClick={() => SetNewState(buildState.PREVIEW)}
          className={`flex-fill fs-4 my-auto border-start px-2 tab ${GetActiveState(
            buildState.PREVIEW
          )}`}
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Preview
        </div>
      </div>
    </div>
  );
}

export default Tabs;
