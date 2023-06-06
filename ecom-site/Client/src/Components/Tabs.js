import React, { useState, useEffect, useRef } from "react";

function Tabs({ currentState, setCurrentState, buildState }) {
  const SetNewState = (state) => {
    setCurrentState(state);
  };
  return (
    <div className="d-flex pt-2 w-25 text-center mx-auto">
      <div className="d-flex rounded rounded-4 w-100">
        <div
          onClick={() => SetNewState(buildState.DATA)}
          className="flex-fill fs-4 my-auto border-end px-2"
        >
          Data
        </div>
        <div
          onClick={() => SetNewState(buildState.DESIGN)}
          className="flex-fill fs-4 my-auto px-2"
        >
          Design
        </div>
        <div
          onClick={() => SetNewState(buildState.PREVIEW)}
          className="flex-fill fs-4 my-auto border-start px-2"
        >
          Preview
        </div>
      </div>
    </div>
  );
}

export default Tabs;
