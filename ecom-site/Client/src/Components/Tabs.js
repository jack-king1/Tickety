import React, { useState, useEffect, useRef } from "react";
import "../CSS/Tabs.css";

function Tabs({
  currentState,
  setCurrentState,
  buildState,
  activeBuildOption,
}) {
  const SetNewState = (state) => {
    if (activeBuildOption != undefined || activeBuildOption != null) {
      setCurrentState(state);
    }
    incrementCount();
  };

  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count * -1); // Triggers a re-render
  };

  const GetActiveState = (tabType) => {
    if (currentState === tabType) {
      return "tabactive ";
    }
  };

  const GetInactiveState = (tabTypeState) => {
    console.log("GETTING NEW TAB STATES!!!");
    if (activeBuildOption === undefined || activeBuildOption === undefined) {
      console.log("The value is undefined");
      return " tabinactive";
    } else {
      console.log("The value is defined");
      if (activeBuildOption !== null) {
        if (tabTypeState === buildState.DESIGN) {
          if (activeBuildOption.buildData === null) {
            //object is undefined.
            return "tabinactive";
          } else {
            return "tab";
          }
        } else if (tabTypeState === buildState.PREVIEW) {
          if (activeBuildOption.buildDesign === null) {
            //object is undefined.
            return "tabinactive";
          } else {
            return "tab";
          }
        }
      }
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
