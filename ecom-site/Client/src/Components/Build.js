import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Axios from "axios";
import "../CSS/BuildCanvas.css";
import "../CSS/App.css";
import "../CSS/homepage.css";
import "../CSS/BuildCanvas.css";
import BuildDesign from "./BuildDesign";
import Tabs from "./Tabs";
import BuildData from "./BuildData";
import BuildPreview from "./BuildPreview";
import SidebarMenu from "./SidebarMenu";
import { GetTicketBuildList, SubmitTicketData } from "./API";
import Cookies from "js-cookie";
// canvas ticket for test size = x: 484px(128mm) y: 189px(50mm)

import { api } from "./API";
function Build() {
  //con
  const [currentState, setCurrentState] = useState(0);
  const [canvasStateJson, setCanvasStateJson] = useState("");
  const [activeBuildOption, setActiveBuildOption] = useState();
  const [buildList, setBuildList] = useState([]);
  const [tableData, setTableData] = useState([["Title"], ["Example 1"]]);

  const [fontNames, setBuildFonts] = useState([
    ["Sriracha", "Noto Sans JP", "Grechen Fuemen", "Bebas Neue"],
  ]);

  const [textAlignOptions, setTextAlignOptions] = useState([
    ["left", "center", "right"],
  ]);

  const [fontSizeOptions, setFontSizeOptions] = useState([
    ["xsmall", "small", "medium", "large", "xlarge"],
  ]);

  const buildOptionObject = {
    buildName: "tempName",
    buildDesc: "a new build design object",
    buildFontStates: [fontNames[0][0]],
    buildTextAlignStates: [textAlignOptions[0][1]],
    buildFontSizeStates: ["16"],
  };

  function activateSideMenu(index, type) {
    console.log("focusing: ", type + index);
    const inputElement = document.getElementById(`${type}${index}`);
    inputElement.focus();
  }

  const fetchData = async () => {
    if (
      Cookies.get("loginCookie") !== null &&
      Cookies.get("loginCookie") !== undefined
    ) {
      let id = await JSON.parse(Cookies.get("loginCookie")).sub;
      const response = await GetTicketBuildList(id, setBuildList);
    } else if (
      localStorage.getItem("demoUser") !== null &&
      localStorage.getItem("demoUser") !== undefined
    ) {
      let id = JSON.parse(localStorage.getItem("demoUser")).sub;
      const response = await GetTicketBuildList(id, setBuildList);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const UpdateBuildList = async () => {
    await fetchData();
  };

  useEffect(() => {
    console.log("Build List Received: ", buildList);
  }, [buildList]);

  useEffect(() => {
    console.log("Active Build Option Loaded: ", activeBuildOption);
  }, [activeBuildOption]);

  const SubmitActiveBuildData = async () => {};

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL);
    //load from database ticket build list items.

    if (localStorage.getItem("tableData")) {
      setTableData(JSON.parse(localStorage.getItem("tableData")));
    }
  }, []);

  const BUILD_STATE = {
    DATA: 0,
    DESIGN: 1,
    PREVIEW: 2,
  };

  const isLoggedIn = () => {
    const loginCookie = Cookies.get("loginCookie");
    if (loginCookie !== null && loginCookie !== undefined) {
      return true;
    } else if (
      localStorage.getItem("demoUser") !== null &&
      localStorage.getItem("demoUser") !== undefined
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="">
      {isLoggedIn() && (
        <SidebarMenu
          buildList={buildList}
          setBuildList={setBuildList}
          buildOptionObject={buildOptionObject}
          activeBuildOption={activeBuildOption}
          setActiveBuildOption={setActiveBuildOption}
          currentState={currentState}
          setCurrentState={setCurrentState}
          buildState={BUILD_STATE}
        />
      )}

      <Tabs
        currentState={currentState}
        setCurrentState={setCurrentState}
        buildState={BUILD_STATE}
        activeBuildOption={activeBuildOption}
      />

      {currentState == BUILD_STATE.DATA && (
        <BuildData
          tableData={tableData}
          setTableData={setTableData}
          fontNames={fontNames}
          activeBuildOption={activeBuildOption}
          setActiveBuildOption={setActiveBuildOption}
          buildList={buildList}
          setBuildList={setBuildList}
          setCurrentState={setCurrentState}
          buildState={BUILD_STATE}
        />
      )}

      {currentState == BUILD_STATE.DESIGN && (
        <BuildDesign
          fontNames={fontNames}
          textAlignOptions={textAlignOptions}
          activeBuildOption={activeBuildOption}
          setActiveBuildOption={setActiveBuildOption}
        />
      )}
      {currentState == BUILD_STATE.PREVIEW && (
        <BuildPreview
          tableData={tableData}
          activeBuildOption={activeBuildOption}
        />
      )}
    </div>
  );
}

export default Build;
