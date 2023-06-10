import React, { useState, useEffect, useRef } from "react";

function Table({ data, setData }) {
  const addRow = () => {
    setData([...data, Array(data[0].length).fill("")]);
  };

  const removeRow = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const addColumn = () => {
    const updatedData = data.map((row) => [...row, ""]);
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const removeColumn = (index) => {
    const updatedData = data.map((row) => {
      const newRow = [...row];
      newRow.splice(index, 1);
      return newRow;
    });
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  const handleCellChange = (value, rowIndex, cellIndex) => {
    const updatedData = [...data];
    updatedData[rowIndex][cellIndex] = value;
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div>
        <table>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td className="" key={cellIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(e.target.value, rowIndex, cellIndex)
                      }
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
              {data[0].map((_, index) => (
                <td key={index}>
                  {index > 0 ? (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeColumn(index)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-success" onClick={addRow}>
                      New Row
                    </button>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
