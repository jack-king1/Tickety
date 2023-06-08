import React, { useState, useEffect, useRef } from "react";
import Table from "./Table";

function BuildData({ tableData, setTableData }) {
  const DATA_TYPE = {
    TITLE: 0,
    TEXT: 1,
    IMAGE: 2,
  };

  return (
    <div className="canvascontainer ">
      <Table data={tableData} setData={setTableData} />
    </div>
  );
}

export default BuildData;
