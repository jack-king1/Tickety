import React, { useState, useEffect, useRef } from "react";
import { SubmitTicketData, api, UpdateTicketData } from "./API";
import "../CSS/Tabs.css";

function Table({ data, setData, activeBuildOption, setActiveBuildOption }) {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count * -1); // Triggers a re-render
  };

  const addRow = () => {
    let updatedData = [
      ...activeBuildOption.buildData,
      Array(activeBuildOption.buildData[0].length).fill(""),
    ];
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildData = updatedData;
    setActiveBuildOption(tempBuildOption);
    //localStorage.setItem("tableData", JSON.stringify(updatedData));
    incrementCount();
  };

  const removeRow = (index) => {
    const updatedData = [...activeBuildOption.buildData];
    updatedData.splice(index, 1);
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildData = updatedData;
    setActiveBuildOption(tempBuildOption);
    //localStorage.setItem("tableData", JSON.stringify(updatedData));
    incrementCount();
  };

  const addColumn = () => {
    const updatedData = activeBuildOption.buildData.map((row) => [...row, ""]);
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildData = updatedData;
    setActiveBuildOption(tempBuildOption);
    //localStorage.setItem("tableData", JSON.stringify(updatedData));
    incrementCount();
  };

  const removeColumn = (index) => {
    const updatedData = activeBuildOption.buildData.map((row) => {
      const newRow = [...row];
      newRow.splice(index, 1);
      return newRow;
    });
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildData = updatedData;
    setActiveBuildOption(tempBuildOption);
    //localStorage.setItem("tableData", JSON.stringify(updatedData));
    incrementCount();
  };

  const handleCellChange = (value, rowIndex, cellIndex) => {
    const updatedData = [...activeBuildOption.buildData];
    updatedData[rowIndex][cellIndex] = value;
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildData = updatedData;
    setActiveBuildOption(tempBuildOption);
    //localStorage.setItem("tableData", JSON.stringify(updatedData));
    incrementCount();
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div>
        {(activeBuildOption.buildData != null ||
          activeBuildOption.buildData != undefined) && (
          <table>
            <tbody>
              {activeBuildOption.buildData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td className="" key={cellIndex}>
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          handleCellChange(e.target.value, rowIndex, cellIndex)
                        }
                        className={`${
                          rowIndex <= 0 && "titleitem fw-bold"
                        } cellitem`}
                      />
                    </td>
                  ))}
                  <td>
                    {rowIndex > 0 ? (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeRow(rowIndex)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success w-100"
                        onClick={addColumn}
                      >
                        New Col
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                {activeBuildOption.buildData[0].map((_, index) => (
                  <td key={index}>
                    {index > 0 ? (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeColumn(index)}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={addRow}
                      >
                        New Row
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Table;
