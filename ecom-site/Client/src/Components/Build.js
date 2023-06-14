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
  const [currentState, setCurrentState] = useState(0);
  const [canvasStateJson, setCanvasStateJson] = useState("");
  const [tableData, setTableData] = useState([
    ["Title", "Description", "Price"],
    ["Example 1", "Description", "£0.00"],
    ["Example 2", "Descritpion", "£.00"],
  ]);

  const [fontNames, setBuildFonts] = useState([
    ["Sriracha", "Noto Sans JP", "Grechen Fuemen", "Bebas Neue"],
  ]);

  const [textAlignOptions, setTextAlignOptions] = useState([
    ["left", "center", "right"],
  ]);

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL);
    if (localStorage.getItem("tableData")) {
      setTableData(JSON.parse(localStorage.getItem("tableData")));
    }
  }, []);

  const BUILD_STATE = {
    DATA: 0,
    DESIGN: 1,
    PREVIEW: 2,
  };

  return (
    <div className="">
      <Tabs
        currentState={currentState}
        setCurrentState={setCurrentState}
        buildState={BUILD_STATE}
      />
      {currentState == BUILD_STATE.DATA && (
        <BuildData
          tableData={tableData}
          setTableData={setTableData}
          fontNames={fontNames}
        />
      )}

      {currentState == BUILD_STATE.DESIGN && (
        <BuildDesign
          canvasStateJson={canvasStateJson}
          setCanvasStateJson={setCanvasStateJson}
          buildState={currentState}
          tableData={tableData[0]}
          fontNames={fontNames}
          textAlignOptions={textAlignOptions}
        />
      )}
      {currentState == BUILD_STATE.PREVIEW && (
        <BuildPreview tableData={tableData} />
      )}
    </div>
  );
}

export default Build;
