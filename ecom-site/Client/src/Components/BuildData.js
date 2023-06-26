import React, { useState, useEffect, useRef } from "react";
import Table from "./Table";
import "../CSS/Tabs.css";
import "../CSS/BuildCanvas.css";
import { SubmitTicketData, api, UpdateTicketData } from "./API";
import "material-icons/iconfont/material-icons.css";

function BuildData({
  tableData,
  setTableData,
  fontNames,
  activeBuildOption,
  setActiveBuildOption,
  buildList,
  setBuildList,
  buildState,
  setCurrentState,
}) {
  const DATA_TYPE = {
    TITLE: 0,
    TEXT: 1,
    IMAGE: 2,
  };

  const [initData, setInitData] = useState([]);
  const [initTitle, setinitTitle] = useState("");
  const [initDesc, setinitDesc] = useState("");

  const handleCellChange = (value, rowIndex, cellIndex) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][cellIndex] = value;
    setInitData(updatedData);
  };

  const handleInitTitleChange = (value) => {};

  const handleInitDescChange = (value) => {};

  const SubmitInitData = async () => {
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildData = initData;
    console.log(
      "SUBMITTING INIT DATA: ",
      tempBuildOption,
      "should look like: ",
      tableData
    );
    setCurrentState(buildState.DATA);
    setActiveBuildOption(tempBuildOption);
    incrementCount();
    //Save data to database.
    await UpdateTicketData(activeBuildOption);
  };

  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count * -1); // Triggers a re-render
  };

  const SaveChangesToDB = async () => {
    console.log("saving to db...");
    await UpdateTicketData(activeBuildOption);
  };

  const HandleTitleChange = (value) => {
    let updatedData = activeBuildOption.buildDataName;
    let tempBuildList = buildList;

    const index = buildList.findIndex(
      (element) => element.buildDataID === activeBuildOption.buildDataID
    );
    tempBuildList[index].buildDataName = value;
    updatedData = value;
    console.log("DESIGN NAME: ", value);
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildDataName = updatedData;
    setActiveBuildOption(tempBuildOption);
    setBuildList(tempBuildList); //update side menu at the same time.

    incrementCount();
  };

  const HandleDescriptionChange = (value) => {
    let updatedData = activeBuildOption.buildDataDescription;
    let tempBuildList = buildList;

    const index = buildList.findIndex(
      (element) => element.buildDataID === activeBuildOption.buildDataID
    );
    tempBuildList[index].buildDataDescription = value;
    updatedData = value;
    console.log("DESIGN Desc: ", value);
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildDataDescription = updatedData;
    setActiveBuildOption(tempBuildOption);
    setBuildList(tempBuildList); //update side menu at the same time.

    incrementCount();
  };

  const NotifyLogin = () => {
    return localStorage.getItem("accountID") ? (
      <div className="display-4 text-center h-100 d-flex my-auto mx-auto d-flex">
        <span className="material-icons text-black my-auto arrowleft mr-2">
          arrow_back
        </span>
        Select or Create a new ticket build from the menu.
      </div>
    ) : (
      <div className="display-4 text-center h-100 d-flex flex-column my-auto mx-auto">
        Please Login
        <div className="display-6">
          Feel free to use our demo login to test out the features of the app!
        </div>
      </div>
    );
  };

  const RenderTableOptions = () => {
    if (activeBuildOption.buildData == null) {
      return (
        <div className="d-flex mx-auto my-auto h-100 flex-column border border-2 p-2 rounded rounded-2 border-primary">
          <div className="display-5 mx-auto text-center">Data Setup</div>

          <div className=" mx-auto mb-4 mt-2 ">
            <div className="initsubtitle">
              Create group name and description.
            </div>
            <div className="mt-1">
              <div className="w-100">Name: </div>
              <input
                className="w-100"
                onChange={(e) => handleCellChange(e.target.value, 0, 0)}
                placeholder="Group Name"
              ></input>
            </div>
            <div className="mt-2 w-100">
              <div className="w-100 text-left">Description: </div>
              <input
                onChange={(e) => handleCellChange(e.target.value, 1, 0)}
                placeholder="A description goes here..."
                className="w-100"
              ></input>
            </div>
          </div>

          <div className="mx-auto">
            <div className="initsubtitle">
              Insert your first column data and label.
            </div>

            <div className="mt-1">
              <div className="w-100">Name: </div>
              <input
                onChange={(e) => handleCellChange(e.target.value, 0, 0)}
                placeholder="Product Name"
                className="w-100"
              ></input>
            </div>
            <div className="mt-2 w-100">
              <div className="w-100">Value: </div>
              <input
                onChange={(e) => handleCellChange(e.target.value, 1, 0)}
                placeholder="Spare Ribs"
                className="w-100"
              ></input>
            </div>
            <button
              onClick={() => SubmitInitData()}
              className="btn w-100 btn-success mt-2"
            >
              Submit
            </button>
          </div>
        </div>
      );
    } else
      return (
        <div className="d-flex flex-column">
          <input
            onChange={(e) => HandleTitleChange(e.target.value)}
            className="text-center tabledata-input display-6"
            type="text"
            value={activeBuildOption.buildDataName}
          />
          <input
            onChange={(e) => HandleDescriptionChange(e.target.value)}
            className="text-center tabledata-input"
            type="text"
            value={activeBuildOption.buildDataDescription}
          />
          <div
            onClick={() => SaveChangesToDB()}
            className="btn btn-success btn-sm"
          >
            Save Changes
          </div>
          {GetProductTable()}
        </div>
      );
  };

  const GetProductTable = () => {
    return (
      <Table
        data={activeBuildOption.buildData}
        setData={setTableData}
        fontNames={fontNames}
        activeBuildOption={activeBuildOption}
        setActiveBuildOption={setActiveBuildOption}
      />
    );
  };

  return (
    <div className="canvascontainer h-100 maxheight">
      <div className="d-flex justify-content-center mt-2">
        {(activeBuildOption != undefined || activeBuildOption != null) &&
          RenderTableOptions()}
      </div>
      {(activeBuildOption == undefined || activeBuildOption == null) &&
        NotifyLogin()}
    </div>
  );
}

export default BuildData;
