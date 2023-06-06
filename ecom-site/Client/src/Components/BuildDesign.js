import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
function BuildDesign({ canvasStateJson, setCanvasStateJson, buildState }) {
  const canvasRef = useRef(null);
  const addButton = useRef(null);
  let canvas = new fabric.Canvas();

  useEffect(() => {
    canvas = new fabric.Canvas(canvasRef.current);
    // Initialize Fabric.js canvas on component mount
    canvas.setDimensions({ width: 484, height: 204 });
    canvas.setBackgroundColor("black");
    // Handle button click to add text
    const handleAddText = () => {
      const text = new fabric.Text("New Text", {
        left: 50,
        top: 50,
        fontSize: 24,
        fill: "white",
      });
      canvas.add(text);
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

  useEffect(() => {
    canvas.loadFromJSON(JSON.parse(localStorage.getItem("tempCanvas")));
    canvas.renderAll();
  }, [buildState]);

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
