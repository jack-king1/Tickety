import React, { useState, useEffect, useRef } from "react";
import Table from "./Table";
import "../CSS/Tabs.css";
import { SubmitTicketData, api, UpdateTicketData } from "./API";

function BuildData({
  tableData,
  setTableData,
  fontNames,
  activeBuildOption,
  setActiveBuildOption,
}) {
  const DATA_TYPE = {
    TITLE: 0,
    TEXT: 1,
    IMAGE: 2,
  };

  const [initData, setInitData] = useState([]);

  const handleCellChange = (value, rowIndex, cellIndex) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][cellIndex] = value;
    setInitData(updatedData);
  };

  const SubmitInitData = async () => {
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildData = initData;
    console.log(
      "SUBMITTING INIT DATA: ",
      tempBuildOption,
      "should look like: ",
      tableData
    );
    setActiveBuildOption(tempBuildOption);
    incrementCount();
    //Save data to database.
    await UpdateTicketData(
      null,
      JSON.stringify(activeBuildOption.buildData),
      activeBuildOption.buildDataName,
      activeBuildOption.buildDataDescription,
      activeBuildOption.buildFontStates,
      activeBuildOption.buildTextAlignStates,
      activeBuildOption.buildDataID
    );
  };

  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count * -1); // Triggers a re-render
  };

  const SaveChangesToDB = async () => {
    console.log("saving to db...");
    await UpdateTicketData(
      null,
      JSON.stringify(activeBuildOption.buildData),
      activeBuildOption.buildDataName,
      activeBuildOption.buildDataDescription,
      activeBuildOption.buildFontStates,
      activeBuildOption.buildTextAlignStates,
      activeBuildOption.buildDataID
    );
  };

  const RenderTableOptions = () => {
    if (activeBuildOption.buildData == null) {
      return (
        <div className="d-flex mx-auto my-auto h-100 flex-column">
          <div className="display-5 mx-auto text-center">Data Setup</div>
          <div className="display-6 mx-auto text-center">
            Insert your first column data and label.
            <div className="d-flex mt-4">
              <div className="pe-2">Label Name: </div>
              <input
                onChange={(e) => handleCellChange(e.target.value, 0, 0)}
                placeholder="Product Name"
              ></input>
            </div>
            <div className="d-flex mt-2 w-100">
              <div className="pe-2">Value: </div>
              <input
                onChange={(e) => handleCellChange(e.target.value, 1, 0)}
                placeholder="Spare Ribs"
                className="w-100"
              ></input>
            </div>
            <button
              onClick={() => SubmitInitData()}
              className="btn w-100 btn-success"
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
            className="text-center tabledata-input display-6"
            type="text"
            value={"Title"}
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
      {(activeBuildOption == undefined || activeBuildOption == null) && (
        <div className="display-4 text-center h-100 d-flex my-auto mx-auto">
          Select or Create a new ticket build from the menu.
        </div>
      )}
    </div>
  );
}

export default BuildData;
