import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FontFaceObserver } from "fontfaceobserver";
import { SubmitTicketData, api, UpdateTicketData } from "./API";
function BuildDesign({
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

  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count * -1); // Triggers a re-render
  };

  const [canvasInit, setCanvasInit] = useState(false);
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const [fontStates, setFontStates] = useState([]);
  const [textAlignStates, setTextAlignStates] = useState([]);
  const [fontStateLoaded, setFontStateLoaded] = useState(false);
  const [textAlignStateLoaded, setTextAlignStateLoaded] = useState(false);
  const [fontSizeEnteredText, setFontSizeEnteredText] = useState([]);

  const InitCanvas = () => {
    console.log("Initing Canvas!!!!!!!");
    editor.canvas.setDimensions({ width: 484, height: 204 });
    editor.canvas.setBackgroundColor("black");
    editor.canvas.preserveObjectStacking = true;
    LoadCanvasFromFile();
    UpdateAndAddCanvasObjectData();
    LoadAndAssignFontFamily();
    LoadAndAssignTextAlign();
    LoadAndAssignFontSize();
    // editor.canvas.renderAll();
    //setup event handlers
    editor.canvas.on("mouse:up", moveHandler);
    editor.canvas.renderAll();
    SaveChangesToDB();
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
    editor.canvas.getObjects().forEach((obj) => {
      HandleConstrainObjectToCanvas(obj);

      // Trigger canvas render after modifying the object
      editor.canvas.requestRenderAll();
    });
    editor.canvas.renderAll();
  };

  const LoadAndAssignFontFamily = () => {
    console.log("Loading Fonts...");
    let tempBuildOption = activeBuildOption;
    let tempFontStates = [];
    tempFontStates = activeBuildOption.buildFontStates;

    if (tempFontStates.length < editor.canvas.getObjects().length) {
      console.log(
        "Need to add more font states",
        editor.canvas.getObjects().length - tempFontStates.length
      );
      for (
        let i = 0;
        i < editor.canvas.getObjects().length - tempFontStates.length;
        i++
      ) {
        tempFontStates.push(
          editor.canvas.getObjects()[tempFontStates.length + i].fontFamily
        );
      }
    }
    console.log(
      "Added Font States Result: ",
      activeBuildOption.buildFontStates
    );
  };

  const LoadAndAssignTextAlign = () => {
    console.log("Loading Text Align State...");
    let tempBuildOption = activeBuildOption;
    let tempTextAlignStates = [];
    tempTextAlignStates = activeBuildOption.buildTextAlignStates;

    if (tempTextAlignStates.length < editor.canvas.getObjects().length) {
      console.log(
        "Need to add more text align states",
        editor.canvas.getObjects().length - tempTextAlignStates.length
      );
      for (
        let i = 0;
        i < editor.canvas.getObjects().length - tempTextAlignStates.length;
        i++
      ) {
        tempTextAlignStates.push(
          editor.canvas.getObjects()[tempTextAlignStates.length + i].textAlign
        );
      }
    }
    console.log(
      "Added Text Align States Result: ",
      activeBuildOption.buildTextAlignStates
    );
  };

  const LoadAndAssignFontSize = () => {
    console.log("Loading Text Align State...");
    let tempBuildOption = activeBuildOption;
    let tempFontSizeStates = [];
    tempFontSizeStates = activeBuildOption.buildFontSizeStates;

    if (tempFontSizeStates.length < editor.canvas.getObjects().length) {
      console.log(
        "Need to add more text align states",
        editor.canvas.getObjects().length - tempFontSizeStates.length
      );
      for (
        let i = 0;
        i < editor.canvas.getObjects().length - tempFontSizeStates.length;
        i++
      ) {
        tempFontSizeStates.push(
          editor.canvas.getObjects()[tempFontSizeStates.length + i].fontSize
        );
      }
    }
    console.log(
      "Added Font Size States Result: ",
      activeBuildOption.buildFontSizeStates
    );
  };

  const SaveCurrentFontState = () => {
    let currentFontState = [];
    editor.canvas.getObjects().forEach((val, index) => {
      currentFontState.push(val.fontFamily);
    });

    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildFontStates = currentFontState;
    setActiveBuildOption(tempBuildOption);
  };

  const SaveCurrentTextAlignState = () => {
    let currentTextAlignState = [];
    editor.canvas.getObjects().forEach((val, index) => {
      currentTextAlignState.push(val.textAlign);
    });

    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildTextAlignStates = currentTextAlignState;
  };

  const SaveCurrentFontSizeState = () => {
    let currentFontSizeState = [];
    editor.canvas.getObjects().forEach((val, index) => {
      currentFontSizeState.push(val.fontSize);
    });

    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildFontSizeStates = currentFontSizeState;
  };

  const HandleAddTextObjects = (textObjID) => {
    console.log("Adding Text: ", activeBuildOption.buildData[textObjID]);
    var text = new fabric.Textbox("temp", {
      left: 484 / 2,
      top: 128 / 2,
      fontFamily: "Sriracha",
      fill: "white",
      textAlign: "center", // Set the text alignment to center
      fontSize: "16",
    });

    text.controls = {
      ...fabric.Textbox.prototype.controls,
      mtr: new fabric.Control({ visible: false }),
    };

    text.setControlsVisibility({
      mt: false, // Disable top middle control
      mb: false, // Disable bottom middle control
      ml: true, // Enable left middle control
      mr: true, // Enable right middle control
      tl: false, // Disable top left control (diagonal)
      tr: false, // Disable top right control (diagonal)
      bl: false, // Disable bottom left control (diagonal)
      br: false, // Disable bottom right control (diagonal)
    });

    // Prevent resizing the textbox on the y-axis
    text.lockUniScaling = true;
    text.on("modified", HandleObjectScaling);
    text.on("moving", (e) => {
      // Constrain the object within the canvas
      HandleConstrainObjectToCanvas(text);

      // Trigger canvas render after modifying the object
      editor.canvas.requestRenderAll();
    });
    console.log("TEXT SETTINGS: ", text);
    text.bringToFront();
    editor.canvas.setActiveObject(text);
    editor.canvas.add(text);
  };

  const HandleObjectScaling = (e) => {
    const target = e.target;
    console.log("HANDLESCALING HERE", e.target);

    // Ensure the width stays within the canvas boundaries
    if (target.width * target.scaleX > editor.canvas.width) {
      const newWidth = editor.canvas.width / target.scaleX;
      target.set({
        width: newWidth,
        scaleX: 1,
      });
    }

    // Ensure the height stays within the canvas boundaries
    if (target.height * target.scaleY > editor.canvas.height) {
      const newHeight = editor.canvas.height / target.scaleY;
      target.set({
        height: newHeight,
        scaleY: 1,
      });
    }
  };

  const HandleConstrainObjectToCanvas = (e) => {
    console.log("MOVING OBJECT: ", e.target);
    const obj = e;
    const canvasWidth = editor.canvas.width;
    const canvasHeight = editor.canvas.height;

    // Get the object's current position and dimensions
    const { left, top, width, height } = obj;

    // Get the dimensions of the object
    const objectWidth = obj.width; // Replace with the actual width of your object
    const objectHeight = obj.height; // Replace with the actual height of your object

    // Calculate the right and bottom edges of the object
    const right = left + objectWidth;
    const bottom = top + objectHeight;

    // Check if the object goes beyond the canvas boundaries
    if (left < 0) {
      // Adjust the left position to keep the object within the canvas
      obj.set({ left: 0 });
    }
    if (top < 0) {
      // Adjust the top position to keep the object within the canvas
      obj.set({ top: 0 });
    }
    if (right > canvasWidth) {
      // Adjust the width to keep the object within the canvas
      obj.set({ left: canvasWidth - objectWidth });
    }
    if (bottom > canvasHeight) {
      // Adjust the height to keep the object within the canvas
      obj.set({ top: canvasHeight - objectHeight });
    }
    editor.canvas.requestRenderAll();
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

    //ensure scaling options are set for every text box.
    canvasObjects.forEach((object) => {
      object.setControlsVisibility({
        mt: false, // Disable top middle control
        mb: false, // Disable bottom middle control
        ml: true, // Enable left middle control
        mr: true, // Enable right middle control
        tl: false, // Disable top left control (diagonal)
        tr: false, // Disable top right control (diagonal)
        bl: false, // Disable bottom left control (diagonal)
        br: false, // Disable bottom right control (diagonal)
      });

      // Prevent resizing the textbox on the y-axis
      object.lockUniScaling = true;

      object.controls = {
        ...fabric.Textbox.prototype.controls,
        mtr: new fabric.Control({ visible: false }),
      };

      //Add scaling event.
      object.on("modified", HandleObjectScaling);
      object.on("moving", (e) => {
        // Constrain the object within the canvas
        HandleConstrainObjectToCanvas(object);

        // Trigger canvas render after modifying the object
        editor.canvas.requestRenderAll();
      });
    });

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
    editor.canvas.setBackgroundColor("black");
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

  const TestHandleTitleChange = (fontSize, rowID) => {
    let sanitizedInput = fontSize.replace(/[^0-9]/g, "");
    //limit font size input
    if (80 < Number(sanitizedInput)) {
      sanitizedInput = "120";
    }
    let updatedData = activeBuildOption.buildFontSizeStates;
    updatedData[rowID] = sanitizedInput;
    console.log("NEW FONT SIZE: ", sanitizedInput);
    let tempBuildOption = activeBuildOption;
    tempBuildOption.buildFontSizeStates = updatedData;
    editor.canvas.getObjects()[rowID].set("fontSize", sanitizedInput);
    HandleConstrainObjectToCanvas(editor.canvas.getObjects()[rowID]);
    SaveCurrentFontSizeState();
    setActiveBuildOption(tempBuildOption);
    editor.canvas.renderAll();
    incrementCount();
  };

  const GetSelectedFontState = (option, rowID) => {
    console.log(
      "Set default font state: ",
      activeBuildOption.buildFontStates[rowID] === option,
      option,
      "activeBuildOption.buildFontStates[rowID]: ",
      activeBuildOption.buildFontStates[rowID]
    );
    return activeBuildOption.buildFontStates[rowID] === option;
  };

  const GetSelectedAlignTextState = (option, rowID) => {
    return (
      activeBuildOption.buildTextAlignStates[rowID] ===
      textAlignOptions[0][option]
    );
  };

  const GetSelectedFontSize = (option, rowID) => {
    return (
      activeBuildOption.buildTextAlignStates[rowID] ===
      textAlignOptions[0][option]
    );
  };

  const SaveChangesToDB = () => {
    let tempBuildData = activeBuildOption;
    tempBuildData.buildDesign = JSON.stringify(editor.canvas);
    setActiveBuildOption(tempBuildData);
    UpdateTicketData(tempBuildData);
  };

  const CheckInitStatus = () => {
    if (activeBuildOption.buildData === null) {
      return (
        <div className="d-flex w-100 canvascontainer mx-auto align-items-middle">
          <div className="mx-auto mt-4 text-center display-6">
            {" "}
            Please initialize your data on the "Data" tab before continuing.
          </div>
        </div>
      );
    } else {
      return (
        <div className="canvascontainer mt-4 mx-auto">
          <div className=" d-flex justify-content-center">
            <FabricJSCanvas
              // className="sample-canvas rounded rounded-3"
              onReady={onReady}
            />
          </div>
          <div className="mt-4 w-50 justify-content-center d-flex mx-auto">
            {RenderDesignOptions()}
          </div>
        </div>
      );
    }
  };

  const RenderDesignOptions = () => {
    let count = 0;
    let tempFontSizeStates = activeBuildOption.buildFontSizeStates;
    return (
      <div>
        <div
          onClick={() => SaveChangesToDB()}
          className="btn btn-success d-flex justify-content-center w-100 mx-auto mt-4"
        >
          Save Changes
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">Font</th>
              <th scope="col">Text Align</th>
              <th scope="col">Font Size</th>
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
                <td className="">
                  <input
                    onChange={(e) =>
                      TestHandleTitleChange(e.target.value, index)
                    }
                    value={tempFontSizeStates[index]}
                    className="w-100"
                    type="text"
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <div className="">{CheckInitStatus()}</div>;
}

export default BuildDesign;
