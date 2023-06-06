import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "../CSS/BuildCanvas.css";
import "../CSS/App.css";
import "../CSS/homepage.css";
import "../CSS/BuildCanvas.css";
import BuildDesign from "./BuildDesign";
import Tabs from "./Tabs";
import BuildData from "./BuildData";
import BuildPreview from "./BuildPreview";
// canvas ticket for test size = x: 484px(128mm) y: 189px(50mm)
function Build() {
  const [currentState, setCurrentState] = useState(1);

  const BUILD_STATE = {
    DATA: 0,
    DESIGN: 1,
    PREVIEW: 2,
  };

  const GetBuildState = () => {
    switch (currentState) {
      case BUILD_STATE.DATA:
        return <BuildData />;
      case BUILD_STATE.DESIGN:
        return <BuildDesign />;
      case BUILD_STATE.PREVIEW:
        return <BuildPreview />;
      default:
      //code
    }
  };

  return (
    <div className="">
      <Tabs
        currentState={currentState}
        setCurrentState={setCurrentState}
        buildState={BUILD_STATE}
      />
      {currentState == BUILD_STATE.DATA && <BuildData />}
      {currentState == BUILD_STATE.DESIGN && <BuildDesign />}
      {currentState == BUILD_STATE.PREVIEW && <BuildPreview />}
    </div>
  );
}

export default Build;
