import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
function BuildDesign({
  canvasStateJson,
  setCanvasStateJson,
  buildState,
  tableData,
  fontNames,
}) {
  const canvasRef = useRef(null);
  const addButton = useRef(null);
  const [tempFontStates, setTempFontStates] = useState([]);
  let canvas = new fabric.Canvas();
  let objects;

  const CreateNewCanvas = () => {
    console.log("creating new canvas!");
    canvas = new fabric.Canvas(canvasRef.current);
    // Initialize Fabric.js canvas on component mount
    canvas.setDimensions({ width: 484, height: 204 });
    canvas.setBackgroundColor("black");
    canvas.preserveObjectStacking = true;
  };

  useEffect(() => {
    // Handle button click to add text
    CreateNewCanvas();
    const handleAddText = () => {
      const text = new fabric.Textbox("New Text", {
        left: 50,
        top: 50,
        fontSize: 24,
        fill: "white",
      });
      canvas.add(text);
      canvas.renderAll();
      localStorage.setItem("tempCanvas", JSON.stringify(canvas));
      console.log("Saving data to local storage.");
    };
    // addButton.current.addEventListener("click", handleAddText);

    const handleMouseUp = (event) => {
      console.log("Mouse up event detected - SAVE TO JSON!!");
      localStorage.setItem("tempCanvas", JSON.stringify(canvas));
    };

    // Add mouseup event listener to canvas
    canvas.on("mouse:up", handleMouseUp);
    return () => {
      // Clean up event listener on component unmount
      if (!handleAddText === null) {
        // addButton.current.removeEventListener("click", handleAddText);
        canvas.off("mouse:up", handleMouseUp);
      }
    };
  }, []);

  //Called on state change to the DESIGN tab.
  useEffect(() => {
    CreateCanvasObjects();
    // canvas.loadFromJSON(JSON.parse(localStorage.getItem("tempCanvas")));
    canvas.renderAll();
  }, [buildState]);

  //
  const CreateCanvasObjects = () => {
    if (localStorage.getItem("tempCanvas")) {
      //check if we have a loaded canvas already
      //load canvas and edit text based on passed parameters.
      //loop through items passed and assign back to the objects already in canvas.
      let canvasJsonObj = JSON.parse(localStorage.getItem("tempCanvas"));
      canvas.loadFromJSON(canvasJsonObj);

      console.log("canvasObj from json:", tableData.length);
      if (tableData.length > canvas._objects.length) {
        console.log("need to add text obj!!!");
        let positionOffset = 3;
        handleAddText(tableData[tableData.length - 1], positionOffset);
      }

      objects = canvas.getObjects();
      let count = 0;

      objects.forEach(function (object, key) {
        //console.log(canvas._objects);
        if (count < tableData.length) {
          //change text
          if (object.type === "text") {
            object.set("text", tableData[count]);
          }
        } else {
          //remove item from canvas
          canvas.remove(object);
        }
        count++;
      });
      canvas.renderAll();
    } else {
      //if nothing exists in localStorage, create brand new canvas and add text items.

      for (let i = 0; i < tableData.length; i++) {
        handleAddText(tableData[i], i);
      }
      objects = canvas.getObjects();
    }

    //init font states
    let tempFontState = [];
    for (let f = 0; f < objects.length; f++) {
      tempFontState.push(fontNames[0][0]);
    }
    setTempFontStates(tempFontState);
    console.log("Font State Set: ", tempFontState);
  };

  const handleAddText = (labelName, i) => {
    let topVal = 50 * i + 1;
    const text = new fabric.Textbox(labelName, {
      left: 50,
      top: topVal,
      fontSize: 24,
      fill: "white",
      textAlign: "center",
    });
    canvas.add(text);
    text.bringToFront();
    localStorage.setItem("tempCanvas", JSON.stringify(canvas));
    console.log("Saving data to local storage.");
  };

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    console.log(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const GetCanvasSizeClass = () => {
    if (windowSize.width < 600) {
      console.log("setting mobile canvas", windowSize);
      return "buildcanvasmobile";
    } else {
      console.log("setting normal canvas", windowSize);

      return "buildcanvas";
    }
  };

  useEffect(() => {
    console.log("Temp Font States event: ", tempFontStates);
  }, [tempFontStates]);

  const OnSelectChangeFont = (setFont, i) => {
    let tempState = tempFontStates;

    console.log("setFont: ", setFont);
    console.log("Row", i);
    tempState[i] = fontNames[0][setFont];
    console.log(tempFontStates[i]);
    setTempFontStates(tempState);
  };

  const GetFontName = (i) => {
    console.log("All States: ", tempFontStates, "I = ", i);
    console.log("Retuned Value: ", tempFontStates[i]);
    return tempFontStates[i];
  };

  const RenderDesignOptions = () => {
    let count = 0;
    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Font</th>
            <th scope="col">Size</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((val, index) => (
            <tr>
              <th scope="row">{val}</th>
              <td>
                <select
                  style={{ fontFamily: `${GetFontName(index)}, sans-serif` }}
                  class="form-select "
                  aria-label="Default select example"
                  onChange={(e) => OnSelectChangeFont(e.target.value, index)}
                >
                  {fontNames[0].map((val, indexTwo) => {
                    return (
                      <option
                        style={{ fontFamily: `${val}, sans-serif` }}
                        className={``}
                        value={indexTwo}
                      >
                        {val}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                {" "}
                <select class="form-select" aria-label="Default select example">
                  <option selected value="1">
                    One
                  </option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="">
      <div className="canvascontainer d-flex justify-content-center mt-4">
        <div>
          <canvas ref={canvasRef} className="rounded rounded-2"></canvas>
          <div className="mt-4">{RenderDesignOptions()}</div>
        </div>
      </div>
    </div>
  );
}

export default BuildDesign;
