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
  textAlignOptions,
  activeBuildOption,
  setActiveBuildOption,
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

  const [canvasInit, setCanvasInit] = useState(false);
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const [fontStates, setFontStates] = useState([]);
  const [textAlignStates, setTextAlignStates] = useState([]);
  const [fontStateLoaded, setFontStateLoaded] = useState(false);
  const [textAlignStateLoaded, setTextAlignStateLoaded] = useState(false);

  const InitCanvas = () => {
    console.log("Initing Canvas!!!!!!!");
    editor.canvas.setDimensions({ width: 484, height: 204 });
    editor.canvas.setBackgroundColor("black");
    editor.canvas.preserveObjectStacking = true;
    LoadCanvasFromFile();
    UpdateAndAddCanvasObjectData();
    // LoadAndAssignFontFamily();
    // LoadAndAssignTextAlign();
    // editor.canvas.renderAll();
    //setup event handlers
    //editor.canvas.on("object:moving", moveHandler);
  };

  useEffect(() => {
    if (fontStateLoaded) {
      console.log("fonts states loaded!");
      setFontStateLoaded(true);
    }
  }, [fontStates]);

  useEffect(() => {
    if (textAlignStateLoaded) {
      console.log("text align states loaded!");
      setTextAlignStateLoaded(true);
    }
  }, [textAlignStates]);

  const moveHandler = () => {
    // //save canvas state to localstorage.
    // let tempBuildOption = activeBuildOption;
    // tempBuildOption.buildDesign = JSON.stringify(editor.canvas);
    // setActiveBuildOption(tempBuildOption);
  };

  const LoadAndAssignFontFamily = () => {
    console.log("Loading Fonts...");
    let tempBuildOption = activeBuildOption;
    let tempFontStates = [];
    if (tempFontStates.length < activeBuildOption.buildData[0].length) {
      for (
        let i = 0;
        i < activeBuildOption.buildData[0].length - tempFontStates.length;
        i++
      )
        tempFontStates.push(fontNames[0][1]);
    }
    let count = 0;
    editor.canvas.getObjects().forEach((obj, index) => {
      obj.set("fontFamily", tempFontStates[count]);
      count++;
    });
    tempBuildOption.buildFontStates = tempFontStates;
  };

  const LoadAndAssignTextAlign = () => {
    console.log("Loading Text Align...");
    let tempBuildOption = activeBuildOption;
    let tempTextAlignStates = [];
    if (tempTextAlignStates.length < activeBuildOption.buildData[0].length) {
      for (
        let i = 0;
        i < activeBuildOption.buildData[0].length - tempTextAlignStates.length;
        i++
      )
        tempTextAlignStates.push(textAlignOptions[0][1]);
      console.log("ADDING TEXT ALIGN STATES...", tempTextAlignStates);
    }
    let count = 0;
    editor.canvas.getObjects().forEach((obj, index) => {
      obj.set("textAlign", tempTextAlignStates[count]);
      count++;
    });
    tempBuildOption.tempTextAlignStates = tempTextAlignStates;
    //setActiveBuildOption(tempBuildOption);
  };

  const SaveCurrentFontState = () => {
    let currentFontState = [];
    editor.canvas.getObjects().forEach((val, index) => {
      currentFontState.push(val.fontFamily);
    });
    localStorage.setItem("fontStates", JSON.stringify(currentFontState));
  };

  const SaveCurrentTextAlignState = () => {
    let currentTextAlignState = [];
    editor.canvas.getObjects().forEach((val, index) => {
      currentTextAlignState.push(val.textAlign);
    });
    localStorage.setItem(
      "textAlignStates",
      JSON.stringify(currentTextAlignState)
    );
  };

  const HandleAddTextObjects = (textObjID) => {
    console.log("Adding Text: ", activeBuildOption.buildData[textObjID]);
    var text = new fabric.Textbox("temp", {
      left: 50 * textObjID,
      top: 50 * textObjID,
      fontFamily: "Sriracha",
      fill: "white",
      textAlign: "center", // Set the text alignment to center
    });
    console.log("TEXT SETTINGS: ", text);
    text.bringToFront();
    editor.canvas.setActiveObject(text);
    editor.canvas.add(text);
  };

  const UpdateAndAddCanvasObjectData = () => {
    let canvasObjects = editor.canvas.getObjects();
    let amountOfTextToAdd =
      activeBuildOption.buildData[0].length - canvasObjects.length;

    if (amountOfTextToAdd > 0) {
      for (let i = 0; i < amountOfTextToAdd; i++) {
        HandleAddTextObjects(canvasObjects.length + i);
      }
    }

    // //Ensure design text is updated here.
    let objects = editor.canvas.getObjects();
    let data = activeBuildOption.buildData;
    let count = 0;
    objects.forEach((object) => {
      object.text = data[0][count];
      count++;
    });
    // SaveCurrentFontState();
    // SaveCurrentTextAlignState();
  };

  const LoadCanvasFromFile = () => {
    if (activeBuildOption.buildDesign != null) {
      editor.canvas.loadFromJSON(JSON.parse(activeBuildOption.buildDesign));
    } else {
      console.log("BUILD CANVAS IS NULL");
    }
  };

  //todo:
  // pass in text and add to canvas object.
  //change font on option event change.

  useEffect(() => {
    if (canvasInit) {
      return;
    }
    const checkValue = () => {
      // Check if the value is no longer undefined
      if (editor !== undefined) {
        // Value is not undefined anymore, do something
        console.log("Value is not undefined anymore:", editor.canvas);
        clearInterval(interval);
        InitCanvas();
        setCanvasInit(true);
      }
    };

    // Set up an interval to check the value periodically
    const interval = setInterval(checkValue, 100);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [onReady]);

  const HandleFontOptionChange = (rowID, fontID) => {
    editor.canvas.getObjects()[rowID].fontFamily = fontNames[0][fontID];
    SaveCurrentFontState();
    editor.canvas.renderAll();
  };

  const HandleTextAlignOptionChange = (rowID, alignID) => {
    editor.canvas
      .getObjects()
      [rowID].set("textAlign", textAlignOptions[0][alignID]);
    editor.canvas.renderAll();
    SaveCurrentTextAlignState();
  };

  const GetSelectedFontState = (option, rowID) => {
    return fontStates[rowID] === option;
  };

  const GetSelectedAlignTextState = (option, rowID) => {
    return textAlignStates[rowID] === textAlignOptions[0][option];
  };

  const RenderDesignOptions = () => {
    let count = 0;
    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Font</th>
            <th scope="col">Text Align</th>
          </tr>
        </thead>
        <tbody>
          {activeBuildOption.buildData[0].map((val, index) => (
            <tr>
              <th scope="row">{val}</th>
              <td>
                <select
                  style={{ fontFamily: `${fontNames[0][1]}, sans-serif` }}
                  className="form-select "
                  aria-label="Default select example"
                  onChange={(e) =>
                    HandleFontOptionChange(index, e.target.value)
                  }
                >
                  {fontNames[0].map((val, indexTwo) => {
                    return (
                      <option
                        style={{ fontFamily: `${val}, sans-serif` }}
                        className={``}
                        value={indexTwo}
                        selected={GetSelectedFontState(val, index)}
                      >
                        {val}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    HandleTextAlignOptionChange(index, e.target.value)
                  }
                >
                  <option
                    selected={GetSelectedAlignTextState(0, index)}
                    value={0}
                  >
                    Left
                  </option>
                  <option
                    selected={GetSelectedAlignTextState(1, index)}
                    value={1}
                  >
                    Centre
                  </option>
                  <option
                    selected={GetSelectedAlignTextState(2, index)}
                    value={2}
                  >
                    Right
                  </option>
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
          <FabricJSCanvas
            // className="sample-canvas rounded rounded-3"
            onReady={onReady}
          />
          <div className="mt-4">{RenderDesignOptions()}</div>
        </div>
      </div>
    </div>
  );
}

export default BuildDesign;
