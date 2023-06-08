import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
function BuildDesign({
  canvasStateJson,
  setCanvasStateJson,
  buildState,
  tableData,
}) {
  const canvasRef = useRef(null);
  const addButton = useRef(null);
  let canvas = new fabric.Canvas();

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
      const text = new fabric.Text("New Text", {
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
    addButton.current.addEventListener("click", handleAddText);

    const handleMouseUp = (event) => {
      console.log("Mouse up event detected - SAVE TO JSON!!");
      localStorage.setItem("tempCanvas", JSON.stringify(canvas));
    };

    // Add mouseup event listener to canvas
    canvas.on("mouse:up", handleMouseUp);
    return () => {
      // Clean up event listener on component unmount
      if (!handleAddText === null) {
        addButton.current.removeEventListener("click", handleAddText);
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

      let objects = canvas.getObjects();
      let count = 0;

      objects.forEach(function (object, key) {
        console.log(canvas._objects);
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
    }

    //  else {
    //   //if nothing exists in localStorage, create brand new canvas and add text items.

    //   for (let i = 0; i < tableData.length; i++) {
    //     handleAddText(tableData[i], i);
    //   }
    // }
  };

  const handleAddText = (labelName, i) => {
    let topVal = 50 * i + 1;
    const text = new fabric.Text(labelName, {
      left: 50,
      top: topVal,
      fontSize: 24,
      fill: "white",
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

  //Canvas

  // Set the properties
  const AddText = () => {
    // let newTextItem = new fabric.Text("Beef Brisket");
    // newTextItem.set("top", 70);
    // newTextItem.set("left", 65);
    // newTextItem.set("fill", "white");
    // newTextItem.set("fontWeight", "bold");
    // newTextItem.bringToFront();
    // canvas.add(newTextItem);
    // canvas.renderAll();
  };

  const GetCanvas = () => {};

  return (
    <div className="">
      <h1>FabricJS React Sample</h1>
      <button ref={addButton}>Add Text</button>
      <div className="canvascontainer d-flex justify-content-center">
        <canvas ref={canvasRef} className="rounded rounded-2"></canvas>
      </div>
    </div>
  );
}

export default BuildDesign;
