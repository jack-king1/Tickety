import React, { useState, useEffect, useRef } from "react";
import Table from "./Table";
import "../CSS/Tabs.css";

function BuildData({ tableData, setTableData, fontNames }) {
  const DATA_TYPE = {
    TITLE: 0,
    TEXT: 1,
    IMAGE: 2,
  };

  return (
    <div className="canvascontainer h-100">
      <div className="d-flex justify-content-center mt-2">
        <input
          className="text-center tabledata-input"
          type="text"
          value={"Title"}
        />
      </div>
      <Table data={tableData} setData={setTableData} fontNames={fontNames} />
    </div>
  );
}

export default BuildData;
