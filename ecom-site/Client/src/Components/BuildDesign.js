import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FontFaceObserver } from "fontfaceobserver";
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
    canvas.renderAll();
  }, [buildState]);

  const loadFont = (fontFamily) => {
    const font = new FontFaceObserver(fontFamily);

    return font.load();
  };

  //
  const CreateCanvasObjects = () => {
    if (localStorage.getItem("tempCanvas")) {
      //check if we have a loaded canvas already
      //load canvas and edit text based on passed parameters.
      //loop through items passed and assign back to the objects already in canvas.
      let canvasJsonObj = JSON.parse(localStorage.getItem("tempCanvas"));
      canvas.loadFromJSON(canvasJsonObj);
      console.log("New Canvas: ", canvas);

      if (tableData.length > canvas._objects.length) {
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
    localStorage.setItem("tempCanvas", JSON.stringify(canvas));
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

  const HandleLabelFontChange = (font, row) => {
    CreateCanvasObjects();
    // canvas.loadFromJSON(JSON.parse(localStorage.getItem("tempCanvas")));
    console.log(font, row);
    let count = 0;
    canvas.getObjects().forEach((val, key) => {
      if (count == row) {
        val.set("fontFamily", fontNames[0][font]);
      }

      count++;
    });
    canvas.renderAll();
    localStorage.setItem("tempCanvas", JSON.stringify(canvas));
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
                  style={{ fontFamily: `${fontNames[0][1]}, sans-serif` }}
                  class="form-select "
                  aria-label="Default select example"
                  onChange={(e) => HandleLabelFontChange(e.target.value, index)}
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
