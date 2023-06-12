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

  const { selectedObjects, editor, onReady } = useFabricJSEditor();

  const InitCanvas = () => {
    editor.canvas.setDimensions({ width: 484, height: 204 });
    editor.canvas.setBackgroundColor("black");
    editor.canvas.preserveObjectStacking = true;
    console.log(editor.canvas);
  };

  useEffect(() => {
    const checkValue = () => {
      // Check if the value is no longer undefined
      if (editor !== undefined) {
        // Value is not undefined anymore, do something
        console.log("Value is not undefined anymore:", editor.canvas);
        clearInterval(interval);
        InitCanvas();
      }
    };

    // Set up an interval to check the value periodically
    const interval = setInterval(checkValue, 1000);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [onReady]);

  //Called on state change to the DESIGN tab.

  const onAddText = () => {
    editor.addText();
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
                  className="form-select "
                  aria-label="Default select example"
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
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
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
          <FabricJSCanvas className="sample-canvas" onReady={onReady} />
          <div className="mt-4">{RenderDesignOptions()}</div>
        </div>
      </div>
    </div>
  );
}

export default BuildDesign;
